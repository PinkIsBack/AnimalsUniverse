import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../shared/services/post.service';
import { Post } from '../shared/interfaces';
import { ProfileService } from '../shared/services/profile.service';
import { AuthService } from '../shared/services/auth.service';

const STEP = 4
//class for comparing data coming with the search form
export class PostsClass{
  age:any=[{name:1,ch:false},{name:5,ch:false},{name:10,ch:false} ]
  animal:any=[{name:"Dog",ch:false},{name:"Cat",ch:false},{name:"Other",ch:false}]
  city:any=[{name:"Haifa",ch:false},{name:"Tel_aviv",ch:false},{name:"Afula",ch:false},{name:"Karmiel",ch:false}]
  gender:any=[{name:"Male",ch:false},{name:"Female",ch:false}]

  constructor(one:boolean, five:boolean, ten:boolean, Dog:boolean, Cat:boolean, Others:boolean, Haifa:boolean, Tel_aviv:boolean, Afula:boolean, Karmiel:boolean ,Male:boolean, Female:boolean){

    if(one==true){this.age[0].ch=true}
    if(five==true){this.age[1].ch=true}
    if(ten==true){this.age[2].ch=true}
    if(Dog==true){this.animal[0].ch=true}
    if(Cat==true){this.animal[1].ch=true}
    if(Others==true){this.animal[2].ch=true}
    if(Haifa==true){this.city[0].ch=true}
    if(Tel_aviv==true){this.city[1].ch=true}
    if(Afula==true){this.city[2].ch=true}
    if(Karmiel==true){this.city[3].ch=true}
    if(Male==true){this.gender[0].ch=true}
    if(Female==true){this.gender[1].ch=true}
  }
}
// ---------------------------------------------------------
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService,
              private router: Router,
              private profile: ProfileService,
              private auth:AuthService
              ) {}
  noMorePosts: boolean = false
  reloading: boolean = false
  inside:boolean = false
  posts: Post[] = []
  postClass: PostsClass
  Plist: Post[] = []
  y: number
  tmp: number
  chNum: number = 0
  offset = 0
  limit = STEP
  status = localStorage.getItem('status')
  userId = localStorage.getItem('userId')
  ngOnInit() {
    this.reloading = true
    this.fetch()
  }
  private fetch(){
    const params = Object.assign( {}, {
      offset: this.offset,
      limit: this.limit
    })
    this.inside=this.auth.isAuthenticated()
    this.postService.featch(params).subscribe( posts => {
      this.posts = this.posts.concat(posts)
      this.Plist = this.Plist.concat(posts)
      this.noMorePosts = posts.length < STEP
      this.reloading = false
    })
  }
  add(product){
    this.postClass = new PostsClass(product.value.one, product.value.five, product.value.ten, product.value.dog, product.value.cat, product.value.others, product.value.Haifa, product.value.Tel_aviv, product.value.Afula, product.value.Karmiel, product.value.Male, product.value.Female)
    this.chNum=0
    if(this.postClass.age[0].ch==true || this.postClass.age[1].ch==true || this.postClass.age[2].ch==true){ this.chNum+=100; }
    if(this.postClass.animal[0].ch==true || this.postClass.animal[1].ch==true || this.postClass.animal[2].ch==true) { this.chNum+=1000; }
    if(this.postClass.city[0].ch==true || this.postClass.city[1].ch==true || this.postClass.city[2].ch==true || this.postClass.city[3].ch==true){ this.chNum+=1; }
    if(this.postClass.gender[0].ch==true || this.postClass.gender[1].ch==true){ this.chNum+=10;}
    this.Plist=[]
    this.show()
  }
  addProduct(){
    this.router.navigateByUrl('posts/newpost');
  }
  like(post:Post){
    this.profile.addToWhish(this.userId,post).subscribe()
  }
  meetpartner(){
    this.Plist=[]
    for(let p of this.posts){

      if(p.Action=="meet"){
        this.Plist.push(p)
      }
    }
  }
  toUser(userId:string){
    this.router.navigateByUrl('profile/'+userId);
  }
  show(){
        if(this.chNum==0){ this.Plist=this.posts }
        if(this.chNum==1){
          for(let i of this.posts){
            for(let y of this.postClass.city){
              if(i.City==y.name && y.ch==true){
                this.Plist.push(i)
              }
            }
          }
        }
        if(this.chNum==10){
          for(let i of this.posts){
              for(let y of this.postClass.gender){
                if(i.Gender==y.name && y.ch==true){
                  this.Plist.push(i)
                }
              }
            }
          }
        if(this.chNum==11){
          console.log("11");
          for(let i of this.posts){
            for(let y of this.postClass.city){
              for(let h of this.postClass.gender){
              if((i.City==y.name && y.ch==true) && (i.Gender==h.name && h.ch==true)){
                  this.Plist.push(i);
              }
              }
            }
          }
        }
        if(this.chNum==100){
          for(let i of this.posts){
            for(let y of this.postClass.age){
              if(i.Age<=y.name && y.ch==true){
                this.Plist.push(i)
              }
            }
          }
        }
        if(this.chNum==101){
          for(let i of this.posts){
            for(let y of this.postClass.age){
              for(let h of this.postClass.city){
                if((i.Age<=y.name && y.ch==true) && (i.City==h.name && h.ch==true)){
                this.Plist.push(i)
                }
              }
            }
          }
        }
        if(this.chNum==110){
          for(let i of this.posts){
            for(let y of this.postClass.age){
              for(let h of this.postClass.gender)
              if((i.Age<=y.name && y.ch==true) && (i.Gender==h.name && h.ch==true)){
                this.Plist.push(i)
              }
            }
          }
        }
        if(this.chNum==111){
          for(let i of this.posts){
            for(let y of this.postClass.age){
              for(let h of this.postClass.gender){
                for(let x of this.postClass.city){
                  if((i.Age<=y.name && y.ch==true) && (i.Gender==h.name && h.ch==true) && (i.City==x.name && x.ch==true)){
                    this.Plist.push(i);
                  }
                }
              }
            }
        }
        }

        if(this.chNum==1000){
          for(let i of this.posts){
            for(let y of this.postClass.animal){
              if(i.Animal==y.name && y.ch==true){
                this.Plist.push(i);
              }
            }
          }
        }

        if(this.chNum==1001){
          for(let i of this.posts){
            for(let x of this.postClass.animal){
              for(let h of this.postClass.city){
                if((i.Animal==x.name && x.ch==true) && (i.City==h.name && h.ch==true)){
                  this.Plist.push(i);
                }
              }
            }

          }
        }
        if(this.chNum==1010){
          for(let i of this.posts){
            for(let h of this.postClass.animal){
              for(let x of this.postClass.gender){
                if((i.Animal==h.name && h.ch==true) && (i.Gender==x.name && x.ch==true)){
                  this.Plist.push(i);
                }
              }
            }
          }


        }
        if(this.chNum==1011){
          for(let i of this.posts){
            for(let h of this.postClass.animal){
              for(let x of this.postClass.gender){
                for(let y of this.postClass.city){
                  if((i.Animal==h.name && h.ch==true)&&(i.Gender==x.name && x.ch==true)&&(i.City==y.name && y.ch==true)){
                    this.Plist.push(i);
                  }
                }
              }
            }
          }
        }
        if(this.chNum==1100){
          for(let i of this.posts){
            for(let h of this.postClass.animal){
              for(let x of this.postClass.age){
                if((i.Animal==h.name && h.ch) && (i.Age<=x.name && x.ch==true)){
                  this.Plist.push(i);
                }
              }
            }
          }
        }
        if(this.chNum==1101){
          for(let i of this.posts){
            for(let h of this.postClass.animal){
              for(let x of this.postClass.age){
                for(let y of this.postClass.city){
                  if((i.Animal==h.name && h.ch==true)&&(i.Age<=x.name && x.ch==true)&&(i.City==y.name && y.ch==true)){
                    this.Plist.push(i);
                  }
                }
              }
            }
          }
        }
        if(this.chNum==1110){
          for(let i of this.posts){
            for(let h of this.postClass.animal){
              for(let x of this.postClass.age){
                for(let y of this.postClass.gender){
                  if((i.Animal==h.name && h.ch==true)&&(i.Age<=x.name && x.ch==true)&&(i.Gender==y.name &&y.ch==true)){
                    this.Plist.push(i);
                  }
                }
              }
            }
          }
        }
        if(this.chNum==1111){
          for(let i of this.posts){
            for(let h of this.postClass.animal){
              for(let x of this.postClass.age){
                for(let y of this.postClass.gender){
                  for( let z of this.postClass.city){
                    if((i.Animal==h.name && h.ch==true) && (i.Age<=x.name && x.ch==true) && (i.Gender==y.name && y.ch==true) && (i.City==z.name && z.ch==true)){
                      this.Plist.push(i);
                    }
                  }
                }
              }
            }
          }
        }
  }
  loadMore() {
    this.offset += STEP
    this.fetch()
  }
}
