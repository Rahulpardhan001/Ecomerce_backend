const mongoose = require("mongoose");

module.exports.init = async function () {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ex6qc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
}


