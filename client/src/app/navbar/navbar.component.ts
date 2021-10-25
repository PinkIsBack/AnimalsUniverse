import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LoginComponent } from '../login/login.component';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLog:boolean
  userId: String = null
  status=localStorage.getItem('status')
  user: User
  userName

  constructor(private  dialog:  MatDialog,
              private authService: AuthService,
              private router:Router,
              private ur: ProfileService,
              ) { }
  ngOnInit():  void {
    this.userId = this.authService.getId()
    this.isLog = this.authService.isAuthenticated()
    if(this.isLog){
      this.ur.fetch(this.userId).subscribe((data) =>{
      this.user = data
      this.userName = this.user.userName
   })
    }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(LoginComponent, dialogConfig);
  }
  toAdminIcon(){
    this.router.navigateByUrl('control')
  }
  profile(){
    this.router.navigate(['/profile/', this.userId])
  }
  logout(){
    this.authService.logout()
    this.ngOnInit()
    this.router.navigate(['/home'])
  }
  changePassword(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
