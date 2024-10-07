const Product = require('../models/product');
const cartss = require('../models/cart');          // added
const deletee = require('./shop');    // added
const User = require('../models/user'); // added

exports.getProductForm = (req, res, next) => {
    res.render('add-product', { name: 'add product', path: '/admin/add-product', pageTitle: 'Add Product' });
}

exports.postProduct = (req, res, next) => {
    const prod = new Product({
        title: req.body.title,
        imageURL: req.body.imageURL,
        price: req.body.price,
        description: req.body.description
    });
    prod.save()
        .then(result => {
            res.redirect('/');
        }).catch(err => console.log(err));


}

exports.editProductPage = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.render('edit-product', { product: product, path: '/', pageTitle: 'Edit Product', name: 'Edit product' });
        }).catch(err => console.log(err));

}

exports.editProductPost = (req, res, next) => {

    Product.updateOne({ _id: req.body.id }, { $set: { title: req.body.title, imageURL: req.body.imageURL, price: req.body.price, description: req.body.description } })
        .then(result => {
            res.redirect('/products/' + req.body.id);
        })
        .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndRemove(req.body.id) 
        .then(result => {
              
            res.redirect('/');
        })
        .catch(err => console.log(err));

}