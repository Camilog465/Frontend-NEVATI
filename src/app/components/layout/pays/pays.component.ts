import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.css'
})
export class PaysComponent {
  metodos = [
    { nombre: 'Visa', numeroTarjeta: '**** **** **** 1234', iconoUrl: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png' },
    { nombre: 'MasterCard', numeroTarjeta: '**** **** **** 5678', iconoUrl: 'https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1225-3kb6axel.png' },
    { nombre: 'PayPal', numeroTarjeta: 'Cuenta de PayPal', iconoUrl: 'https://cdn-icons-png.flaticon.com/512/174/174861.png' }
  ];
}
