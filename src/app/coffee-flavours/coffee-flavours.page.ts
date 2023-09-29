import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { FlavourEditPage } from '../flavour-edit/flavour-edit.page';

export interface Pod {
  ID: number;
  Barcode: string;
  Name: string;
  PricePerBox: number;
  PricePerPod?: number;
  PodsPerBox: number;
  PhotoName: string;
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
    ID: 1,
    Barcode: 'CP001',
    Name: 'Vanilla',
    PricePerBox: 10,
    PricePerPod: 0.5,
    PodsPerBox: 20,
    PhotoName: 'vanilla.jpg'
  },
  {
    ID: 2,
    Barcode: 'CP002',
    Name: 'Caramel',
    PricePerBox: 12,
    PricePerPod: 0.6,
    PodsPerBox: 24,
    PhotoName: 'caramel.jpg'
  },
  {
    ID: 3,
    Barcode: 'CP003',
    Name: 'Hazelnut',
    PricePerBox: 15,
    PricePerPod: 0.75,
    PodsPerBox: 30,
    PhotoName: 'hazelnut.jpg'
  }];

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.apiService.getProducts().subscribe({
      next: async (response: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, 'text/xml');
        const pods = Array.from(xml.getElementsByTagName('Product')).map((product: Element) => {
          return {
            ID: parseInt(product.getElementsByTagName('ID')[0]?.textContent || '0'),
            Barcode: product.getElementsByTagName('Barcode')[0]?.textContent || '',
            Name: product.getElementsByTagName('Name')[0]?.textContent || '',
            PricePerBox: parseFloat(product.getElementsByTagName('PricePerBox')[0]?.textContent || '0'),
            PricePerPod: parseFloat(product.getElementsByTagName('PricePerPod')[0]?.textContent || '0'),
            PodsPerBox: parseFloat(product.getElementsByTagName('PodsPerBox')[0]?.textContent || '0'),
            PhotoName: product.getElementsByTagName('PhotoName')[0]?.textContent || ''
          };
        });
        console.log(pods);
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

  async add(): Promise<void> {
    const modal = await this.modalController.create({
      component: FlavourEditPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.pod) {
      this.pods.push(data.pod);
    }
  }

  async edit(pod: Pod): Promise<void> {
    const modal = await this.modalController.create({
      component: FlavourEditPage,
      componentProps: {
        pod
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.pod) {
      const index = this.pods.findIndex(p => p.ID === data.pod.ID);
      if (index >= 0) {
        this.pods[index] = data.pod;
      }
    }
  }

  async delete(pod: Pod): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to delete ${pod.Name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.apiService.deletePod(pod.ID).subscribe({
              next: (response: string) => {
                if (response === 'true') {
                  const index = this.pods.findIndex(p => p.ID === pod.ID);
                  if (index >= 0) {
                    this.pods.splice(index, 1);
                  }
                } else {
                  this.alertController.create({
                    header: 'Error',
                    message: 'Failed to delete coffee flavour.',
                    buttons: ['OK']
                  }).then(alert => alert.present());
                }
              },
              error: (error: any) => {
                console.error(error);
                this.alertController.create({
                  header: 'Error',
                  message: 'Failed to delete coffee flavour.',
                  buttons: ['OK']
                }).then(alert => alert.present());
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}