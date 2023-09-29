import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  login() {
    this.apiService.validateLogin(this.username, this.password).subscribe(response => {
      console.log(response);
      // handle successful login
    }, error => {
      console.error(error);
      // handle login error
    });
  }
}