// este módulo ficou obsoleto pois foi migrado para SharedModule.
// Em uma aplicação grande, módulo como este proderia ficar isolado garantindo
// providers de Singontons de serviços para outros módulos do sistema.
// Foi deletado no curso. Mantive aqui somente para efeito didático.

import { NgModule } from '@angular/core';
import { OrderService } from 'app/order/order.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';

@NgModule({
    providers: [RestaurantsService, ShoppingCartService, OrderService]
})

export class CoreModule {

}