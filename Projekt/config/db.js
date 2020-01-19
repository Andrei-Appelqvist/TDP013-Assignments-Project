const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try{
    //returns promise so we want to wait
    await mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false});
    console.log('Connected to MongoDB');
  }catch(err){
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
