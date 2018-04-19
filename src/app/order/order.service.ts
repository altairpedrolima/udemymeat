
import { Injectable } from '@angular/core';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from 'app/order/order.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Versao 4.13 refator
import { MEAT_API } from '../app.api';
// import { LoginService } from '../security/login/login.service';

@Injectable()
export class OrderService {

    constructor(
        private cartService: ShoppingCartService,
        private http: HttpClient
    ) { }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    clear() {
        // tslint:disable-next-line:no-unused-expression
        this.cartService.clear;
    }

    checkOrder(order: Order): Observable<string> {
        /*
        let headers = new HttpHeaders();
        if (this.loginService.isLoggedIn) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        */
        // return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            // tslint:disable-next-line:no-shadowed-variable
            .map(order => order.id);
    }


}
