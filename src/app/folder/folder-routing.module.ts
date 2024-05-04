import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { MoodChooseComponent } from './mood-choose/mood-choose.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path:'moodChoose',
    component:MoodChooseComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
