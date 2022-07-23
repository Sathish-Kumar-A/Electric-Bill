const EBSchema = require("../model");

const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await EBSchema.findByIdAndDelete(id);
        if (!record) { 
            res.status(404).send({
                success: false,
                message: "Record not found"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Record deleted successfully",
                data: record
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error deleting record",
            error: error
        });
    }
}
 
module.exports={deleteRecord}