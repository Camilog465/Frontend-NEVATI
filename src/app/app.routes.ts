import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'product-list', component: ProductListComponent },
    {path: 'product-detail', component: ProductDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '404', pathMatch: 'full'}
];
