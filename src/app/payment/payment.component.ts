import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmount: number = 0;
  deliveryAddress: string = '';
  paymentMethod: string = '';
  paymentMethods: string[] = ['Amazon Pay', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];
  availableBalance: number = 1000;
  cardNumber: string = '';
  upiApp: string = '';
  paymentStatus: string = '';
  cartItems: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {

  }
  calculatetotalamount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
  ngOnInit(): void {
    const state = window.history.state;
    this.totalAmount = state.totalAmount || 0;
    this.cartItems = state.cartItems || [];
  
    if (this.cartItems.length === 0 || this.totalAmount === 0) {
      this.calculatetotalamount(); // fallback if needed
    }
  }
  

  handlePayment() {
    if (this.totalAmount === 0) {
      this.paymentStatus = '❌ Your cart is empty. Please add items before proceeding to payment.';
      return;
    }

    if (!this.deliveryAddress || !this.paymentMethod) {
      this.paymentStatus = '❌ Please fill all required fields.';
      return;
    }

    if (this.paymentMethod.toLowerCase().includes('card') && this.cardNumber.length !== 16) {
      this.paymentStatus = '❌ Invalid card number. Must be 16 digits.';
      return;
    }

    if (this.paymentMethod === 'Amazon Pay') {
      if (this.totalAmount > this.availableBalance) {
        this.paymentStatus = '❌ Insufficient Amazon Pay balance.';
        return;
      } else {
        this.availableBalance -= this.totalAmount;
      }
    }

    this.paymentStatus = '✅ Payment Successful!<br>Order details are updated in the order status.';
    alert('Payment is successfully done');
    alert('Thank you for shopping!');
    this.cartService.clearCart();
    this.totalAmount = 0;
    this.cardNumber = '';
    this.paymentMethod = '';
    this.deliveryAddress = '';
    alert("order");
    if (this.paymentStatus) {
      const order = {
        items: this.cartItems.map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          material: item.material,
          style: item.style,
          neck: item.neck,
          length: item.length,
          sleeve: item.sleeve,
          offerSummary: item.offerSummary,
          mrp: item.mrp,
          discount: item.discount,
          rating: item.rating,
          reviews: item.reviews,
          subcategory: item.subcategory,
        })),
        deliveryDate: new Date(),
        trackingAddress: this.deliveryAddress,
      };
      this.orderService.setOrders([order]); 

      this.router.navigate(['/order']);

      this.cartService.clearCart();
    }
  }
  completePayment() {
    alert('Payment completed successfully!');
    this.router.navigate(['/bill'], {
      state: {
        cartItems: this.cartItems,
        totalAmount: this.totalAmount,
        paymentMethod: this.paymentMethod,
        deliveryAddress: this.deliveryAddress,
        orderDate: new Date()
      }
    });
    
    
  }
}
