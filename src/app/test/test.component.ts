// import { Component } from '@angular/core';
// import { CartService } from '../cart.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { CartItem } from '../cart-item.model';

// @Component({
//   selector: 'app-test',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './test.component.html',
//   styleUrls: ['./test.component.css']
// })
// export class TestComponent {;
  
 
//     cartItems: CartItem[] = [];
  
//     constructor(private authService: AuthService) {}
  
//     ngOnInit(): void {
//       // Example item, you can replace this with data from a service or localStorage
//       this.cartItems = [
//         {
//           title: 'Classic Leather Sandals',
//           subtitle: 'Comfortable and stylish',
//           material: 'Genuine Leather',
//           rating: 4.5,
//           price: 49.99,
//           quantity: 2,
//           image: 'https://example.com/images/sandals1.jpg'
//         }
//       ];
//     }
  
//     saveCart(): void {
//       this.authService.saveCartItems(this.cartItems).subscribe({
//         next: (response) => {
//           console.log('Cart saved successfully', response);
//           alert('Cart saved to server!');
//         },
//         error: (err) => {
//           console.error('Error saving cart', err);
//           alert('Failed to save cart.');
//         }
//       });
//     }
//   }
  

import { Component, OnInit } from '@angular/core';
import { CartItem } from '../cart-item.model';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,RouterModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // cartItems: CartItem[] = [];

  constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   // Example item, you can replace this with data from a service or localStorage
  //   this.cartItems = [
  //     {
  //       id:1,
  //       title: 'Classic Leather Sandals',
  //       subtitle: 'Comfortable and stylish',
  //       material: 'Genuine Leather',
  //       rating: 4.5,
  //       price: 49.99,
  //       quantity: 2,
  //       image: 'https://example.com/images/sandals1.jpg'
  //     }
  //   ];
  // }

  // saveCart(): void {
  //   this.authService.saveCartItems(this.cartItems).subscribe({
  //     next: (response) => {
  //       console.log('Cart saved successfully', response);
  //       alert('Cart saved to server!');
  //     },
  //     error: (err) => {
  //       console.error('Error saving cart', err);
  //       alert('Failed to save cart.');
  //     }
  //   });
  // }
  products: any[] = [];

ngOnInit() {
  this.authService.getAllProducts().subscribe(
    data => {
      this.products = data;
    },
    error => {
      console.error('Error fetching products:', error);
    }
  );
}

}
