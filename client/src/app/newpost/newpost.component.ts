import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../shared/services/post.service';
import { Post } from "../shared/interfaces";
import { SnackBar } from '../shared/classes/snack-bar.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  isNew:boolean = true
  imagePreview
  image: File
  post: Post
  postId: String

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private snack: SnackBar
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      Name : new FormControl(null,Validators.required),
      Age : new FormControl(null, Validators.required),
      City : new FormControl(null, Validators.required),
      Animal : new FormControl(null, Validators.required),
      Gender : new FormControl(null, Validators.required),
      Description : new FormControl(null, Validators.required),
      Price: new FormControl(null),
      Action: new FormControl(null,Validators.required)
    })

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']){
              this.isNew = false
              this.postId = params['id']
              return this.postService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (post: Post) => {
          if(post){
            this.post = post[0]
            this.form.patchValue( {
              Name: post[0].Name,
              Age: post[0].Age,
              City: post[0].City,
              Animal: post[0].Animal,
              Gender: post[0].Gender,
              Description: post[0].Description,
              Price: post[0].Price
            })
            this.imagePreview = post[0].ImgSrc
          }
        }
      )
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

  update(){
    this.postService.update(this.postId, this.post, this.image).subscribe()
  }

  onSubmit(){
    this.form.disable()
    this.postService.create(this.form.value, this.image).subscribe(
      (data)=> {
        this.snack.openSnackBar(data.message)
        this.router.navigate(["posts"])
      }
    )
   }
}
