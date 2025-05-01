import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl:'./desktop.component.html',
  styleUrls: ['./desktop.component.css']
  // template: `<h1>Welcome to the Desktop Page 🎉</h1>`,
  // styles: [`h1 { color: green; text-align: center; }`]
})
export class DesktopComponent {

  productss = [
    {
      title: 'Men’s Jacket',
      description: 'Warm and stylish for winter.',
      price: 1999,
      image: ''
    },
    {
      title: 'Bluetooth Headphones',
      description: 'High quality sound with noise cancellation.',
      price: 2999,
      image: 'https://freedesignfile.com/upload/2018/07/Fashion-shopping-girls-illustration-vector-15-280x235.jpg'
    },
    {
      title: 'Smart Watch',
      description: 'Track your health and stay connected.',
      price: 4999,
      image: 'https://thumbs.dreamstime.com/z/woman-shopping-spree-white-44051116.jpg'
    }
  ];
  products = [
    {
      title: 'Men T-Shirt',
      description: 'Comfortable cotton t-shirt.',
      category: 'Men',
      image: 'men1.jpg',
      price: 499
    },
    {
      title: 'Women Dress',
      description: 'Stylish summer dress.',
      category: 'Women',
      image: 'women1.jpg',
      price: 999
    },
    {
      title: 'Smartphone',
      description: 'Latest Android smartphone.',
      category: 'Electronics',
      image: 'electronics1.jpg',
      price: 14999
    },
    {
      title: 'Watch',
      description: 'Elegant wristwatch.',
      category: 'Accessories',
      image: 'accessory1.jpg',
      price: 2999
    },
    { title: 'Sunglasses', category: 'Men', description: 'Stylish UV sunglasses', image: 'https://via.placeholder.com/300x200?text=Sunglasses', price: 999 },
    { title: 'Leather Belt', category: 'Men', description: 'Premium leather belt', image: 'https://via.placeholder.com/300x200?text=Belt', price: 499 },
    { title: 'Cotton Pants', category: 'Men', description: 'Soft cotton pants', image: 'https://via.placeholder.com/300x200?text=Cotton+Pants', price: 1199 },
    { title: 'Jeans', category: 'Men', description: 'Slim fit jeans', image: 'https://via.placeholder.com/300x200?text=Jeans', price: 1399 },
    { title: 'Formal Shirt', category: 'Men', description: 'Business style shirt', image: 'https://via.placeholder.com/300x200?text=Shirt', price: 899 },
    { title: 'T-Shirt', category: 'Men', description: 'Casual cotton t-shirt', image: 'https://via.placeholder.com/300x200?text=T-Shirt', price: 499 },
    { title: 'Watch', category: 'Men', description: 'Elegant wrist watch', image: 'https://via.placeholder.com/300x200?text=Watch', price: 1599 },
    { title: 'Shoes', category: 'Men', description: 'Running shoes', image: 'https://via.placeholder.com/300x200?text=Shoes', price: 1999 },
    { title: 'Sandals', category: 'Men', description: 'Outdoor sandals', image: 'https://via.placeholder.com/300x200?text=Sandals', price: 799 }
    // Add more products here
  ];

  userEmail: string = '';

  filteredProducts = [...this.products]; // Default view: all
  selectedCategory: string = 'All';

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }
  reviews = [
    { name: 'Akhil', message: 'Great quality and fast delivery!' },
    { name: 'Sneha', message: 'Loved the product, excellent customer service!' },
    { name: 'Raj', message: 'Affordable prices and genuine products.' }
  ];
  cartCount=0;
  constructor(private cartService: CartService,private router: Router,private authservice:AuthService) {
    this.userEmail = this.authservice.getUserEmail() ?? '';


  }
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  navigateTowoMen(event :Event){
    event.preventDefault();  
    alert("This is navigate to men");
    this.router.navigate(['/women']).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    }).catch(err => {
      console.error('Error during navigation:', err);
    });
  }
  navigateToMen(event: Event) {
    event.preventDefault();  
    alert("This is navigate to men");
    this.router.navigate(['/men']).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    }).catch(err => {
      console.error('Error during navigation:', err);
    });
  }
  navigateTotest(event:Event){
    event.preventDefault(); 
    alert("This is navigate to men");
    this.router.navigate(['/test']).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    }).catch(err => {
      console.error('Error during navigation:', err);
    });
  }
  navigateTokids(event:Event){
    event.preventDefault();
    alert("This is navigate to men");
    this.router.navigate(['/kids']).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    }).catch(err => {
      console.error('Error during navigation:', err);
    });
  }
}
