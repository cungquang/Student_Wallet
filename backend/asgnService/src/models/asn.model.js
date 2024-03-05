const {getDB} = require ('../../db')

const asnSchema = {
    uid: {type: String, required: true, unique: true},
    title: {type: String, required: true, unique: false},
    done: {type: Boolean, required: true, unique: false},
    subject: {type: String, required: true, unique: false},
    dueDate: {type: Date, required: true, unique: false},
    tag: {type: String, required: false, unique: false},
    memo: {type: String, required: false, unique: false},
}

module.exports = {asnSchema};