import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule,RouterModule],
  standalone:true
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  productId!: string;
  constructor(private cartService: CartService,private router: Router,private auth:AuthService,private route:ActivatedRoute) {}
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();  
  // ngOnInit(): void {
  //   this.cartItems = this.cartService.getCartItems().map(item => ({
  //     ...item,
  //     quantity: item.quantity || 1  
  //   }));
  //   this.calculateCartTotal();
  //   this.productId = this.route.snapshot.paramMap.get('id')!;
  // }
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
  
  calculateCartTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + (item.price * quantity);
    }, 0);
  }
  getCartItems() {
    return this.cartItems;
  }
  goToBilling(event: Event) {
    this.auth.saveCartItems(this.cartItems).subscribe({
      next: (res) => {
        alert("cart");
        console.log("Cart saved successfully", res);
        this.router.navigate(['/bill']);
      },
      error: (err) => {
        alert("error");
        console.error("Failed to save cart", err);
      }
    });
  }
  
  setCartItems(items: any[]) {
    this.cartItems = items;
    this.updateCartCount();
  }
  private updateCartCount() {
    const count = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.cartCountSubject.next(count);
  }
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.calculateCartTotal();
  }
  clearCart(): void {
    this.cartService.clearCart(); 
    this.cartItems = []; 
    this.calculateTotal(); 
  }
}
