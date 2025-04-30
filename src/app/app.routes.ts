import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DesktopComponent } from './desktop/desktop.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { TestComponent } from './test/test.component';
import { BillComponent } from './bill/bill.component';
import { CartComponent } from './cart/cart.component';
import { KidsComponent } from './kids/kids.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'test', component: TestComponent },
  { path: 'bill', component: BillComponent },
  { path: 'cart', component: CartComponent },
  { path: 'kids', component: KidsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderstatusComponent },
  {path:'wishlist',component:WishlistComponent}
];
