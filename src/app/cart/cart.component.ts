import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (err) => console.error('Fetch error:', err),
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    this.updateCartCount();
  }

  goToPayment(): void {
    alert("payment");
    this.router.navigate(['/payment'], {
      state: {
        cartItems: this.cartItems,
        totalAmount: this.totalAmount
      }
    });
  }

  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.calculateTotal();
  }

  private updateCartCount(): void {
    const count = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.cartCountSubject.next(count);
  }
}
