import mongoose from 'mongoose';

const connectToDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((error) => {
      console.log('Error connecting to MongoAtlas database: ', error);
    });
};
export default connectToDatabase;
