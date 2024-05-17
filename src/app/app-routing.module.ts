import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';

const routes: Routes = [
  {path : "login" , component :LoginComponent},
  {path : "" , component :LoginComponent},
  {path : "admin-template" , component :AdminTemplateComponent ,canActivate : [AuthenticationGuard], children :[ 
    {path : "products" , component :ProductsComponent},
    {path : "customers" , component :CustomersComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
