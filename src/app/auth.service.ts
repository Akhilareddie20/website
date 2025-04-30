import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishlistItem } from './wishlist-item.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

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

  // // ✅ Wishlist functions — using correct 8000 port
  // addToWishlist(item: WishlistItem): Observable<WishlistItem> {
  //   return this.http.post<WishlistItem>(`${this.apiUrl}/wishlist`, item);
  // }

  // getWishlist(): Observable<WishlistItem[]> {
  //   return this.http.get<WishlistItem[]>(`${this.apiUrl}/wish`);
  // }

  // deleteWishlist(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/wish/${id}`);
  // }
  addToWishlist(item: WishlistItem): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(`${this.apiUrl}/wishlist`, item);
  }
  postwishlist(product: WishlistItem): Observable<any> {
    console.log('Posting wishlist item:', product);  // ✅ Debug line
    return this.http.post(`${this.apiUrl}/wishlist`, product);
  }
  
  
  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.apiUrl}/wish`);
  }

  deleteWishlist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wish/${id}`);
  }
}
