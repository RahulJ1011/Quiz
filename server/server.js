const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))


const port = process.env.PORT || 5000

app.listen(port,()=> {
    console.log(`Server is listening on ${port}`)
})

