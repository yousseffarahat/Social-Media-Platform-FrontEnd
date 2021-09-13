export class FriendRequest {
  id: string;
  userId: string;
  friendId: string;
  friendFirstName: string;
  friendLastName: string;

  constructor(id: string, userId: string, friendId: string, friendFirstName: string, friendLastName: string) {
    this.id = id;
    this.userId = userId;
    this.friendId = friendId;
    this.friendFirstName = friendFirstName;
    this.friendLastName = friendLastName;
  }
}
