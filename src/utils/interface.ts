export interface NewUser {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  modifiedAt: Date;
}
