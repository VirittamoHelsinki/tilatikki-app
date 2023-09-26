import * as config from './utils/config';

import app from './app'
import connectDB from './configs/connectDB';




// Start the server.
const start = async () => {
    try {
      await connectDB(config.mongoUri);
      app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start()