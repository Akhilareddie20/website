import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  standalone:true,
  imports: [CommonModule],
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount = 0;
  paymentMethod = '';
  deliveryAddress = '';
  orderDate: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (state && state['cartItems']) {
      this.cartItems = state['cartItems'];
      this.totalAmount = state['totalAmount'];
      this.paymentMethod = state['paymentMethod'];
      this.deliveryAddress = state['deliveryAddress'];
      this.orderDate = new Date(state['orderDate']);
    } else {
      alert('No order data found. Redirecting...');
      this.router.navigate(['/cart']);
    }
  }

  downloadBillPDF(): void {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Order Invoice', 80, 10);
    
        doc.setFontSize(12);
        doc.text(`Date: ${this.orderDate.toDateString()}`, 10, 20);
        doc.text(`Payment Method: ${this.paymentMethod}`, 10, 30);
        doc.text(`Delivery Address: ${this.deliveryAddress}`, 10, 40);
        doc.text(`Total Amount Paid: $${this.totalAmount}`, 10, 50);
    
        const productData = this.cartItems.map((item, index) => [
          index + 1,
          item.title,
          item.quantity,
          `$${item.price}`,
          `$${item.price * item.quantity}`
        ]);
    
        autoTable(doc, {
          startY: 60,
          head: [['S.No', 'Product', 'Qty', 'Unit Price', 'Total']],
          body: productData,
        });
    
        doc.save('Order_Bill.pdf');
  }
  generatePDF(){
    alert("pdf generatede");
  }
}
