import app from './app'
import { port } from './utils/config'
import connectDB from './configs/connectDB';


// Start the server.
const start = async () => {
    try {
      await connectDB("mongodb+srv://ale:AsJR5bYOEqGgW8Mx@tilatikkicluster.su13ojp.mongodb.net/");
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start()