import { Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackBar } from '../shared/classes/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  form: FormGroup
  aSub: Subscription
  counter: number = 0

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthService,
    private snack: SnackBar,
    private dialog: MatDialog) { }
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy() {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  register(){
    this.dialogRef.close()
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(RegistrationComponent, dialogConfig);
  }

  onSubmit(){
    this.form.disable()
    if(this.counter<3){
      this.aSub = this.auth.login(this.form.value).subscribe(
      () => { this.dialogRef.close(),
      window.location.reload()} ,
      error => {
        this.counter++
        this.snack.showError(error)
        this.form.enable()
      }
    )
    } else {
      this.snack.openSnackBar("Wait 30 seconds")
      setInterval(
        ()=>{
          this.form.enable()
        },
        1000*30
      )
    }


  }
}
