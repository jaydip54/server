let mongoose = require("mongoose");

let connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then((response) => {
                console.log(`CONNECT DB SUCCESS`);
            })
            .catch((error) => {
                console.log('ERROR CONNECT TO DB', error);
            })
    } catch (error) {
        console.log('ERROR', error);
    }
}

module.exports = { connectDB }