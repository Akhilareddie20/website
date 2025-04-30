// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class WishlistService {
//   private wishlistSubject = new BehaviorSubject<any[]>([]);
//   wishlist$ = this.wishlistSubject.asObservable();

//   addToWishlist(product: any): void {
//     const currentWishlist = this.wishlistSubject.getValue();
//     if (!currentWishlist.some(item => item.id === product.id)) {
//       this.wishlistSubject.next([...currentWishlist, product]);
//     }
//   }

//   removeFromWishlist(product: any): void {
//     const updatedWishlist = this.wishlistSubject
//       .getValue()
//       .filter(item => item.id !== product.id);
//     this.wishlistSubject.next(updatedWishlist);
//   }

//   isInWishlist(product: any): boolean {
//     return this.wishlistSubject.getValue().some(item => item.id === product.id);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistItem } from './wishlist-item.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  private backendUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // addToWishlist(product: any): void {
  //   const currentWishlist = this.wishlistSubject.getValue();
  //   if (!currentWishlist.some(item => item.id === product.id)) {
  //     this.http.post(`${this.backendUrl}/wishlist`, product).subscribe({
  //       next: (res) => {
  //         console.log('Added to backend wishlist', res);
  //         this.wishlistSubject.next([...currentWishlist, product]);
  //       },
  //       error: (err) => {
  //         console.error('Error adding to wishlist:', err);
  //       }
  //     });
  //   }
  // }
  addToWishlist(item: WishlistItem): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(`${this.backendUrl}/wishlist`, item);
  }
  

  removeFromWishlist(product: any): void {
    const updatedWishlist = this.wishlistSubject.getValue().filter(item => item.id !== product.id);
    this.wishlistSubject.next(updatedWishlist);
    this.http.delete(`${this.backendUrl}/wish/${product.id}`).subscribe();
  }

  fetchWishlist(): void {
    this.http.get<any[]>(`${this.backendUrl}/wish`).subscribe({
      next: (data) => this.wishlistSubject.next(data),
      error: (err) => console.error('Error fetching wishlist:', err)
    });
  }

  isInWishlist(product: any): boolean {
    return this.wishlistSubject.getValue().some(item => item.id === product.id);
  }
}
