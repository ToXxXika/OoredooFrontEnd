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
    this.Nom=LoginComponent.P.nom;
    this.Prenom=LoginComponent.P.prenom;
    this.Mail=localStorage.getItem("MailLocal");
    this.Username=LoginComponent.P.username;
    this.cin=LoginComponent.P.cin;
    this.numTel=LoginComponent.P.numTel;
  }

}
