import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kids.component.html',
})
export class KidsComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  cartItems: CartItem[] = [];
  wishlist: any[] = [];

  selectedSubcategory: string = 'All';
  subcategories: string[] = [
    'Tops', 'Dresses', 'Shoes', 'Sandals', 'Jeans', 'Watches',
    'Sunglasses', 'Pants', 'Boots', 'Jackets'
  ];

  userEmail: string = '';

  constructor(
    private authService: AuthService,
    private cartservice: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.userEmail = this.authService.getUserEmail() ?? 'guest@example.com';
    this.userEmail = this.authService.getUserEmail() ?? 'guest@example.com';

    this.authService.getkidsproducts().subscribe({
      next: (data: any[]) => {
        this.allProducts = data;
        this.filteredProducts = [...this.allProducts];
      },
      error: err => console.error('Error fetching products:', err)
    });

    this.authService.getWishlist().subscribe({
      next: (data: any[]) => {
        this.wishlist = data;
      },
      error: err => console.error('Error fetching wishlist:', err)
    });
  }

  filterBySubcategory(sub: string): void {
    this.selectedSubcategory = sub;
    this.filteredProducts = sub === 'All'
      ? [...this.allProducts]
      : this.allProducts.filter(p => p.subcategory === sub);
  }

  addToCart(product: any): void {
    const cartItem: CartItem = {
      id: 0,
      email: this.userEmail,
      image: product.image,
      title: product.title,
      subtitle: product.subtitle,
      material: product.material,
      rating: product.rating,
      quantity: product.quantity || 1,
      price: product.price
    };

    this.cartItems.push(cartItem);
    alert('Item added to cart!');
    this.saveCartToBackend();
  }

  saveCartToBackend(): void {
    this.authService.saveCartItems(this.cartItems).subscribe({
      next: res => {
        console.log('Cart saved:', res);
      },
      error: err => {
        console.error('Error saving cart:', err);
      }
    });
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
      next: res => {
        this.wishlist.push(wishlistItem);
        alert('Added to wishlist!');
      },
      error: err => {
        console.error('Error adding to wishlist:', err);
        alert('An error occurred while adding to wishlist.');
      }
    });
  }

  buyNow(product: any): void {
    this.cartservice.clearCart();
    this.cartservice.addToCart(product);
    this.cartservice.setBuyNowItem(product);
    this.router.navigate(['/bill']);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../auth.service';
// import { CartService } from '../cart.service';
// import { Router } from '@angular/router';
// import { WishlistItem } from '../wishlist-item.model';
// import { CartItem } from '../cart-item.model';

// @Component({
//   selector: 'app-kids',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './kids.component.html',
// })
// export class KidsComponent implements OnInit {
//   allProducts: any[] = [];
//   cartItems: CartItem[] = [];
  
//   filteredProducts: any[] = [];
//   selectedSubcategory: string = 'All';
//   subcategories: string[] = ['Tops', 'Dresses', 'Shoes', 'Sandals', 'Jeans', 'Watches', 'Sunglasses', 'Pants', 'Boots', 'Jackets'];

//   constructor(
//     private authService: AuthService,
//     private cartservice: CartService,
//     private router: Router
//   ) { }
//   wishlist: any[] = [];
//   ngOnInit(): void {
//     this.userEmail = this.authService.getUserEmail() ?? 'default@example.com';
//     this.authService.getkidsproducts().subscribe({
//       next: (data: any[]) => {
//         this.allProducts = data;
//         this.filteredProducts = [...this.allProducts];
//       },
//       error: err => console.error('Error fetching products:', err)
//     });

//     this.authService.getWishlist().subscribe({
//       next: (data: any[]) => {
//         this.wishlist = data;
//       },
//       error: err => console.error('Error fetching wishlist:', err)
//     });
//   }


//   filterBySubcategory(sub: string): void {
//     this.selectedSubcategory = sub;
//     this.filteredProducts = sub === 'All'
//       ? [...this.allProducts]
//       : this.allProducts.filter(p => p.subcategory === sub);
//   }
//   // addToCart(product: any): void {
//   //   this.cartservice.addToCart(product);
//   //   alert('Added to cart!');
//   // }

//   // addToCart(product: any) {
//   //   this.authService.addToCart(product).subscribe({
//   //     next: (response) => {
//   //       alert("add to cart");
//   //       // console.log('Item added to cart:', response);
//   //     },
//   //     error: (error) => {
//   //       console.error('Error adding to cart:', error);
//   //     }
//   //   });
//   // }
// // In your component (e.g., KidsComponent)
// saveCartToBackend() {
//   this.authService.saveCartItems(this.cartItems).subscribe({
//     next: (res) => {
//       console.log('Cart saved:', res);
//     },
//     error: (err) => {
//       console.error('Error saving cart:', err);
//     }
//   });
// }

//   // addToCart(product: any): void {
//   //   const cartItem: CartItem = {
//   //     id: 0,
//   //     email: this.authService.getUserEmail(),
//   //     image: product.image,
//   //     title: product.title,
//   //     subtitle: product.subtitle,
//   //     material: product.material,
//   //     rating: product.rating,
//   //     quantity: product.quantity,
//   //     price: product.price
//   //   };

//   //   alert("sdfghj");
//   //   this.authService.addToCart(cartItem).subscribe({
//   //     next: (res) => {
//   //       console.log('Added to cart:', res)
//   //       alert(res);
//   //     },
//   //     error: (err) => { console.error('Cart error:', err) }
//   //   });
//   // }
//   addToCart(product: any): void {
//     const cartItem: CartItem = {
//       id: 0,  // Assuming backend will generate the ID
//       // email: this.authService.getUserEmail() ||'polu',
//       email: this.userEmail,
//       image: product.image,
//       title: product.title,
//       subtitle: product.subtitle,
//       material: product.material,
//       rating: product.rating,
//       quantity: product.quantity || 1,  // Set default quantity to 1 if not available
//       price: product.price
//     };
  
//     this.cartItems.push(cartItem);  // Add the item to the local cartItems array
//     alert('Item added to cart!');
//     this.saveCartToBackend();  // Save the cart to backend
//   }
  

//   addToWishlist(product: any): void {
//     const alreadyExists = this.wishlist.some(item =>
//       item.title === product.title &&
//       item.subtitle === product.subtitle &&
//       item.price === product.price
//     );

//     if (alreadyExists) {
//       alert('Item is already in your wishlist!');
//       return;
//     }

//     const wishlistItem = {
//       title: product.title,
//       subtitle: product.subtitle,
//       image: 'https://example.com/images/' + product.image,
//       rating: parseFloat(product.rating),
//       reviews: product.reviews,
//       price: product.price,
//       mrp: product.mrp,
//       discount: product.discount,
//       offerSummary: product.offerSummary || "",
//       material: product.material,
//       style: product.style,
//       neck: product.neck,
//       length: product.length,
//       sleeve: product.sleeve,
//       deliveryDate: product.deliveryDate || null,
//       subcategory: product.subcategory
//     };

//     this.authService.postwishlist(wishlistItem).subscribe({
//       next: (res) => {
//         this.wishlist.push(wishlistItem);
//         alert('Added to wishlist!');
//       },
//       error: (err) => {
//         console.error('Error adding to wishlist:', err);
//         alert('An error occurred while adding to wishlist.');
//       }
//     });
//   }


//   buyNow(product: any): void {
//     this.cartservice.clearCart();
//     this.cartservice.addToCart(product);
//     this.cartservice.setBuyNowItem(product);
//     this.router.navigate(['/bill']);
//   }
// }


