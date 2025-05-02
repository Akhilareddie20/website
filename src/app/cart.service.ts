import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private buyNowItem: any;
  private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  // getCartItems(): any[] {
  //   return this.cartItems;
  // }

  // getTotalAmount(): number {
  //   return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // }
  setBuyNowItem(product: any) {
      this.buyNowItem = product;
    }
  clearCart() {
    this.cartItems = [];
  }
  // setCartItems(items: any[]) {
  //   this.cartItems = items;
  // }
  private items: any[] = [];

setCartItems(items: any[]) {
  this.items = items;
}

getCartItems(): any[] {
  return this.items;
}

getTotalAmount(): number {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

}
