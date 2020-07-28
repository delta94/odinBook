import { postType } from "../models/post";

export const users = [
  {
    name: "jone",
    email: "jone@gmail.com",
    password: "pass",
    photoUrl: "url.com/photo.jpg",
    birthday: "20-12-2020",
  },
  {
    name: "jojo",
    email: "jojo@jojo_cop.com",
    password: "passo",
  },
  {
    name: "reka",
    email: "reka@anne.com",
    password: "good pass",
  },
];

export const posts = [
  {
    type: postType.text,
    text: "meme review",
  },
];

export const updatedUser = {
  name: "jone",
  email: "jone@gmail.com",
  pass: "passs",
  photoUrl: "url.com/photo.jpg",
  birthday: "20-12-2020",
};

export const totalInvalidUser = {
  name: "jone",
  email: "jonegmail.com",
  photoUrl: "urlphoto",
};

export const invalidId = "444444444444444444444444";
