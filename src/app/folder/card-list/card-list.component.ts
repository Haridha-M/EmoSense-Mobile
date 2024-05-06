import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import * as moment from 'moment';
import { ModalController, PickerController } from '@ionic/angular';
import { NotesComponent } from '../notes/notes.component';
import { ViewNotesComponent } from '../view-notes/view-notes.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent  implements OnInit {
  error: any;
  formattedData: any;
  cardList: any[] = []; // Assuming cardList is of type array
  visible: boolean = false;
  moodImageMapping: { [key: string]: string } = {
    'happy': '/assets/smileys/happy.png',
    'sad': '/assets/smileys/sad.png',
    'angry': '/assets/smileys/angry.png',
    'excited': '/assets/smileys/excited.png',
    'bored': '/assets/smileys/bored.png',
    'confused': '/assets/smileys/confused.png',
    'calm': '/assets/smileys/calm.png',
    'tired': '/assets/smileys/tired.png',
    'disappointed': '/assets/smileys/disappointed.png'
  };

  constructor(private apiService:ServiceService,private pickerCtrl: PickerController,private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('hhhhh');
    this.getCardList()
  }
 
  getCardList() {
    this.apiService.getCardList().subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        // Create a new array with modified createdAt field
        this.cardList = res.data.map((e: any) => {
          console.log('Mood:', e.mood); // Log the mood value
          return {
            ...e,
            moodImage: this.moodImageMapping[e.mood?.toLowerCase()] || '/assets/smileys/default.png',
            createdAt: moment(e.createdAt).format("DD MMM YYYY") // Default image if mood is not found
          };
        });
  
        console.log('Formatted card list:', this.cardList);
        // Continue with your logic here...
      },
      error: (err) => {
        console.log('Error:', err.error);
        this.error = err.error.err;
      }
    });
  }
async addNotes(id:any) {
console.log(id,'oooooo');

  const modal = await this.modalCtrl.create({
    component: NotesComponent,
    componentProps: {
      id: id
    }
  });
  
  modal.onDidDismiss().then((data) => {
    if (data && data.data) {
      const notes = data.data;
      console.log('Notes entered:', notes);
      // Do something with the notes here
    }
  });

  return await modal.present();
}
async viewNotes(id:any) {
  
    const modal = await this.modalCtrl.create({
      component: ViewNotesComponent,
      componentProps: {
        viewId: id
      }
    });
    
    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const notes = data.data;
        console.log('Notes entered:', notes);
        // Do something with the notes here
      }
    });
  
    return await modal.present();
  }
  
}
