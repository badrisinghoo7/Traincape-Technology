const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://badri:singh@cluster0.frdj16f.mongodb.net/TrainCapeTechnology?retryWrites=true&w=majority&appName=Cluster0"
);
// const connection = mongoose.connect("mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6")

module.exports = {
  connection,
};
