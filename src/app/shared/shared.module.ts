import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from 'app/order/order.service';
import { SnackbarComponent } from 'app/shared/messages/snackbar/snackbar.component';
import { NotificationService } from 'app/shared/messages/notification.service';
import { LoginService } from '../security/login/login.service';
import { LoggedinGuard } from '../security/loggedin.guard';
import { LeaveOrderGuard } from '../order/leave-order.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';



@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SnackbarComponent
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                RestaurantsService,
                ShoppingCartService,
                OrderService,
                NotificationService,
                LoginService,
                LoggedinGuard,
                LeaveOrderGuard,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ]
        }
    }

}