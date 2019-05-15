const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store'});
};

exports.createStore = async (req, res) => {
    const store = await( new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/stores/${store.slug}`);
};
 
exports.getStores = async (req, res) => {
    //1. query database for a list of all stores
    const stores = await Store.find();
    res.render('stores', { title: 'Stores', stores}); // if prop is the same as variable only send var 
};

exports.editStore = async (req ,res) => {
    // 1. find the store id
    // use await so it isnt a promise
    const store = await Store.findOne({ _id: req.params.id});
    // print to test
    //res.json(store);

    // 2. confirm store owner

    // 3. render edit form
    res.render('editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req ,res) => {
    // set location data to point
    req.body.location.type = 'Point';

    // find & update store
    const store = await Store.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new: true, // return new store instead of old
        runValidators: true,
    }).exec();

    // redirect en flash notification
    req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${ store.slug }">View store</a> `);
    res.redirect(`/stores/${store._id}/edit`)
}