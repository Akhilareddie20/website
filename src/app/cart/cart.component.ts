import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  productId!: string;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(
    private cartService: CartService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Failed to fetch cart items:', err);
      }
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      return acc + item.price * quantity;
    }, 0);
    this.updateCartCount();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  goToBilling(event: Event): void {
    this.auth.saveCartItems(this.cartItems).subscribe({
      next: (res) => {
        alert('Cart saved successfully!');
        console.log('Cart saved successfully', res);
        this.router.navigate(['/bill']);
      },
      error: (err) => {
        alert('Failed to save cart!');
        console.error('Failed to save cart', err);
      }
    });
  }

  setCartItems(items: any[]): void {
    this.cartItems = items;
    this.updateCartCount();
    this.calculateTotal();
  }

  private updateCartCount(): void {
    const count = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.cartCountSubject.next(count);
  }

  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart(); 
    this.cartItems = []; 
    this.calculateTotal(); 
  }
}
