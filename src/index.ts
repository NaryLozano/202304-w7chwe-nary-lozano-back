import "./server/loadEnvironments.js";
import createDebug from "debug";
import connectToDataBase from "./database/models/connectToDataBase.js";
import { app } from "./server/index.js";

const debug = createDebug("social-network-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION!;

await connectToDataBase(mongoDbConnection);

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
