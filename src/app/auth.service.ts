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
  // private userEmailSubject = new BehaviorSubject<string>(localStorage.getItem('userEmail') || '');
  // userEmail$ = this.userEmailSubject.asObservable();
  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertEvent`, data, { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallusers`);
  }
  setUserEmail(email: string): void {
    this.userEmail = email;
    localStorage.setItem('userEmail', email); // Persist across refresh
  }

  getUserEmail(): string {
    return this.userEmail || localStorage.getItem('userEmail') || '';
  }
  // getUserEmail(): string {
  //   return this.loggedInEmail; // Ensure this is set during login
  // }
  
  // clearUserEmail(): void {
  //   this.userEmail = '';
  //   localStorage.removeItem('userEmail');
  // }
  getwomenproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allwomenproducts`);
  }

  getmenproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allmenproducts`);
  }

  getkidsproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allkidsproducts`);
  }
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
  saveProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/profile`, profile);
  }

  // getProfile(email: string): Observable<Profile> {
  //   return this.http.get<Profile>(`${this.apiUrl}/profile/${email}`);
  // }
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profiles`);
  }
  getProfile(): Observable<Profile> {
    const userEmail = this.getUserEmail();  // Use getUserEmail to get the logged-in user's email
    return this.http.get<Profile>(`${this.apiUrl}/profile/${userEmail}`);
  }
  // etUserEmail(email: string): void {
  //   this.userEmailSubject.next(email);
  //   localStorage.setItem('userEmail', email);
  // }

  // getUserEmail(): string {
  //   return this.userEmailSubject.getValue();
  // }

  // clearUserEmail(): void {
  //   this.userEmailSubject.next('');
  //   localStorage.removeItem('userEmail');
  // }
  saveCartItems(cartItems: CartItem[]) {
    return this.http.post(`${this.apiUrl}/save`, cartItems);
  }
  
}
