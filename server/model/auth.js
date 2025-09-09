const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required

    },
    password:
    {
        type:String,
        required
    }
}
)


const auth = mongoose.model('auth',userSchema);
module.exports = {auth}

