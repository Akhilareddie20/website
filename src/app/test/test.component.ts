import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  allProducts = [
    {
      title: "Embroidered Kurta Pant Set with Dupatta",
      subtitle: "Amazon Brand - Myx Women's Collection",
      image: "https://via.placeholder.com/300x200?text=Kurta+Set",
      rating: "4.5",
      reviews: 111,
      price: 1499,
      mrp: 2799,
      discount: 46,
      offerSummary: "Cashback + EMI options available",
      material: "83% Viscose, 17% Polyester",
      style: "A-Line",
      neck: "Crew Neck",
      length: "Calf Length",
      sleeve: "3/4 Sleeve",
      deliveryDate: "20 April",
      subcategory: "👗 Dresses"
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Added to cart!');
  }

  buyNow(product: any) {
    this.cartService.clearCart(); // optional: remove if you want to keep previous items
    this.cartService.addToCart(product);
    this.router.navigate(['/bill']); // Make sure this route is defined
  }
}
