const mongoose = require('mongoose');

const itemSchema = new mongoose.model({
    itemId: { type: String},
    itemName: { type: String},
    quantity: { type: Number},
    unitPrice: { type: Number},
    price: { type: Number, default: 0}
});

const transactionSchema = new mongoose.model({
    userId: { type: String, require: true },
    transactionId: { type: String, require: true},
    transactionDate: { type: Date, default: Date.now},
    totalCost: { type: Number, default: 0},
    tax: { type: Number, default: 0}, 
    listItem: [itemSchema]
});

const TransactionModel = mongoose.model('TransactionModel', transactionSchema);

module.exports = TransactionModel;