import { Component, OnInit } from '@angular/core';

import { ApiCartService } from '../../service/api-cart.service';
import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartProduct } from '../../Model/cart/cart-model';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { TagModule } from 'primeng/tag';

interface Message {
  severity: string;   // Puede ser 'success', 'info', 'warn', 'error'
  summary: string;    // Un título corto del mensaje
  detail: string;     // El contenido o detalle del mensaje
}

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe, CommonModule, CardModule, FormsModule, ButtonModule, PercentPipe,
    MessagesModule,
    ButtonModule, 
    InputNumberModule, 
    CardModule  ,
    DataViewModule,
    PickListModule,
    TagModule
  ],
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  providers: [ApiCartService, MessageService],
})
export class BasketComponent implements OnInit {
  constructor(private apiCartService: ApiCartService) {}
    cartItems: CartProduct[] = [];
    total: number = 0;
    shippingCost: number = 10;  // Costo de envío fijo, puedes hacer esto dinámico
    messages: any[] = [];
    countItemns: number = 0;
    countItemnsDiscount: number = 0;
    totalDiscount: number = 0;
    totalWithoutDiscount: number = 0;

    ngOnInit() {
      this.apiCartService.cartItems$.subscribe(items => {
        console.log('BasketComponent. Items en el carrito:', items);
        this.cartItems = items;

        this.countItemns = this.apiCartService.getItemsCount();
        this.countItemnsDiscount = this.apiCartService.getItemsDiscountCount();
        this.total = this.apiCartService.getTotal();
        this.totalDiscount = this.apiCartService.getTotalWithDiscount();
        this.totalWithoutDiscount = this.apiCartService.getTotalWithoutDiscount();
      });
    }
  
    // Función para mostrar mensajes
    showMessage(severity: string, summary: string, detail: string) {
      this.messages = [];
      this.messages.push({ severity, summary, detail });
    }
  
    // Actualizar la cantidad de un producto
    updateQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.apiCartService.updateQuantity(productId, quantity);
        this.showMessage('info', 'Cantidad actualizada', 'La cantidad del producto ha sido actualizada.');
      }
    }
  
    // Eliminar un producto del carrito
    removeItem(productId: number) {
      this.apiCartService.removeFromCart(productId);
      this.showMessage('info', 'Producto eliminado', 'El producto ha sido eliminado del carrito.');
    }
  
    // Proceder al pago
    proceedToCheckout() {
      if (this.cartItems.length === 0) {
        this.showMessage('warn', 'Carrito vacío', 'No puedes proceder al pago porque tu carrito está vacío.');
      } else {
        this.showMessage('success', 'Procediendo al pago', 'Redirigiendo al proceso de pago...');
      }
    }
  }