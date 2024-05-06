import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
showError:boolean=false;


  constructor(private router:Router,private apiService:ServiceService,private fb:FormBuilder) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.showError = false; // Reset showError when form values change
    });
    console.log(this.loginForm,'hhhhhhhh');
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword; // Update showPassword accordingly
    this.passwordInput.type = this.passwordFieldType;
  }
  loginToPage() {
    if (this.loginForm.valid) { // Check if the form is valid
      console.log('kkkkkk');
      
      const data = this.loginForm.value;
      console.log(data, 'llllllll');
      
      this.apiService.login(data).subscribe({
        next: (data: any) => {
          console.log('data', data);
          // this.router.navigate(['/home']);
          // Store token in local storage
          localStorage.setItem('userId', data.data[0].id);
          console.log(localStorage.getItem('userId'), 'gggggggg'); 
          this.router.navigate(['/folder/home'])
          this.loginForm.reset()
          
        },
        error: (err) => {
          console.log('error', err.error);
          this.error = err.error.err; // Set error message
        }
      });
    }else{
      this.showError=true
      this.loginForm.markAllAsTouched()
    }
  }
  

}
