const EBSchema = require("../model");

const updateRecord = async (req, res) => { 
    try {
        const { id } = req.params;
        const updatedResult = await EBSchema.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResult) { 
            res.status(404).send({
                success: false,
                message: "Record not found"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Record updated successfully",
                data: updatedResult
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating record",
            error: error
        });
    }
}

module.exports={updateRecord}