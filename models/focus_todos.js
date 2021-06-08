const mongoose = require('mongoose')

const focusToDoSchema = new mongoose.Schema({
    todo: { type: String, required: true },
    name: { type: String },
    mood: { type: String, required: true },
    Date: { type: Date },
}, {timestamps: true});

const FocusToDoModel = mongoose.model('focusTodos', focusToDoSchema)

module.exports = {
    FocusToDoModel: FocusToDoModel
}
