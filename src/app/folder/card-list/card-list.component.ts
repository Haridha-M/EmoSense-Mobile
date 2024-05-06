import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import * as moment from 'moment';
import { PickerController } from '@ionic/angular';

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

  constructor(private apiService:ServiceService,private pickerCtrl: PickerController) { }

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
            moodImage: this.moodImageMapping[e.mood.toLowerCase()] || '/assets/smileys/default.png',
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
  async addNotes() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'languages',
          options: [
            {
              text: 'JavaScript',
              value: 'javascript',
            },
            {
              text: 'TypeScript',
              value: 'typescript',
            },
            {
              text: 'Rust',
              value: 'rust',
            },
            {
              text: 'C#',
              value: 'c#',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`You selected: ${value.languages.value}`);
          },
        },
      ],
    });

    await picker.present();
}
  
}
