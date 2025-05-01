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
  wishlist: any[] = [];
  cartItems: CartItem[] = [];
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
  ) { }

  ngOnInit(): void {
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
     // or it can be left out if it's auto-generated on the backend
      email: this.userEmail,  // Make sure userEmail is defined correctly
      image: product.image,
      title: product.title,
      subtitle: product.subtitle,
      material: product.material,
      rating: parseFloat(product.rating),
      quantity: 1,
      price: product.price
    };

    // Log cartItem to verify correct data structure
    console.log('CartItem to be saved:', cartItem);

    this.cartItems.push(cartItem);
    alert('Item added to cart!');

    this.saveCartToBackend([cartItem]); // Send the item as an array
  }

  saveCartToBackend(cartItems: CartItem[]): void {
    console.log("Cart item being sent:", JSON.stringify(cartItems));  // Log the data before sending
  
    this.authService.saveCartItems(cartItems).subscribe({
      next: (res) => {
        alert(res.message); // Now you can access res.message
        console.log("Cart saved successfully", res);
      },
      error: (err) => {
        alert("Failed to save cart:\n" + JSON.stringify(err, null, 2));
        console.error("Failed to save cart", err);
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
