import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {ProduitService} from '../../Services/produit.service';
import {DataTransferService} from '../../Services/data-transfer.service';
import {Alert} from '../../models/alert';
import {TestClass} from '../../models/TestClass';


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

  constructor(private DataTransfer : DataTransferService,location: Location,  private element: ElementRef, private router: Router,private prodservice:ProduitService) {
    this.location = location;
  }
   @Output() Obj = new EventEmitter<TestClass>();
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
  goToTransfert(d:any){
    this.Obj.emit(d);
     this.DataTransfer.GetObjectAlert(d);
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
       this.prodservice.recupererBoutique().subscribe( AlertData =>{

        for(let A of AlertData){
            if(Object.keys(A["alertsByIdBoutique"]).length !==0){
             let L:TestClass = new TestClass();
             for (let i=0;i<A['alertsByIdBoutique'].length;i++) {
               L.idBou = A.idBoutique ;
               L.nomBoutique = A.nomBoutique;
               L.localisation = A.localisation ;
               L.idAlert = A['alertsByIdBoutique'][i]['idAlert'];
               L.libelle = A['alertsByIdBoutique'][i]['libelle'];
               L.marque = A['alertsByIdBoutique'][i]['marque'];
               L.type = A['alertsByIdBoutique'][i]['type'];
               this.AlertsTab.push(L);
             }
            }
          }
       })
  }

}
