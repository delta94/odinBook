import { Schema, Document, model } from "mongoose";
import { IUser } from "./user";

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["text"],
      required: true,
    },
    text: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

postSchema.virtual("baseUrl").get(function () {
  return "/posts/";
});

export interface IPost extends Document {
  user: IUser | string;
  type: postType;
  text: string;
  likes: IUser[] | string[];
}

export interface PostBase {
  _id?: string;
  user?: string | IUser;
  type: postType;
  text: string;
}

export enum postType {
  text = "text",
}

export const enum PostNaming {
  USER = "user",
  TYPE = "type",
  TEXT = "text",
  LIKES = "likes",
  BASE_URL = "/posts/",
}
export default model<IPost>("Post", postSchema);
