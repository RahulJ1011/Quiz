const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const {connection} = require("./config/db")
const userRoutes = require('./routes/authRoutes');


dotenv.config();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use('/api/quiz',userRoutes);

const port = process.env.PORT || 5000
connection();
app.listen(port,()=> {
    console.log(`Server is listening on ${port}`)
})

