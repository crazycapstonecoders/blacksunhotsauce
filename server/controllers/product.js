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

exports.create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {
        if(error) {
            res.status(400).json({ error: 'Image could not be uploaded' })
        }
        let product = new Product(fields)
        if(files.image) {
            let uploadFile = async function() {
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
                await bucket.upload(name, {
                    destination: `images/products/${name}`,
                    gzip: true,
                    metadata: metadata
                }).then(data => {
                    let file = data[0]
                    let imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
                    product.images.push(imageUrl)
                    return Promise.resolve(imageUrl)
                })
                console.log(name + ' successfully uploaded')
            }
            uploadFile().catch(error => {
                console.log(error)
            })
            setTimeout(() => {
                product.save().then(product => {
                    res.json(product)
                }).catch(error => {
                    return res.status(400).json({ error: 'Error creating product' })
                })
            }, 700)
        }
    })
}
