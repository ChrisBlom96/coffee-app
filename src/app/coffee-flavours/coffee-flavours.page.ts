import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { FlavourEditPage } from '../flavour-edit/flavour-edit.page';

export interface Pod {
  name: string;
  productNumber: string;
  photoUrl?: string;
  pricePerBox: number;
  pricePerUnit: number;
}

@Component({
  selector: 'app-coffee-flavours',
  templateUrl: './coffee-flavours.page.html',
  styleUrls: ['./coffee-flavours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CoffeeFlavoursPage implements OnInit {
  pods: Pod[] = [{
    name: 'Vanilla',
    productNumber: 'CP001',
    photoUrl: 'https://via.placeholder.com/150',
    pricePerBox: 10,
    pricePerUnit: 0.5
  },
  {
    name: 'Caramel',
    productNumber: 'CP002',
    photoUrl: 'https://via.placeholder.com/150',
    pricePerBox: 12,
    pricePerUnit: 0.6
  },
  {
    name: 'Hazelnut',
    productNumber: 'CP003',
    photoUrl: 'https://via.placeholder.com/150',
    pricePerBox: 15,
    pricePerUnit: 0.75
  },
  {
    name: 'Chocolate',
    productNumber: 'CP004',
    photoUrl: 'https://via.placeholder.com/150',
    pricePerBox: 18,
    pricePerUnit: 0.9
  },
  {
    name: 'Cinnamon',
    productNumber: 'CP005',
    photoUrl: 'https://via.placeholder.com/150',
    pricePerBox: 20,
    pricePerUnit: 1
  }];

  constructor(private apiService: ApiService, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.apiService.getProducts().subscribe({
      next: async (response: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, 'text/xml');
        const pods = Array.from(xml.getElementsByTagName('Product')).map((product: Element) => {
          return {
            name: product.getElementsByTagName('ProductName')[0]?.textContent || '',
            productNumber: product.getElementsByTagName('ProductNumber')[0]?.textContent || '',
            photoUrl: product.getElementsByTagName('PhotoUrl')[0]?.textContent || '',
            pricePerBox: parseFloat(product.getElementsByTagName('PricePerBox')[0]?.textContent || '0'),
            pricePerUnit: parseFloat(product.getElementsByTagName('PricePerUnit')[0]?.textContent || '0')
          };
        });
        this.pods = pods;
        const alert = await this.alertController.create({
          header: 'Refreshed',
          message: 'Coffee flavours have been refreshed.',
          buttons: ['OK']
        });
        await alert.present();
      },
      error: async (error: any) => {
        console.error(error);
        const alert = await this.alertController.create({
          header: 'Sync',
          message: 'Syncing Completed!',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async add() {
    const modal = await this.modalController.create({
      component: FlavourEditPage
    });
    return await modal.present();
  }

  async edit(pod: Pod) {
    const modal = await this.modalController.create({
      component: FlavourEditPage,
      componentProps: {
        pod: pod
      }
    });
    return await modal.present();
  }

  delete(pod: Pod): void {
    // TODO: Implement delete functionality
  }
}