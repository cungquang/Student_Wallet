const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    imageId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    isReceipt: { type: Boolean, default: false },
    originalName: { type: String, required: true }
});

const ImageModel = mongoose.model('ImageModel', imageSchema);

module.exports = ImageModel;