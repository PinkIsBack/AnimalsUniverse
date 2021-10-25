import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppComponent } from './app.component'
import { FooterComponent } from './footer/footer.component'
import { NavbarComponent } from './navbar/navbar.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'
import { PostsComponent } from './posts/posts.component'
import { ShopComponent } from './shop/shop.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NewpostComponent } from './newpost/newpost.component'
import { ProfileComponent } from './profile/profile.component'
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ControlComponent } from './control/control.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { NewServComponent } from './new-serv/new-serv.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ChangePasswordComponent } from './change-password/change-password.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    PostsComponent,
    ShopComponent,
    NewpostComponent,
    ProfileComponent,
    EditProfileComponent,
    ServicesComponent,
    AboutComponent,
    CartComponent,
    ControlComponent,
    AnalyticsPageComponent,
    NewServComponent,
    NewProductComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
