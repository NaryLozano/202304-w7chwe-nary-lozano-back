import chalk from "chalk";
import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("social-network-api:connecToDataBase");

const connectToDataBase = async (connectionDB: string) => {
  try {
    mongoose.set("debug", true);

    mongoose.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
      },
    });
    await mongoose.connect(connectionDB);
  } catch (error: unknown) {
    debug(
      `Error connecting to database ${chalk.redBright(
        (error as Error).message
      )}`
    );
  }
};

export default connectToDataBase;
