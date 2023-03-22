import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email : string = '';
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  forgetPassword(){
      this.auth.forgetPassword(this.email);
      this.email='';
  }
}
