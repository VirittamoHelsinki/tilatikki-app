import app from './app'
import connectDB from './configs/connectDB';




// Start the server.
const start = async () => {
    try {
      await connectDB(process.env.MONGODB_DEV_URI || '');
      app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start()