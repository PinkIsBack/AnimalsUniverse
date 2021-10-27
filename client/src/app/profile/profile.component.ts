import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SnackBar } from '../shared/classes/snack-bar.service';
import { Order, Post, User } from '../shared/interfaces';
import { OrderServise } from '../shared/services/order.service';
import { PostService } from '../shared/services/post.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ifUser:boolean = true
  swish:boolean = false
  sposts:boolean = false;
  sorder:boolean = false;
  userId:string = localStorage.getItem("userId")
  user:User
  posts: Post[] = []
  wposts: Post[] = []
  wishs = []
  orders: Order[] = []

constructor(private postS:PostService,
            private profileService:ProfileService,
            private dialog:MatDialog,
            private snack: SnackBar,
            private route: ActivatedRoute,
            private orderService: OrderServise) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params)=>{
      this.userId = this.route.snapshot.paramMap.get('id')
      if(params.id === localStorage.getItem("userId")){
        this.ifUser = false
      }
      else{
        this.ifUser = true
      }
      this.profileService.fetch(params.id).subscribe((data) =>{
      this.user = data
      this.wishs = this.user.whishlist
      })
      this.postS.featch().subscribe(
        data => {
          this.wposts = data
      })

      this.orderService.getByUser(this.userId).subscribe((data) => {
      this.orders = data
        })

      this.postS.getByUser(params.id).subscribe((data)=> {
            this.posts = data
          })
    })
}
  showPosts(){
    this.sposts = !this.sposts
    this.swish = false
    this.sorder = false
  }
  showWish(){
    this.swish = !this.swish
    this.sposts  =false
    this.sorder = false
  }
  showOrders() {
    this.sorder = !this.sorder
    this.sposts = false
    this.swish = false
  }
  deletePost(id: string){
    this.postS.delete(id).subscribe()
    this.snack.openSnackBar("Post deleted")
    window.location.reload()
  }
  openDialog(userId: string) {
    this.dialog.open(EditProfileComponent, {
      data: {
        userId: userId
      }
    } );
  }
}

