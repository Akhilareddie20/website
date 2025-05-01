import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './cart.service';
import { DesktopComponent } from './desktop/desktop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  cartCount$;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.cartCount$;
  }
}
