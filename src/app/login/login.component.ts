import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  @ViewChild('passwordInput', { static: true }) passwordInput!: IonInput;

  passwordFieldType: 'password' | 'text' = 'password';
  showPassword: boolean = false; 
  error: any;
  loginForm:FormGroup
name: any;


  constructor(private router:Router,private apiService:ServiceService,private fb:FormBuilder) { 
    this.loginForm = this.fb.group({
      name: '',
      email:'',
      password: ''
    });
  }

  ngOnInit() {
    console.log(this.loginForm,'hhhhhhhh');
    
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword; // Update showPassword accordingly
    this.passwordInput.type = this.passwordFieldType;
  }
  routeToPage(){
    console.log('kkkkkkkk');
    this.loginToPage()
    this.router.navigate(['/folder/home'])
  }
  loginToPage(){
    const data=this.loginForm.value
    console.log(data,'llllllll');
    
this.apiService.login(data).subscribe({
  next: (data:any) => {
    console.log('data',data);
    // this.router.navigate(['/home']);
    //stroe token in local storage
    localStorage.setItem('userId',data.data[0].id);
  },
  error: (err) => {
    console.log('error',err.error);
    this.error = err.error.err;
  }
});
  }
}
