import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderStoreComponent } from './order-store/order-store.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { RouterModule, Routes } from '@angular/router';
import { OrderStoreCardComponent } from './order-store-card/order-store-card.component';

const routes: Routes = [
  {
    path: '', component:OrderStoreComponent},
    {path: 'list', component: OrderListComponent},
    {path: 'store', component: OrderStoreComponent}
  
];

@NgModule({
  declarations: [OrderListComponent, OrderNewComponent, OrderStoreComponent, OrderStoreCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    RouterModule.forChild(routes),
  ]
})
export class OrderModule { }
