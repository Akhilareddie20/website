import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';  
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  selectedSubcategory: string = 'All';

  subcategories: string[] = [
    '👚 Tops',
    '👗 Dresses',
    '👖 Pants',
    '👠 Heels',
    '🥿 Sandals',
    '👟 Shoes',
    '🧣 Scarves',
    '💍 Rings',
    '📿 Bangles',
    '💎 Jewelry',
    '💄 Makeup',
    '🧥 Jackets',
    '👜 Bags',
    '👒 Hats'
  ];

  cartCount=0;
  constructor(private authService: AuthService,private cartService:CartService,private router:Router) {
  }
  wishlist: any[] = [];
  ngOnInit(): void {
    this.authService.getkidsproducts().subscribe({
      next: (data: any[]) => {
        this.allProducts = data;
        this.filteredProducts = [...this.allProducts];
      },
      error: err => console.error('Error fetching products:', err)
    });
  
    this.authService.getWishlist().subscribe({
      next: (data: any[]) => {
        this.wishlist = data;
      },
      error: err => console.error('Error fetching wishlist:', err)
    });
  }
  addToWishlist(product: any): void {
    const alreadyExists = this.wishlist.some(item =>
      item.title === product.title &&
      item.subtitle === product.subtitle &&
      item.price === product.price
    );
  
    if (alreadyExists) {
      alert('Item is already in your wishlist!');
      return;
    }
  
    const wishlistItem = {
      title: product.title,
      subtitle: product.subtitle,
      image: 'https://example.com/images/' + product.image,
      rating: parseFloat(product.rating),
      reviews: product.reviews,
      price: product.price,
      mrp: product.mrp,
      discount: product.discount,
      offerSummary: product.offerSummary || "",
      material: product.material,
      style: product.style,
      neck: product.neck,
      length: product.length,
      sleeve: product.sleeve,
      deliveryDate: product.deliveryDate || null,
      subcategory: product.subcategory
    };
  
    this.authService.postwishlist(wishlistItem).subscribe({
      next: (res) => {
        this.wishlist.push(wishlistItem);  // update local wishlist
        alert('Added to wishlist!');
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
        alert('An error occurred while adding to wishlist.');
      }
    });
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Added to cart!');
  }
  
  buyNow(product: any) {
    this.cartService.clearCart(); 
    this.cartService.addToCart(product);
    this.router.navigate(['/bill']);
  }
  
}
