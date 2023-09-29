import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-coffee-flavours',
  templateUrl: './coffee-flavours.page.html',
  styleUrls: ['./coffee-flavours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CoffeeFlavoursPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
