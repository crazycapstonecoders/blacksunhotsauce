const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const admin = require('firebase-admin')
const serviceAccount = require('../../../black-sun-sauces-firebase-adminsdk-q0eh3-f4c75592fd.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGEBUCKET
})

exports.productById = (req, res, next, id) => {
    // get product associated with id that comes from request parameters
    // eg https://example.com/product/<productId>
    Product.findById(id).exec((error, product) => {
        if (error || !product) {
            return res.status(400).json({ error: 'Product not found' })
        }
        // set value of new request object 
        req.product = product
        next()
    })
}

exports.create = (req, res) => {
    // get form data using formidable library
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    // parse incoming data
    form.parse(req, (error, fields, files) => {
        // get fields from front end form
        const { name, description, quantity, price } = fields
        if (error) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        if (!name || !description || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        if (files.image.type === null) {
            return res.status(400).json({ error: 'Image is required' })
        }
        if (files.image.type.includes('image') !== true) {
            return res.status(400).json({ message: 'Please upload a valid image' })
        }
        // create new product document with fields for db
        let product = new Product(fields)
        // function to upload images to firebase storage
        let uploadFile = function () {
            const bucket = admin.storage().bucket()
            const name = files.image.path
            // get random id using uuid 
            const uuid = uuidv4()
            // set necessary metadata
            const metadata = {
                metadata: {
                    cacheControl: 'public, max-age=31536000',
                    firebaseStorageDownloadTokens: uuid
                },
                contentType: files.image.type
            }
            // upload to firebase storage within a folder(products) which is within another folder(images)
            return bucket.upload(name, {
                destination: `images/products/${name}`,
                gzip: true,
                metadata: metadata
            }).then(data => {
                // get the url to images saved in storage
                let file = data[0]
                let imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
                // get the image name and save both name and url to product document
                const name = file.name.substring(16)
                product.images.push({ name: name, url: imageUrl })
                return Promise.resolve(imageUrl)
            })
        }
        // call the above function first as it runs slower than saving product doc object to db
        uploadFile().then(() => {
            // once uploadFile is finished, then only save product to db
            product.save().then(product => {
                res.json(product)
            }).catch(error => {
                console.log(error)
                return res.status(400).json({ error: 'Error creating product' })
            })
        }).catch(error => {
            console.log(error)
        })
    })
}

exports.update = (req, res) => {
    // get form data from front end
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {
        const { name, description, quantity, price } = fields
        if (error) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        if (!name || !description || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        // get the product user is updating
        let product = req.product
        // use lodash to simplify code 
        product = _.extend(product, fields)
        // image is not required, so just save it even if image is null
        if (files.image.type == null) {
            product.save().then(product => {
                res.json(product)
            }).catch(error => {
                return res.status(400).json({ error: 'Error updating product' })
            })
        } else {
            // if its not an image
            if (files.image.type.includes('image') !== true) {
                return res.status(400).json({ message: 'Please upload a valid image' })
            }
            // function to upload to firebase storage
            let uploadFile = function () {
                const bucket = admin.storage().bucket()
                const name = files.image.path
                const uuid = uuidv4()
                const metadata = {
                    metadata: {
                        cacheControl: 'public, max-age=31536000',
                        firebaseStorageDownloadTokens: uuid
                    },
                    contentType: files.image.type
                }
                return bucket.upload(name, {
                    destination: `images/products/${name}`,
                    gzip: true,
                    metadata: metadata
                }).then(data => {
                    let file = data[0]
                    let imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
                    const name = file.name.substring(16)
                    product.images.push({ name: name, url: imageUrl })
                    return Promise.resolve(imageUrl)
                })
            }
            uploadFile().then(() => {
                product.save().then(product => {
                    res.json(product)
                }).catch(error => {
                    console.log(error)
                    return res.status(400).json({ error: 'Error updating product' })
                })
            }).catch(error => {
                console.log(error)
            })
        }
    })
}

exports.remove = (req, res) => {
    // get the product from frontend
    let product = req.product
    // function to delete images associated with the above product from firebase storage
    const deleteFile = function () {
        const bucket = admin.storage().bucket()
        // loop through all images within the image array of the associated product
        const imageRemovePromises = product.images.map(image => {
            // delete all the images from firebase storage using image name
            return bucket.file(`images/products/${image.name}`).delete()
        })
        // resolve promise
        return Promise.all(imageRemovePromises)
    }
    // call function
    deleteFile().then(() => {
        // remove product after deleteFile function finished running
        product.remove((error, deleteProduct) => {
            if (error) {
                return res.status(400).json({ error: 'Unable to delete product' })
            }
            res.json({ message: 'Product successfully deleted' })
        })
    }).catch(error => {
        console.log(error)
    })
}