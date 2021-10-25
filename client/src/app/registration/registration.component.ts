import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from '../shared/classes/snack-bar.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup

  constructor(private auth: AuthService,
    private snack: SnackBar,
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private router: Router) {
}

ngOnInit() {
  this.form = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
}

onSubmit() {
  this.form.disable()
  this.auth.register(this.form.value).subscribe(
    () => {
      this.dialogRef.close()
      this.router.navigate(['/home'], {
        queryParams: {
          registered: true
        }
      })
    },
    error => {
      this.snack.showError(error)
      this.form.enable()
    })
}
}
