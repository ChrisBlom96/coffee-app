import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(private apiService: ApiService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.apiService.validateLogin(this.username, this.password).subscribe(response => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(response, 'text/xml');
      const json = JSON.parse(xml.getElementsByTagName('ValidateLoginResult')[0]?.textContent || '');
      console.log(json);
      if (json.Success) {
        // handle successful login
        this.router.navigate(['/coffee-flavours']);
      } else {
        // handle login error
        this.presentAlert('Login Error', 'Invalid username or password.');
      }
    }, error => {
      console.error(error);
      // handle login error
      this.presentAlert('Login Error', 'Invalid username or password.');
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}