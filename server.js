const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect");
const routes = require("./routes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: '*',
    }
));

connectDB();

app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
