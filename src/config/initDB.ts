import "colors";
import { connect } from "mongoose";

export const initDB = async () => {
  const { connection } = await connect(process.env.MONGO_URL!);
  console.log(
    `Connected to MongoDB: ${connection.host}|${connection.name}`.inverse
  );
};
