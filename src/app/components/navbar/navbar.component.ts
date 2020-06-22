import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {ProduitService} from '../../Services/produit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public AlertsTab : any[]=[];

  constructor(location: Location,  private element: ElementRef, private router: Router,private prodservice:ProduitService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getAlerts();
  }
  Logout(){
    //need to Add the specified Item from LocalStorage means i  need to clear Password/Mail and we use Localstorage.removeItem();
    localStorage.clear();
  }
  // this function is used to display the specific User ( Name + Surname )
  getUsername():string{
    let Result =localStorage.getItem("UsernameLocal");
    if(Result.length ==0){
      alert("LocalisEmpty");
    }else {
      return Result;
    }
  }
  //this function is used to get Value from Specific Notification
  goToTransfert(x:any){
    sessionStorage.setItem("Localisation",x['boutiqueByIdBoutique']['localisation']);
    sessionStorage.setItem("NomBoutique",x['boutiqueByIdBoutique']['nomBoutique']);
    sessionStorage.setItem("MarqueProduit",x.marque)
    sessionStorage.setItem("TypeProduit",x.type)
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  getAlerts(){
       this.prodservice.recupererAlert().subscribe( AlertData =>{
         console.log('Hello')
         console.log(AlertData[0]['boutiqueByIdBoutique']['nomBoutique']);
          this.AlertsTab=AlertData ;
       })
  }

}
