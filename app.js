const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('66d74b9d4010ee5cdc35c073')   // after adding signup objectid is added from mongodb
        .then(userInDB => {
            req.user = userInDB;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

mongoose.connect('mongodb://127.0.0.1:27017/onlineshopping', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on 3000');
        });
    })
    .catch(err => console.log(err));