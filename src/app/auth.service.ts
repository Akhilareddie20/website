import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistItem } from './wishlist-item.model';
import { Profile } from './profile.model';
import { CartItem } from './cart-item.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private userEmail: string = '';

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertEvent`, data, { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallusers`);
  }
  getwomenproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allwomenproducts`);
  }

  getmenproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allmenproducts`);
  }

  getkidsproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allkidsproducts`);
  }
  postwishlist(product: WishlistItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, product);
  }

  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.apiUrl}/wish`);
  }

  deleteWishlist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wish/${id}`);
  }
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

  setUserEmail(email: string): void {
    this.userEmail = email;
    localStorage.setItem('userEmail', email);
  }
  addToCart(product: CartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/cartitem`, product);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  } 
  saveCartItems(cartItems: CartItem[]): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/save', cartItems, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  
  getUserEmail(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userEmail') || ''; 
    }
    return '';
  }
  
}

