import { Injectable } from '@angular/core';
import 'firebase/compat/database';
import { getAuth, updateEmail } from "firebase/auth";
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/interfaces';
import { child, get, getDatabase, ref } from '@angular/fire/database';


@Injectable({providedIn:'root'})

export class ProfileService {
    email: string 

  constructor(private http: HttpClient) {}

  getUserEmail():string{
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
    return user.email;
    }else{
      return ""
    }
  }
  updateUserEmail(email:string){
    const auth = getAuth();
    const user = auth.currentUser;
    updateEmail(user, email).then(() => {
        }).catch((error) => {
            console.log(error)
        });
  }
  getProfile(){
    const dbRef = ref(getDatabase());
    let user={}
    return from(get(child(dbRef, `user/1`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available");
        return
      }
    }).catch((error) => {
      console.error(error);
    }));
  }
  updateProfile(user:User):Observable <User>{
      return this.http.put<User>(`${environment.Datebase}/user/1.json`, user)
  }


}