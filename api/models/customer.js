module.exports = Customer;

function Customer(data){
    return Object.assign(Object.create(Customer.prototype), data)
}

Customer.prototype.getAddress = function(){
    let line1 = ['address1', 'address2']
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
};

/**
 * @type {String}
 */
Customer.prototype.id = undefined;

/**
 * @type {String}
 */
Customer.prototype.name = '';

/**
 * @type {String}
 */
Customer.prototype.address1 = '';

/**
 * @type {String}
 */
Customer.prototype.address2 = '';

/**
 * @type {String}
 */
Customer.prototype.city = '';

/**
 * @type {String}
 */
Customer.prototype.state = '';

/**
 * @type {String}
 */
Customer.prototype.zip = '';
