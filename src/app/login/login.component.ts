import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  @ViewChild('passwordInput', { static: true }) passwordInput!: IonInput;

  passwordFieldType: 'password' | 'text' = 'password';
  showPassword: boolean = false; 


  constructor(private router:Router) { }

  ngOnInit() {}
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword; // Update showPassword accordingly
    this.passwordInput.type = this.passwordFieldType;
  }
  routeToPage(){
    console.log('kkkkkkkk');
    
    this.router.navigate(['/folder'])
  }
}
