import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/interfaces/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup
  userEmail: string = ""
  userName: string = ""
  userAge: number = 0
  noInput: boolean = true

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
    @Inject(FirebaseApp) firebaseApp: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email
      ]),
      username: new FormControl(null, [
        Validators.minLength(1)
      ]),
      age: new FormControl(null, [
        Validators.min(1),
        Validators.max(100)
      ])
    })
    this.getProfile();
    setTimeout(()=>{
      this.userEmail = this.profile.getUserEmail();
    },500)

  }
  submit() {
    if (this.form.invalid) {
      return
    }
    const user: User = {
      email: this.form.value.email,
    }
    this.updateEmail()
    this.updateProfile()
    setTimeout(()=>{
      this.userEmail = this.profile.getUserEmail();
      this.form.reset();
      this.getProfile()
    },1000)

  }

  updateEmail(){
    this.profile.updateUserEmail(this.form.value.email)
  }
  getProfile(){
    this.profile.getProfile().subscribe(user =>{
      this.userName =user.name;
      this.userAge =user.age;
    })
  }
  updateProfile(){
    let nameInput,ageInput;

    if(!!this.form.value.username) 
      if(this.form.value.username.trim())
      nameInput = this.form.value.username;
      else nameInput = this.userName;
    else nameInput = this.userName;

    if(!!this.form.value.age) 
    ageInput = this.form.value.age;
    else ageInput = this.userAge;

    const friend: User = {
      email: this.form.value.email,
      name:  nameInput,
      age: ageInput
    }
    this.profile.updateProfile(friend).subscribe();
  }
  checkValue(){
    if(this.form.value.age||
      this.form.value.email||
      this.form.value.name) this.noInput = false;
    else this.noInput = true;
  }
}
