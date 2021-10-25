import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor(private router:Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  register(){
    const dialogConfig = new MatDialogConfig()
    this.dialog.open(RegistrationComponent, dialogConfig)
  }
  login(){
    const dialogConfig = new MatDialogConfig()
    this.dialog.open(LoginComponent, dialogConfig)
  }
}
