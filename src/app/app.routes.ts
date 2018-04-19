import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from 'app/restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderComponent } from './order/order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
// import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
// import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedinGuard } from './security/loggedin.guard';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            { path: '', redirectTo: 'menu', pathMatch: 'full' },
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }
            //      {path: 'shopping-cart', component: ShoppingCartComponent},
            //      {path: 'menuItem', component: MenuItemComponent},
        ]
    },
    { path: 'restaurants', component: RestaurantsComponent },
    {
        path: 'order', loadChildren: './order/order.module#OrderModule',
        canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]
    },
    { path: 'order-summary', component: OrderSummaryComponent },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: '**', component: NotFoundComponent }
];

