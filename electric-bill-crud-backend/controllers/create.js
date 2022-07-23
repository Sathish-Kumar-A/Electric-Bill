const EBSchema = require("../model");


const createNewRecord = async (req, res) => { 
    try {
        const { billDate, paidDate, unitConsumed, amount } = req.body;
        const record = await EBSchema.create({
            billDate,
            paidDate,
            unitConsumed,
            amount
        });
        res.status(201).send({
            success: true,
            message: "Record created successfully",
            data: record
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error creating new record",
            error: error
        });
    }
}

module.exports = { createNewRecord }
