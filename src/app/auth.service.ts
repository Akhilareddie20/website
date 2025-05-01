// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { WishlistItem } from './wishlist-item.model';
// import { Profile } from './profile.model';
// import { CartItem } from './cart-item.model';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = 'http://localhost:8000/api';
//   private userEmail: string = '';
//   constructor(private http: HttpClient) { }

//   register(data: { name: string; email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/insertEvent`, data, { responseType: 'text' });
//   }

//   getAllUsers(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/getallusers`);
//   }
//   setUserEmail(email: string): void {
//     this.userEmail = email;
//     localStorage.setItem('userEmail', email); // Persist across refresh
//   }

//   getUserEmail(): string {
//     return this.userEmail || localStorage.getItem('userEmail') || '';
//   }
//   getwomenproducts(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/allwomenproducts`);
//   }

//   getmenproducts(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/allmenproducts`);
//   }

//   getkidsproducts(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/allkidsproducts`);
//   }
//   addToWishlist(item: WishlistItem): Observable<WishlistItem> {
//     return this.http.post<WishlistItem>(`${this.apiUrl}/wishlist`, item);
//   }
//   postwishlist(product: WishlistItem): Observable<any> {
//     console.log('Posting wishlist item:', product); 
//     return this.http.post(`${this.apiUrl}/wishlist`, product);
//   }


//   getWishlist(): Observable<WishlistItem[]> {
//     return this.http.get<WishlistItem[]>(`${this.apiUrl}/wish`);
//   }

//   deleteWishlist(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/wish/${id}`);
//   }
//   saveProfile(profile: Profile): Observable<Profile> {
//     return this.http.post<Profile>(`${this.apiUrl}/profile`, profile);
//   }

//   getProfiles(): Observable<Profile[]> {
//     return this.http.get<Profile[]>(`${this.apiUrl}/profiles`);
//   }
//   getProfile(): Observable<Profile> {
//     const userEmail = this.getUserEmail();
//     return this.http.get<Profile>(`${this.apiUrl}/profile/${userEmail}`);
//   }
//   getCartItems(): Observable<CartItem[]> {
//     return this.http.get<CartItem[]>(`${this.apiUrl}/cart`);
//   }
//   getAllProducts(): Observable<any[]> {
//     return this.http.get<any[]>("http://localhost:8000/api/cart");
//   }
  
//   addToCart(product: any): Observable<any> {
//     return this.http.post('http://localhost:8000/api/save', product); 
//   }
//   saveCartItems(cartItems: CartItem[]) {
//     return this.http.post('http://localhost:8000/api/save', cartItems);
//   }
  
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistItem } from './wishlist-item.model';
import { Profile } from './profile.model';
import { CartItem } from './cart-item.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private userEmail: string = '';

  constructor(private http: HttpClient) {}

  // ----- Authentication -----
  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertEvent`, data, { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallusers`);
  }

  setUserEmail(email: string): void {
    this.userEmail = email;
    localStorage.setItem('userEmail', email);
  }

  // getUserEmail(): string {
  //   return this.userEmail || localStorage.getItem('userEmail') || '';
  // }

  // ----- Product Fetching -----
  getwomenproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allwomenproducts`);
  }

  getmenproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allmenproducts`);
  }

  getkidsproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allkidsproducts`);
  }

  // ----- Wishlist -----
  postwishlist(product: WishlistItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, product);
  }

  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.apiUrl}/wish`);
  }

  deleteWishlist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wish/${id}`);
  }

  // ----- Profile -----
  saveProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/profile`, profile);
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profiles`);
  }

  getProfile(): Observable<Profile> {
    const userEmail = this.getUserEmail();
    return this.http.get<Profile>(`${this.apiUrl}/profile/${userEmail}`);
  }

  // ----- Cart -----
  
  // Save full cart (array of CartItems) to backend
  saveCartItems(cartItems: CartItem[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, cartItems);
  }

  // Add a single product to cart
  addToCart(product: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/cartitem`, product);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }
  getUserEmail() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const email = localStorage.getItem('userEmail');
      return email;
    }
    return null;
  }
  
}

