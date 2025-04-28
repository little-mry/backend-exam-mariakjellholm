export interface NewUser {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface DBUser extends NewUser {}

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Note {
  userId: string;
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  modifiedAt: string;
}

export interface DBNote extends Note {}

