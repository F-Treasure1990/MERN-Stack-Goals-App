import mongoose from "mongoose";
import colors from 'colors'

export default async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    // console.log((`Mongo Connected : ${connect.connection.host}`));
    console.log(colors.cyan.underline(`Mongo Connected : ${connect.connection.host}`));
  } catch (err) {
    console.log({
      message: err,
      reply: "did not work",
    });
    process.exit(1);
  }
};

