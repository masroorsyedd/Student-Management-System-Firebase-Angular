import { Student } from './../../model/student';
import { DataService } from './../../shared/data.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

studentObj : Student = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  mobile: ''
};
studentsList : Student [] = [];
id : string = '';
first_name : string = '';
last_name : string = '';
email : string = '';
mobile : string = '';

  constructor(private auth : AuthService, private data : DataService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  // register(){
  //   this.auth.logout()
  // }

  getAllStudents(){
    this.data.getAllStudents().subscribe(result => {
      this.studentsList = result.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    },
    err => {
      alert('Error while fetching the data');
    });
  }

  resetform(){
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }
  addStudent(){
    if(this.first_name == ''|| this.last_name=='' || this.mobile =='' || this.email == ''){
      alert('Fill all input fields');
      return;
    }
     this.studentObj.id ='';
     this.studentObj.email = this.email;
     this.studentObj.first_name = this.first_name;
     this.studentObj.last_name = this.last_name;
     this.studentObj.mobile = this.mobile;
     
     this.data.addStudent(this.studentObj);
     this.resetform();
  }

  updateStudent(){

  }
  
  deleteStudent(student : Student){
    if(window.confirm('Are you sure you want to delete? '+ student.first_name+ ' '+student.last_name)) {
    this.data.deleteStudent(student);
    }
  }
}
