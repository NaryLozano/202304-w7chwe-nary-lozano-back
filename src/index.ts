import "./loadEnvironments.js";
import chalk from "chalk";
import createDebug from "debug";
import app from "./server/index.js";
import connectToDataBase from "./database/models/connectToDataBase.js";

const debug = createDebug("social-network-api:root");

const mongoDbConnection = process.env.MONGODB_CONNECTION;

const port = process.env.PORT ?? 4000;

if (!mongoDbConnection) {
  debug(
    `${chalk.redBright(`an Error has ocurred`)} and cant connect to the server`
  );
  process.exit(1);
}

await connectToDataBase(mongoDbConnection);

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
