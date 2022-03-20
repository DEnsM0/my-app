import { Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Friend } from '../shared/interfaces/interfaces';
import { FriendService } from '../shared/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit 
{
  friends$: Observable <Friend[]>
  myfriends$: Observable <Friend[]>
  searchInput: string
  friends: Friend[]
  currentFriends: Friend[]
  nofriends: boolean = false
  loading: boolean = true

  constructor(
    private friendServ: FriendService
  ) { }

  ngOnInit() {
    this.getFriends();
    this.getMyFriends(event)
  }
  getFriends(){
    this.friendServ.getAll().subscribe((friends:Friend[]) =>{
      this.friends = friends
    }, () => {});
  }
  searchFriends(){
    if(!this.searchInput.trim()) {
      this.friends$ = of();
      return
    }
    this.currentFriends= this.friends
        .filter(friend =>{
          return friend.name.toLowerCase().includes(this.searchInput.trim().toLocaleLowerCase())
        });
    this.friends$ = of(this.currentFriends);
  }
  getMyFriends(event){
    setTimeout(() => {
      this.friendServ.getFriendsList();
      this.friendServ.getMyFriends().subscribe(() =>{
        this.loading = false;
        this.nofriends = false; 
          this.myfriends$ = this.friendServ.getMyFriends();      
    }, () => {
      this.friendServ.getFriendsList();
      this.loading = false;
      if(this.friendServ.friendsList.length===0)
      this.nofriends = true; 
      else this.nofriends = false; 
    });
    }, 500);
}
}
