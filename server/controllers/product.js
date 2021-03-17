const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const admin = require('firebase-admin')
const serviceAccount = require('../../../black-sun-sauces-firebase-adminsdk-q0eh3-f4c75592fd.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBAE_STORAGEBUCKET
})

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if(error || !product) {
            return res.status(400).json({ error: 'Product not found' })
        }
        req.product = product
        next()
    })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {
        const { name, description, quantity, price } = fields
        if(error) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        if(!name || !description || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        let product = new Product(fields)
        if(files.image.type === null) {
            return res.status(400).json({ error: 'Image is required' })
        }
        if(!files.image.type.includes('image') === true) {
            return res.status(400).json({ message: 'Please upload a valid image' })
        } 
        let uploadFile = function() {
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
                return Promise.resolve(imageUrl)
            })
        }
        uploadFile().then(downloadUrl => {
            if(downloadUrl) {
                product.images.push(downloadUrl)
                product.save().then(product => {
                    res.json(product)
                }).catch(error => {
                    return res.status(400).json({ error: 'Error creating product' })
                })
            }
        }).catch(error => {
            console.log(error)
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {
        const { name, description, quantity, price } = fields
        if(error) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        if(!name || !description || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        let product = req.product
        product = _.extend(product, fields)
        if(files.image.type === null) {
            product.save().then(product => {
                res.json(product)
            }).catch(error => {
                return res.status(400).json({ error: 'Error updating product' })
            })
        } else {
            let uploadFile = function() {
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
                    return Promise.resolve(imageUrl)
                })
            }
            uploadFile().then(downloadUrl => {
                if(downloadUrl) {
                    product.images.push(downloadUrl)
                    product.save().then(product => {
                        res.json(product)
                    }).catch(error => {
                        return res.status(400).json({ error: 'Error updating product' })
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }
    })
}

exports.read = (req, res) =>{
    //JS
    //I am unsure of the operating structure entirely but I think this is query and
    //return the result?

    //Initialize the incoming form object
    let form = new formidable.IncomingForm()
    //??
    form.keepExtensions = true
    //Parse the input
    form.parse(req, (error, fields, files) => {
        //Declare the fields
        const { name, description, quantity, price, images } = fields
        if(error) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        //Return the object?
        //return fields

    })
}