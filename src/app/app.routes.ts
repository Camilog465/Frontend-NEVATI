import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';    
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

import { authGuard } from './guards/auth.guard';
import { ProductEditComponent } from './pages/products/product-form-edit/product-form-edit.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { SabanasComponent } from './pages/sabanas/sabanas.component';
import { ColchaComponent } from './pages/colcha/colcha.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { BlackfridayComponent } from './pages/blackfriday/blackfriday.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';



export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'ofertas', component: BlackfridayComponent},
    { path: 'user/edit/:id', component: UserEditComponent, canActivate:[ authGuard]},
    { path: 'user/view', component: UserViewComponent, canActivate:[ authGuard]},
    { path: '404', component: PageNotFoundComponent },
    { path: 'sabanas', component: SabanasComponent},
    { path: 'colchas',component: ColchaComponent},
    { path: 'accesorios', component: AccesoriosComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'product/new', component: ProductFormComponent, canActivate:[ authGuard]},
    { path: 'product/list', component: ProductListComponent, canActivate:[ authGuard]},
    { path: 'product/edit/:id', component: ProductEditComponent, canActivate:[ authGuard]},
    { path: 'sabanas/product/:id', component: ProductDetailComponent},
    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];