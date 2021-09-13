export class Comment{
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  content: string;

  constructor(id: string, userId: string, firstName: string, lastName: string, content: string) {
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.content = content;
  }
}
