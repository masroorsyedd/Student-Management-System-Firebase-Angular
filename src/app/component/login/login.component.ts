import { AuthService } from './../../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password: any = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login(){

    if(this.email=='')
      {
        alert('Please enter your email');
        return;
      }

      if(this.password=='')
      {
        alert('Please enter your email');
        return;
      }

      this.auth.login(this.email,this.password);
      this.email='';
      this.password='';
  }

  //SignIn with Google
  signInWithGoogle(){
    this.auth.googleSignIn();
  }
}
