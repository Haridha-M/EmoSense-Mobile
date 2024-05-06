import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { MoodChooseComponent } from './mood-choose/mood-choose.component';
import { CardListComponent } from './card-list/card-list.component';
import { NotesComponent } from './notes/notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path:'moodChoose',
    component:MoodChooseComponent

  },
  {
    path:'card-list',
    component:CardListComponent

  },
  {
    path:'notes',
    component:NotesComponent
  },
  {
    path:'view-notes',
    component:ViewNotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
