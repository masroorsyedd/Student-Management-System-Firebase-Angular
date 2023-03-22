import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : any = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register(){

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

      this.auth.register(this.email,this.password);
      this.email='';
      this.password='';
  }
}
