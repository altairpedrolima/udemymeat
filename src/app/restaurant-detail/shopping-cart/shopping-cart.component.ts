import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({opacity: 0}),
        animate('300ms 0s ease-in', keyframes([
          style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
          style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
          style({opacity: 1, transform: 'translateX(0px)', offset: 1})
        ]))
      ]),
      transition('ready => void', [
        style({opacity: 0}),
        animate('300ms 0s ease-out', keyframes([
          style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
          style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2}),
          style({opacity: 0, transform: 'translateX(30px)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(private shoppinCardService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any{
    return this.shoppinCardService.items;

  }

  clear(){
    this.shoppinCardService.clear();
  }

  removeItem(item: CartItem){
    this.shoppinCardService.removeItem(item);

  }

  addItem(item: MenuItem){
    this.shoppinCardService.addItem(item);
  }

  total(): number{
    return this.shoppinCardService.total();

  }

}
