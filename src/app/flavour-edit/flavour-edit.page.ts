import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flavour-edit',
  templateUrl: './flavour-edit.page.html',
  styleUrls: ['./flavour-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FlavourEditPage implements OnInit {

  constructor(private modalController: ModalController, private apiService: ApiService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}