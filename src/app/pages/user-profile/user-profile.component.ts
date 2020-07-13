import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
   Nom:any;
   Prenom:any;
   cin:any;
   numTel:any;
   Username:any;
   Mail:any;


  constructor() { }

  ngOnInit() {
    //change me
    this.Nom=localStorage.getItem("NomLocal");
    this.Prenom=localStorage.getItem("PrenomLocal");
    this.Mail=localStorage.getItem("MailLocal");
    this.Username=localStorage.getItem("Localuser");
    this.cin=localStorage.getItem("CinLocal");
    this.numTel=LoginComponent.P.numTel;
  }

}
