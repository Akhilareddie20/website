// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { CartService } from '../cart.service';
// // import { BehaviorSubject } from 'rxjs';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';

// @Component({
//   selector: 'app-men',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './men.component.html',
//   styleUrls: ['./men.component.css']
// })
// export class MenComponent implements OnInit {
//   allProducts: any[] = [];
//   filteredProducts: any[] = [];

//   selectedSubcategory: string = 'All';

//   subcategories: string[] = [
//     'T-Shirts ',
//     'Shirts',
//     'Shoes',
//     'Sandals',
//     'Jeans',
//     'Watches',
//     'Sunglasses',
//     'Pants',
//     'Boots',
//     'Jackets'
//   ];
//   constructor(private authService: AuthService,private cartService:CartService,private router:Router) {

//   }
  
//   ngOnInit(): void {
//     this.authService.getmenproducts().subscribe({
//       next: (data: any[]) => {
//         // console.log('Fetched Men Products:', data);
//         this.allProducts = data;
//         this.filteredProducts = [...this.allProducts];
//       },
//       error: (err) => {
//         console.error('Error fetching products:', err);
//       }
//     });
//   }

//   filterBySubcategory(sub: string): void {
//     this.selectedSubcategory = sub;
//     this.filteredProducts = sub === 'All'
//       ? [...this.allProducts]
//       : this.allProducts.filter(p => p.subcategory === sub);
//   }
//   private cartCount = new BehaviorSubject<number>(0);
//   private cartItems: any[] = [];
//   cartCount$ = this.cartCount.asObservable(); 
// addToCart(product: any) {
//   this.cartService.addToCart(product);
//   alert('Added to cart!');
//   this.cartCount.next(this.cartItems.length);
// }

// buyNow(product: any) {
//   this.cartService.clearCart(); 
//   this.cartService.addToCart(product);
//   this.router.navigate(['/bill']);
// }
  
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  selectedSubcategory: string = 'All';

  subcategories: string[] = [
    'T-Shirts ',
    'Shirts',
    'Shoes',
    'Sandals',
    'Jeans',
    'Watches',
    'Sunglasses',
    'Pants',
    'Boots',
    'Jackets'
  ];

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}
  wishlist: any[] = [];
  ngOnInit(): void {
    this.authService.getmenproducts().subscribe({
      next: (data: any[]) => {
        this.allProducts = data;
        this.filteredProducts = [...this.allProducts];
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
    this.cartService.cartCount$.subscribe(count => {
    });
  }

  filterBySubcategory(sub: string): void {
    this.selectedSubcategory = sub;
    this.filteredProducts = sub === 'All'
      ? [...this.allProducts]
      : this.allProducts.filter(p => p.subcategory === sub);
  }
  addToWishlist(product: any): void {
    const alreadyExists = this.wishlist.some(item =>
      item.title === product.title &&
      item.subtitle === product.subtitle &&
      item.price === product.price
    );
  
    if (alreadyExists) {
      alert('Item is already in your wishlist!');
      return;
    }
  
    const wishlistItem = {
      title: product.title,
      subtitle: product.subtitle,
      image: 'https://example.com/images/' + product.image,
      rating: parseFloat(product.rating),
      reviews: product.reviews,
      price: product.price,
      mrp: product.mrp,
      discount: product.discount,
      offerSummary: product.offerSummary || "",
      material: product.material,
      style: product.style,
      neck: product.neck,
      length: product.length,
      sleeve: product.sleeve,
      deliveryDate: product.deliveryDate || null,
      subcategory: product.subcategory
    };
  
    this.authService.postwishlist(wishlistItem).subscribe({
      next: (res) => {
        this.wishlist.push(wishlistItem);  // update local wishlist
        alert('Added to wishlist!');
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
        alert('An error occurred while adding to wishlist.');
      }
    });
  } 
  addToCart(product: any) {
    this.cartService.addToCart(product);  // Adds to the cart and updates the cart count
    alert('Added to cart!');
  }

  buyNow(product: any) {
    this.cartService.clearCart();  // Clears the cart before adding the product for "buy now"
    this.cartService.addToCart(product);
    this.router.navigate(['/bill']);  // Navigate to the billing page
  }
}
