const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/onlineshopping',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology : true
// })

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
