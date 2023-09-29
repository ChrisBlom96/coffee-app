import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';

interface Pod {
  name: string;
  productNumber: string;
  photoUrl: string;
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
    photoUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Caramel',
    productNumber: 'CP002',
    photoUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Hazelnut',
    productNumber: 'CP003',
    photoUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Chocolate',
    productNumber: 'CP004',
    photoUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Cinnamon',
    productNumber: 'CP005',
    photoUrl: 'https://via.placeholder.com/150'
  }];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.apiService.getProducts().subscribe((response: string) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(response, 'text/xml');
      const pods = Array.from(xml.getElementsByTagName('Product')).map((product: Element) => {
        return {
          name: product.getElementsByTagName('ProductName')[0]?.textContent || '',
          productNumber: product.getElementsByTagName('ProductNumber')[0]?.textContent || '',
          photoUrl: product.getElementsByTagName('PhotoUrl')[0]?.textContent || ''
        };
      });
      this.pods = pods;
    });
  }

  add(): void {
    // TODO: Implement add functionality
  }

  edit(pod: Pod): void {
    // TODO: Implement edit functionality
  }

  delete(pod: Pod): void {
    // TODO: Implement delete functionality
  }
}