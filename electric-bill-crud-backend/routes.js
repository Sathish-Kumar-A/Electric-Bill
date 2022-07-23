const express = require("express");
const Router=express.Router();
const { readAllRecords, readById } = require("./controllers/read");
const { createNewRecord } = require("./controllers/create");
const { deleteRecord } = require("./controllers/delete");
const {updateRecord}=require("./controllers/update");


Router.route("/").get(readAllRecords);
Router.route("/bill/:id").get(readById);

Router.route("/").post(createNewRecord);
Router.route("/:id/edit").put(updateRecord);
Router.route("/delete/:id").delete(deleteRecord);
module.exports=Router