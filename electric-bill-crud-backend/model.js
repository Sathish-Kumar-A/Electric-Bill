const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ebSchema = new Schema({
    billDate: String,
    paidDate: String,
    unitConsumed: Number,
    amount: Number
});

const EBSchema = mongoose.model("EBSchema", ebSchema);

module.exports = EBSchema;