import Datastore from "nedb-promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = new Datastore({
  filename: path.join(__dirname, "..", "db", "users.db"),
  autoload: true,
});

//Inserts a new user in the database
export const addUser = async (user: object) => {
  return await usersDB.insert(user);
};

//Find a user to login by email
export const fetchUser = async (email: string) => {
  return await usersDB.findOne({ email });
};
