import Datastore from "nedb-promises";

const usersDB = Datastore.create({
  filename: "../db/users.db",
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
