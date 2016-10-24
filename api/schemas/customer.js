const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true, index: true },
    street: { type: String, required: false },
    additional: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false, match: [/[a-zA-Z]{2,3}?/, 'State must be 2 or 3 characters'] },
    zip: {
        type: String,
        required: true,
        index: true,
        match: [/\d{5}(-\d{4})?/, 'Zip must be 5 or 5 +4 format']
    }
});

// Virtuals
Schema.virtual('fullAddress').get(getAddress);

// Transform exports
var exportOptions = {
    virtuals: true,
    getters: true
};
Schema.set('toJSON', exportOptions);
Schema.options.toJSON.transform = function(doc, ret, options){
    ret.id = ret._id;
    delete ret._id;
    return ret;
};

module.exports = mongoose.model('Customer', Schema);

/**
 * Support functions
 */
function getAddress(){
    let line1 = ['street', 'additional']
        .reduce(_addIfNotEmpty.bind(this), [])
        .join(' ');
    let line2 = ['city', 'state', 'zip']
        .reduce(_addIfNotEmpty.bind(this), [])
        .join(', ');

    function _addIfNotEmpty(acc, key){
        if(this[key]){
            acc.push(this[key]);
        }
        return acc;
    }

    if(!line1.length && !line2.length){
        return 'No address details';
    }

    if(!line1.length || !line2.length){
        return !line1.length? line2 : line1;
    }

    return line1 + "\n" + line2;
}
