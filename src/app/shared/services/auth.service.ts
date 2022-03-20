import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'; 
import {tap} from 'rxjs/operators';
import { AuthResponse, User } from "../interfaces/interfaces";
import {environment} from '../../../environments/environment';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@angular/fire/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private client: HttpClient,
      private auth: Auth) {}
 
    get token(): string | null {
      const expDate = new Date(''+localStorage.getItem('token-exp'))
      if(new Date() > expDate){
        this.logout();
        return null
      }
      return localStorage.getItem('token')
    }
  
    login(user: User ): Observable<any> {
      user.returnSecureToken = true;
      return this.client.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
    }
    logIn({ email, password }: User) {
      return signInWithEmailAndPassword(this.auth, email, password)
    }

    writeUserData(userId) {
    return firebase.database().ref('users/' + userId).get();
    }
  
    logout() {
      this.setToken(null)
    }
  
    isAuthenticated(): boolean {
      return !!this.token
    }
  
    private setToken(response: AuthResponse | null | any) {
      if(response){
        const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
        localStorage.setItem('token', response.idToken)
        localStorage.setItem('token-exp', expDate.toString())
      } else {
        localStorage.clear()
      }
    }
}