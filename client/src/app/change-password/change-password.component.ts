import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from '../shared/classes/snack-bar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup
  userId = localStorage.getItem('userId')
  constructor(private authService: AuthService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private snack: SnackBar,
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      OldPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      NewPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      NewPassword2: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    this.form.disable()
    this.authService.changePassword(this.userId, this.form.value).subscribe(
      data => {
        this.dialogRef.close()
        this.snack.openSnackBar(data.message)
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
