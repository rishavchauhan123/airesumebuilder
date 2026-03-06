import serverless from "serverless-http";
import { createServer } from "../server/index";

const app = createServer();

// Export the serverless handler
export default serverless(app);
