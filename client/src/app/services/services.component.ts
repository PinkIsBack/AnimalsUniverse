import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/interfaces';
import { ServicesService } from '../shared/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  id:string = '0';
  serviceInfo: Service[] = []

  constructor(private services: ServicesService) { }
  ngOnInit(): void {
    this.services.featch().subscribe(
      services => this.serviceInfo = services
    )
  }
  show(num){
    this.id=num;
  }
  goToSite(link: string){
    window.open("http://"+link, "_blank")
  }
  scrollToTop(){
    window.scroll(0,0)
  }

}
