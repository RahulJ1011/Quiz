const mongoose = require('mongoose');

const connection = ()=>
{
    try
    {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log("mongoose is connected")
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {connection};