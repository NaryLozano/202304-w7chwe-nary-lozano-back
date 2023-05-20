import "./loadEnvironments.js";

import chalk from "chalk";
import createDebug from "debug";
import { app } from "./server";
const port = process.env.PORT!;

const debug = createDebug("social-network-api:root");

app.listen(port, () => {
  debug(chalk.blueBright(`Listening on port ${port}`));
});
