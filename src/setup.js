import dotenv from "dotenv";

const { NODE_ENV } = process.env;

const path = NODE_ENV === "test" ? "test.env" : ".env";

dotenv.config({ path });