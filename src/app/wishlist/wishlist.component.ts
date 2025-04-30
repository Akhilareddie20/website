import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistItem } from '../wishlist-item.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];

  constructor(private authService: AuthService,private cartservice: CartService,private router: Router) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.authService.getWishlist().subscribe({
      next: data => this.wishlist = data,
      error: () => alert('Failed to load wishlist.')
    });
  }
  addToCart(product: any): void {
    this.cartservice.addToCart(product);
    alert('Added to cart!');
  }
  buyNow(product: any): void {
    this.cartservice.clearCart();
    this.cartservice.addToCart(product);
    this.cartservice.setBuyNowItem(product);
    this.router.navigate(['/bill']);
  }
  removeItem(id: number): void {
    this.authService.deleteWishlist(id).subscribe({
      next: () => {
        this.wishlist = this.wishlist.filter(item => item.id !== id);
        alert('Item removed from wishlist.');
      },
      error: () => alert('Failed to remove item.')
    });
  }
}
