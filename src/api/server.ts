import errorHandler from "errorhandler";
import app from "./app";
import connectToDatabase from '../config/MongoDBConnection';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

const initServer = async () => {

  try {
    await connectToDatabase();    
    const server = app.listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
    return server;

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }

}

initServer();


//export default server;
