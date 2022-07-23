const EBSchema = require("../model");

const readAllRecords = async (req, res) => {
    try {
        const { page, limit, sort } = req.query;
        const sortBasedOn = {
            [sort]: 1
        }
        const records = await EBSchema.find().sort(sortBasedOn).skip((page - 1) * limit).limit(limit);
        res.status(200).send({
            success: true,
            message: "All records fetched successfully",
            data: records
        });   
    }
    catch (err) { 
        res.status(500).send({
            success: false,
            message: "Error fetching all records",
            error: err
        });
    }
}

const readById = async (req, res) => { 
    try {
        const { id } = req.params;
        const record = await EBSchema.findById(id);
        if (!record) {
            res.status(404).send({
                success: false,
                message: "Record not found"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Record fetched successfully",
                data: record
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching record by id",
            error: error
        });
    }
}


module.exports={readAllRecords,readById}