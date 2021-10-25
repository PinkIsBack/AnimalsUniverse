import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Service } from "../shared/interfaces";
import { SnackBar } from '../shared/classes/snack-bar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../shared/services/services.service';

@Component({
  selector: 'app-new-serv',
  templateUrl: './new-serv.component.html',
  styleUrls: ['./new-serv.component.css']
})
export class NewServComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  isNew: boolean = true
  imagePreview
  image: File
  servId: string
  service: Service

  constructor(private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: SnackBar) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      web: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    })

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']!='newService') {
              this.isNew = false
              this.servId = params['id']
              return this.servicesService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (service: Service) => {
          if (service) {
            this.service = service[0]
            this.form.patchValue({
              name: service[0].name,
              phone: service[0].phone,
              web: service[0].web,
              address: service[0].address,
              type: service[0].type,
            })
            this.imagePreview = service[0].img
          }
        }
      )
  }

  onSubmit() {
    this.form.disable()
    this.servicesService.create(this.form.value, this.image).subscribe(
      (data) => {
        this.snack.openSnackBar(data.message)
        this.router.navigate(["control"])
      }
    )
  }

  update(){
    this.servicesService.update(this.service, this.image).subscribe()
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

}
