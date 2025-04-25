import Datastore from "nedb-promises";
import type Nedb from "nedb-promises";
import { User, DBUser, NewUser } from "../utils/interface.js";

const rawDB = Datastore.create({
  filename: "../db/users.db",
  autoload: true,
});

const usersDB = rawDB as Nedb<DBUser>

//Inserts a new user in the database
export const addUser = async (user: NewUser): Promise<DBUser | null> => {
  return await usersDB.insert(user as any)
   
};

//Find a user to login by email
export const fetchUser = async (email: string): Promise<User | null> => {
  const doc = await usersDB.findOne({ email });
  if (!doc) return null
  return {
    id: doc._id,
    email: doc.email,
    password: doc.password,
    createdAt: doc.createdAt
  };
};
