export class PostRequest{
  userId: string;
  content: string;
  attachment: string;


  constructor(userId: string, content: string, attachment: string) {
    this.userId = userId;
    this.content = content;
    this.attachment = attachment;
  }
}
