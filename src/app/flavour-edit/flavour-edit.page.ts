import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Pod } from '../coffee-flavours/coffee-flavours.page';

@Component({
  selector: 'app-flavour-edit',
  templateUrl: './flavour-edit.page.html',
  styleUrls: ['./flavour-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FlavourEditPage implements OnInit {
  @Input() pod?: Pod;
  barcode: string = '';
  flavourName: string = '';
  pricePerBox: number = 0;
  pricePerUnit: number = 0;

  constructor(private modalController: ModalController, private apiService: ApiService) { }

  ngOnInit() {
    if (this.pod) {
      this.barcode = this.pod.productNumber;
      this.flavourName = this.pod.name;
      this.pricePerBox = this.pod.pricePerBox;
      this.pricePerUnit = this.pod.pricePerUnit;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

}