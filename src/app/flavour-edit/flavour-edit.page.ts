import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Pod } from '../coffee-flavours/coffee-flavours.page';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner, BarcodeScannerPlugin, ScanOptions, ScanResult, SupportedFormat, CameraDirection } from '@capacitor-community/barcode-scanner';

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
  image: string | undefined;
  scanner: BarcodeScannerPlugin;

  constructor(private modalController: ModalController, private apiService: ApiService, private alertController: AlertController) {
    this.scanner = BarcodeScanner;
  }

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

  async capturePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.image = image.dataUrl;
  }

  savePod() {
    const pod = this.getPod();
    this.apiService.savePod(pod, this.image).subscribe(response => {
      console.log(response);
      this.dismiss();
      this.presentSuccessAlert();
    }, error => {
      console.error(error);
      this.presentErrorAlert();
    });
  }

  private getPod(): Pod {
    return {
      productNumber: this.barcode,
      name: this.flavourName,
      pricePerBox: this.pricePerBox,
      pricePerUnit: this.pricePerUnit
    };
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Pod saved successfully',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Failed to save pod',
      buttons: ['OK']
    });

    await alert.present();
  }

  async scanBarcode() {
    try {
      const options: ScanOptions = {
        targetedFormats: [SupportedFormat.QR_CODE, SupportedFormat.PDF_417],
        cameraDirection: CameraDirection.BACK
      };
  
      const result: ScanResult = await this.scanner.startScan(options);
      if (result.hasContent) {
        this.barcode = result.content;
      }
    } catch (error) {
      console.error(error);
      this.presentErrorAlert();
    }
  }

}