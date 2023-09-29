import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor() {}
}
