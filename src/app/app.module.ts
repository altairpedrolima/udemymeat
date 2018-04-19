import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
// import { HttpModule } from '@angular/http'; // Obsoleto com atualizacao para 4.13
import { HttpClientModule } from '@angular/common/http'; // Versao 4.13 refator
import { RouterModule, PreloadAllModules } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';


import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
// import { RestaurantsService } from './restaurants/restaurants.service';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
// import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
// import { OrderService } from 'app/order/order.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from 'app/shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { ApplicationErrorHandler } from './app.error-handler';
// import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule.forRoot(),
    // CoreModule, // tornou-se obsoleto após migracão de providers para SharedModule
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    BrowserAnimationsModule
  ],
     providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler}],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, {provide: LOCALE_ID, useValue: 'pt-BR'}],

  // Com a primeira configuração, ao digitar uma url filha direto no navegador sem
  // passar pela pagina index.html, o bootstrap não será feito e será retornado
  // 404. Neste caso, o bootstrap pode ser configurado no servidor Apache.
  // Com a segunda configuração, é incluido um hash (#) no caminho e sempre o index.html
  // será acessado antes da url filha informada, fazendo assim o bootstrap sem precisar configurar nada no apache.

  bootstrap: [AppComponent]
})
export class AppModule { }
