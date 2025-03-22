const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongo atlas');
        
    } catch (error) {
        console.log('failed to connect' , error);
        
    }
}

module.exports = connectDB;