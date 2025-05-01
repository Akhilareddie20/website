import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenComponent } from './men/men.component';
import { DesktopComponent } from './desktop/desktop.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { WomenComponent } from './women/women.component';
import { TestComponent } from './test/test.component';
import { CartComponent } from './cart/cart.component';
import { BillComponent } from './bill/bill.component';
import { KidsComponent } from './kids/kids.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './Account/Account.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    MenComponent,
    DesktopComponent,
    WomenComponent,
    TestComponent,
    CartComponent,
    BillComponent,
    KidsComponent,
    PaymentComponent,
    OrderstatusComponent,
    WishlistComponent,
    ProfileComponent,
    HelpCenterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
  