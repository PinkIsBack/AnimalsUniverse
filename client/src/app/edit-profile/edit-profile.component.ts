import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBar } from '../shared/classes/snack-bar.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit   {
  form: FormGroup
  @ViewChild('input') inputRef: ElementRef
  imagePreview
  image: File

  stat = localStorage.getItem('status')

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>,
    private profile: ProfileService,
    private snack: SnackBar,
    @Inject(MAT_DIALOG_DATA) public data,
    private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      userName : new FormControl(null),
      email : new FormControl(null),
      phone :  new FormControl(null),
      city : new FormControl(null),
      description : new FormControl(null),
      status :  new FormControl(null)
    })
  }
  close() {
    this.dialogRef.close();
  }

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any){
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit(){
    this.form.disable()
    this.profile.update(this.data.userId, this.form.value, this.image).subscribe(
      (data) => {this.dialogRef.close()
                this.snack.openSnackBar("Your Profile updated")},
      (error) => this.snack.showError(error)
    )

  }
}
