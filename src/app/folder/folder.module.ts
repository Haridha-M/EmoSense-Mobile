import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { HomeComponent } from './home/home.component';
import { MoodChooseComponent } from './mood-choose/mood-choose.component';
import { CardListComponent } from './card-list/card-list.component';
import { SharedModule } from 'primeng/api';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,SharedModule
  ],
  declarations: [FolderPage, HomeComponent,MoodChooseComponent,CardListComponent,NotesComponent]
})
export class FolderPageModule {}
