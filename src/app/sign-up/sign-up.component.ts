import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {
  @ViewChild('passwordInput', { static: true }) passwordInput!: IonInput;

  passwordFieldType: 'password' | 'text' = 'password';
  showPassword: boolean = false; 
  error: any;
  loginForm:FormGroup
  name: any;
  showError:boolean=false;


  constructor(private router:Router,private apiService:ServiceService,private fb:FormBuilder) { 
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
  loginToPage(){
    if (this.loginForm.valid) { 
    const data=this.loginForm.value
    console.log(data,'llllllll');
    
this.apiService.signUp(data).subscribe({
  next: (data:any) => {
    this.router.navigate(['/login'])
    this.loginForm.reset()
  },
  error: (err) => {
    console.log('error',err.error);
    this.error = err.error.err;
  }
});
    }else{
      this.showError=true
      this.loginForm.markAllAsTouched()
    }
  }
  moveToSignUp(){
    this.router.navigate(['/login'])
  }

}
