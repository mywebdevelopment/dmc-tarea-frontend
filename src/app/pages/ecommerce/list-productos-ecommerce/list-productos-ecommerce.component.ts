import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ApiProductService } from '../../service/api-product.service';
import { PaginatorModule } from 'primeng/paginator';
import { ApiCartService } from '../../service/api-cart.service';
import { ProductEcommerceResponse } from '../../Model/product/product-model';

@Component({
  selector: 'app-list-productos-ecommerce',
  imports: [CommonModule, ButtonModule, TagModule, CurrencyPipe, PercentPipe, PaginatorModule ],
  standalone: true,
  templateUrl: './list-productos-ecommerce.component.html',
  styleUrl: './list-productos-ecommerce.component.scss',
  providers: [ApiProductService],
})
export class LisProductsEcommerceComponent implements OnInit {
  products!: ProductEcommerceResponse[];

  constructor(private apiProductService: ApiProductService,
    private apiCartService: ApiCartService
  ) {}

  ngOnInit() {
    //this.productService.getProducts().then((data) => (this.products = data));
    this.apiProductService.getProducts().then((data) => {
      this.products = data;   
    })

    this.apiCartService.cartItems$.subscribe(items => {
      console.log('list-productos-ecommerce: ', items);
    });
  }
  addToFavorites(product: any) {
    console.log('Producto agregado a favoritos:', product);
    // Aquí puedes agregar la lógica para agregar a favoritos
  }

  addToCart(product: ProductEcommerceResponse) {
    console.log('Producto agregado al carrito:', product);
    this.apiCartService.addToCart(product);
    // Aquí puedes agregar la lógica para agregar al carrito de compras
  }

}
