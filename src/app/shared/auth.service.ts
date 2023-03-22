import { VerifyEmailComponent } from './../component/verify-email/verify-email.component';

import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  //login method
  login(email:string, password:any){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res=> {
      localStorage.setItem('token','true');

      if(res.user?.emailVerified==true){
        this.router.navigate(['/dashboard']);
      }
     
      else{
        this.router.navigate(['/verify-email']);
      }
    },
    err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email:string, password:any){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( res => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
      this.sendVerificationEmail(res.user);
    },
    err=>{
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //logout method
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },
    err=>{
      alert(err.message);
    })
  }

  //forgetPassword method
  forgetPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['/verify-email']);
    },
    err=>{
      alert('Something went wrong');
    })
  }

  //email verification
  sendVerificationEmail(user: any){
   user.sendEmailVerification()
   .then((result: any) => {
    this.router.navigate(['/verify-email']);
   }).catch((err: any) => {
    alert('Something wen wrong, not able to send mail to your email.');
   });

  }

  //sign in with google
  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider)
    .then((result) => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(result.user?.uid));
    })
    .catch((err) => {
      alert(err.message);
    });
  }
}
