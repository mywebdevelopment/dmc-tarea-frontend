import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductEcommerceResponse } from '../Model/product/product-model';
import { environment } from '../../../environment/environment ';

interface InventoryStatus {
    label: string;
    value: string;
}


@Injectable()
export class ApiProductService {
    private readonly apiUrl = environment.backendUrl;

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        'Bamboo Watch',
        'Black Watch',
        'Blue Band',
        'Blue T-Shirt',
        'Bracelet',
        'Brown Purse',
        'Chakra Bracelet',
        'Galaxy Earrings',
        'Game Controller',
        'Gaming Set',
        'Gold Phone Case',
        'Green Earbuds',
        'Green T-Shirt',
        'Grey T-Shirt',
        'Headphones',
        'Light Green T-Shirt',
        'Lime Band',
        'Mini Speakers',
        'Painted Phone Case',
        'Pink Band',
        'Pink Purse',
        'Purple Band',
        'Purple Gemstone Necklace',
        'Purple T-Shirt',
        'Shoes',
        'Sneakers',
        'Teal T-Shirt',
        'Yellow Earbuds',
        'Yoga Mat',
        'Yoga Set'
    ];

    constructor(private http: HttpClient) {}

    getProducts() {
        return firstValueFrom(
            this.http.get<ProductEcommerceResponse[]>(this.apiUrl+environment.apiBackend.apiProduct)
          );
    }

}
