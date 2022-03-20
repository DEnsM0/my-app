import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { Friend } from "../interfaces/interfaces";


@Injectable({providedIn:'root'})

export class FriendService{

    friendsList: Friend[] =[]

    constructor(private http: HttpClient){}
    getAll():Observable <Friend[]>{
        return this.http.get(`${environment.Datebase}/friends.json`)
        .pipe( map((res:{[key:string]:any}) => {
                return Object.keys(res)
                .map( key => ({
                    ...res[key],
                    id: key
                }))
            })
        )
    }
    addFriend(friend:Friend):Observable <Friend>{
        return this.http.put<Friend>(`${environment.Datebase}/myfriends/${friend.id}.json`, friend)
    }
    getMyFriends():Observable <Friend[]>{
        return this.http.get(`${environment.Datebase}/myfriends.json`)
        .pipe( map((res:{[key:string]:any}) => {
                return Object.keys(res)
                .map( key => ({
                    ...res[key],
                    id: key
                }))
            })
        )
    }
    getFriendsList(){
        this.getMyFriends().subscribe((products:Friend[]) =>{
            this.friendsList = products
          }, (err) => {
            this.friendsList=[];
          });
    }
    removeFriend(friend):Observable<void>{
        return this.http.delete<void>(`${environment.Datebase}/myfriends/${friend.id}.json`)
    }
}

