import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { BlanklayoutComponent } from './layouts/blanklayout/blanklayout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';




export const routes: Routes = [
  {
    path: '', component: AuthlayoutComponent, children:
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'forgetpass', component: ForgetpassComponent }

      ]
  },
  {
    path: '', component: BlanklayoutComponent, canActivate: [authGuard], children:
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'cart', component: CartComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'categories', component: CategoriesComponent },
        { path: 'brands', component: BrandsComponent },
        { path: 'wishlist', component: WishlistComponent },
        { path: 'details/:id', component: DetailsComponent },
        { path: 'allorders', component: AllordersComponent },
        { path: 'orders/:id', component: OrdersComponent },

      ]
  },

  { path: '**', component: NotfoundComponent }

];
