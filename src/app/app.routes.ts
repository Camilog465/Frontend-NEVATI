import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';    
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProductEditComponent } from './pages/products/product-form-edit/product-form-edit.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';



export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path : 'admin' , component: ProductFormComponent},
    { path: 'user/edit/:id', component: UserEditComponent},
    { path: 'user/view', component: UserViewComponent},
    { path: '404', component: PageNotFoundComponent },
    // { path: 'dashboard', component: DashboardComponent, canActivate:[ authGuard]},
    { path: 'product/new', component: ProductFormComponent, canActivate:[ authGuard]},
    { path: 'product/list', component: ProductListComponent, canActivate:[ authGuard]},
    { path: 'product/edit/:id', component: ProductEditComponent, canActivate:[ authGuard]},
    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];