import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './Components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { AdminTemplateComponent } from './Components/admin-template/admin-template.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';

const routes: Routes = [
  {path : "login" , component :LoginComponent},
  {path : "" , component :LoginComponent},
  {path : "admin-template" , component :AdminTemplateComponent ,canActivate : [AuthenticationGuard], children :[ 
    {path : "products" , component :ProductsComponent},
    {path : "customers" , component :CustomersComponent},
    {path : "new-product" , component :NewProductComponent},
    {path : "edit-product/:id" , component :EditProductComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
