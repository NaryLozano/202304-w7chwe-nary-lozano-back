import "./loadEnvironments.js";
import mongoose from "mongoose";
import chalk from "chalk";
import createDebug from "debug";
import app from "./server/index.js";

const debug = createDebug("social-network-api:root");

const mongoDbConnection = process.env.MONGODB_CONNECTION;

const port = process.env.PORT ?? 4000;

mongoose.set("debug", true);

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  },
});

if (!mongoDbConnection) {
  debug(
    `${chalk.redBright(`an Error has ocurred`)} and cant connect to the server`
  );
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});

try {
  await mongoose.connect(mongoDbConnection);
} catch (error: unknown) {
  debug(
    `Error connecting to database ${chalk.redBright((error as Error).message)}`
  );
}
