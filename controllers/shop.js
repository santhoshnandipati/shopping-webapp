const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('index', { name: 'Home', prods: products, path: '/', pageTitle: 'Home' });
        })
        .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            if (!product) {
                return res.status(404).render('404', { pageTitle: 'Product Not Found', path: '/404' });
            }
            res.render('product-detail', { prod: product, pageTitle: 'Product Detail', path: '/', name: 'product detail' });
        })
        .catch(err => console.log(err));
}
exports.addToCart = (req, res, next) => {
    const productId = req.body.id;

    // Check if user is authenticated
    if (!req.user) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    req.user.addToCart(productId)
        .then(() => {
            res.redirect('/cart'); // Redirect to cart after adding
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error'); // Handle error
        });
}


exports.getCart = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated'); // Or handle as appropriate
    }

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user);
            res.render('cart', { cart: user.cart, pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'cart' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
        });
}

exports.deleteInCart = (req, res, next) => {
    req.user.removeFromCart(req.body.prodId)
        .then(() => {
            res.redirect('/cart');
        }).catch(err => console.log(err));

}