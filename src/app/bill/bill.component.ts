import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill',
  standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
 
  cartItems: any[] = [];
  totalAmount: number = 0;
  quantityOptions: number[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = this.cartService.getTotalAmount();
this.quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
this.calculateTotalAmount();

  }
  updateQuantity(item: any): void {
    item.quantity = Math.max(1, item.quantity);
    this.calculateTotalAmount();
  }
  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  proceedToPayment() {
    this.router.navigate(['/payment'], { queryParams: { totalAmount: this.totalAmount } });
  }
}
