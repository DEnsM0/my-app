import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from '../../interfaces/interfaces';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input() friend: Friend;
  added: boolean = false;

  @Output()
  update = new EventEmitter<any>();

  constructor(
    private friendServ: FriendService,
    public _router: Router
  ) { }

  ngOnInit(): void {

  }

  addFriend(friend){
    this.friendServ.addFriend(friend).subscribe();
    this.friendServ.getFriendsList();
    this.updateComplete();
  }
  removeFriend(friend){
    this.friendServ.removeFriend(friend).subscribe();
    this.friendServ.getFriendsList();
    this.updateComplete();
  }
  checkFriendsList(id) {
    if (this.friendServ.friendsList.some(el => el.id === id)){
      return true
    } 
    else return false
  }
  updateComplete(){
    this.update.emit('done')
  }

}
