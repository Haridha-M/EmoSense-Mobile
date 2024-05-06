import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: any;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    // Assuming 'id' is the parameter name for your folder page
    const id:any = this.activatedRoute.snapshot.paramMap.get('id');

    // Find the page object with the corresponding URL
    const page = this.appComponent.appPages.find(page => page.url.includes(id));

    // If the page is found, set the folder to its title
    if (page) {
      this.folder = page.title;
    } else {
      // Handle the case where the page is not found
      console.error(`Page with URL '${id}' not found.`);
    }
  }
}
