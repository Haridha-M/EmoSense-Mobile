import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,FormsModule
  ],
  exports:[
    ReactiveFormsModule,FormsModule
  ]
})
export class SharedModule { }
