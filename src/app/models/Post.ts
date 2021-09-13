import {Comment} from "./Comment";

export class Post{
  id: string;
  content: string;
  attachment: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  comments: Comment[];
  likes: string[];

  constructor(id: string, content: string, attachment: string, userId: string, userFirstName: string, userLastName: string, comments: Comment[], likes: string[]) {
    this.id = id;
    this.content = content;
    this.attachment = attachment;
    this.userId = userId;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.comments = comments;
    this.likes = likes;
  }
}
