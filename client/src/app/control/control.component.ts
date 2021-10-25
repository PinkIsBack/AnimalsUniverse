import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Post, Service, User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';
import { ProfileService } from '../shared/services/profile.service';
import { ServicesService } from '../shared/services/services.service';
import { Product } from '../shared/interfaces';
import { ShopService } from '../shared/services/shop.service';
import { SnackBar } from '../shared/classes/snack-bar.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  userIcon: boolean = true
  postIcon: boolean = false
  shopIcon: boolean = false
  serviceIcon: boolean = false
  analyticIcon: boolean = false

  users: User[] = []
  posts: Post[] = []
  serviceInfo: Service[] = []
  products: Product[] = []

  constructor(private auth: AuthService,
              private router: Router,
              private profile: ProfileService,
              private dialog: MatDialog,
              private postsService: PostService,
              private serv: ServicesService,
              private shopService: ShopService,
              private snack: SnackBar
  ) {}

  ngOnInit(): void {
    this.auth.featch().subscribe(
      data => this.users = data
    )
    this.serv.featch().subscribe(
      data => this.serviceInfo = data
    )
    this.postsService.featch().subscribe(
      data => this.posts = data
    )
    this.shopService.featch().subscribe(
      data => this.products = data
    )
  }
  goToSite(link: string) {
    window.open("http://" + link, "_blank")
  }
  scrollToTop() {
    window.scroll(0, 0)
  }
  changeWork(work) {
    if (work == 'userIcon') { this.userIcon = true; this.postIcon = false; this.shopIcon = false; this.serviceIcon = false; this.analyticIcon = false; }
    if (work == 'postIcon') { this.postIcon = true; this.userIcon = false; this.shopIcon = false; this.serviceIcon = false; this.analyticIcon = false; }
    if (work == 'shopIcon') { this.shopIcon = true; this.postIcon = false; this.userIcon = false; this.serviceIcon = false; this.analyticIcon = false; }
    if (work == 'serviceIcon') { this.serviceIcon = true; this.shopIcon = false; this.postIcon = false; this.userIcon = false; this.analyticIcon = false; }
    if (work == 'analyticIcon') { this.analyticIcon = true; this.shopIcon = false; this.postIcon = false; this.userIcon = false; this.serviceIcon = false; }
  }
  toUser(idUser: string) {
    this.router.navigateByUrl('profile/' + idUser);
  }
  removeUser(idUser: string) {
    this.profile.remove(idUser).subscribe()
    this.snack.openSnackBar("User deleted")
    window.location.reload()
  }
  changeStatus(idUser: string) {
    this.dialog.open(EditProfileComponent, {
      data: {
        userId: idUser
      }
    })
  }
  deletePost(idPost: string) {
    this.postsService.delete(idPost).subscribe()
    this.snack.openSnackBar("Post deleted")
    window.location.reload()
  }
  removeService(idPost: string){
    this.serv.delete(idPost).subscribe()
    this.snack.openSnackBar("service deleted")
    window.location.reload()
  }
  addService(){
    this.router.navigateByUrl('service/newService')
  }
  addProduct(){
    this.router.navigateByUrl('shop/newProduct')
  }
  deleteProduct(idProduct: string){
    this.shopService.delete(idProduct).subscribe()
    this.snack.openSnackBar("product deleted")
    window.location.reload()
  }
}
