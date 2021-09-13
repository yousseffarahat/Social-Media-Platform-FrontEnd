export class CommentRequest{
  postId: string;
  userId: string;
  content: string;

  constructor(postId: string, userId: string, content: string) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
  }
}
