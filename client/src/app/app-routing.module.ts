import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/classes/auth.guard';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewpostComponent } from './newpost/newpost.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CartComponent } from './cart/cart.component';
import { ControlComponent } from './control/control.component';
import { NewServComponent } from './new-serv/new-serv.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"shop",component: ShopComponent},
  {path:"shop/:id",canActivate:[AuthGuard],component:NewProductComponent},
  {path:"shop/newProduct",canActivate:[AuthGuard],component:NewProductComponent},

  {path:"posts", component:PostsComponent},
  {path:"posts/newpost",canActivate:[AuthGuard],component:NewpostComponent},
  {path:"posts/:id",canActivate:[AuthGuard],component:NewpostComponent},

  {path:"profile/:id",component:ProfileComponent},
  {path:"about", component:AboutComponent},

  {path:"service", component:ServicesComponent},
  {path:"service/:id",canActivate:[AuthGuard],component:NewServComponent},
  {path:"service/newService",canActivate:[AuthGuard],component:NewServComponent},

  {path:"cart", canActivate:[AuthGuard], component:CartComponent},
  {path:"control",canActivate:[AuthGuard],component:ControlComponent},

  {path:"**",redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
