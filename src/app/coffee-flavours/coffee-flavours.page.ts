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
  pods: Pod[] = [];

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh(): Promise<void> {
    try {
      const response = await this.apiService.getProducts().toPromise();
      const parser = new DOMParser();
      const xml = parser.parseFromString(response, 'text/xml');
      const json = xml.getElementsByTagName('GetAllEntriesFromCOFFEESTOCK_TEMP_APPLICATIONResult')[0]?.textContent || '';
      const pods = JSON.parse(json);
      console.log(pods);
      this.pods = pods;
      const alert = await this.alertController.create({
        header: 'Refreshed',
        message: 'Coffee flavours have been refreshed.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error(error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to load coffee flavours.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async add(): Promise<void> {
    const modal = await this.modalController.create({
      component: FlavourEditPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.pod) {
      this.pods.push(data.pod);
      this.refresh();
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
        this.refresh();
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
          handler: async () => {
            const response = await this.apiService.deletePod(pod.ID).toPromise();
            if (response === 'true') {
              const index = this.pods.findIndex(p => p.ID === pod.ID);
              if (index >= 0) {
                this.pods.splice(index, 1);
                this.refresh();
              }
            } else {
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'Failed to delete coffee flavour.',
                buttons: ['OK']
              });
              await alert.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}