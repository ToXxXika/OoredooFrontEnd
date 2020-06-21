import { Component, OnInit } from '@angular/core';
import {Personne} from "../../models/personne";
import {MessageService} from "primeng/api";
import {InscriptionService} from "../../Services/inscription.service";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[MessageService]
})

export class RegisterComponent implements OnInit {
   P:Personne = new Personne();
  Utilisateur: string;
  CIN:string ;
  Prenom:string ;
  Nom:string;
  m:string ;
  MotPasse:string ;
  columns : any [];
  Users : any[]=[];
  items:MenuItem[];
  constructor(private messageService: MessageService,private inscriptionS: InscriptionService ) { }
  ClearData(){
    this.m='';
    this.MotPasse='';
    this.Prenom='';
    this.Nom='';
    this.Utilisateur='';
    this.CIN='';
    // need to add NumTel here
  }
  AjoutPersonne() {
    const X = (document.getElementById('CIN') as HTMLInputElement).value;
    const Prenom = (document.getElementById('Prenom')as HTMLInputElement).value;
    const  Nom = (document.getElementById('Nom')as HTMLInputElement).value ;
    const MDP = (document.getElementById('Motdepasse')as HTMLInputElement).value ;
    const mail = (document.getElementById('mail') as HTMLInputElement).value;
    const username = (document.getElementById('Utilisateur')as HTMLInputElement).value ;
    this.P.username= username ;
    this.P.cin = X ;
    this.P.motdepasse = MDP ;
    this.P.role = "Admin" ;
    this.P.mail = mail;
    this.P.nom = Nom ;
    this.P.prenom = Prenom ;
    this.P.numTel = 94190986 ;

    console.log(this.P);
    this.inscriptionS.CreerUtilisateur(this.P).subscribe(data => {
      this.messageService.add({key: 'SS', severity: 'success', summary: ':D', detail:'Utilisateur Ajouté'});
     console.log("EEEE");
      this.ClearData();
    });
  }
  ModifierPersonne(){}
  SupprimerPersonne(){}

  ngOnInit() {
    this.inscriptionS.Utilisateurs().subscribe(UserData =>{
      this.Users = UserData;
    });
    this.columns = [
      {field: 'Cin', header :'Cin'},
      { field: 'Nom', header: 'Nom' },
      { field: 'Prenom', header: 'Prenom' },
      { field: 'Utilisateur', header: 'Utilisateur' }
    ];
    this.items = [{
      label: 'File',
      items: [
        {label: 'New', icon: 'pi pi-fw pi-plus'},
        {label: 'Download', icon: 'pi pi-fw pi-download'}
      ],

    },
      {
        label: 'Edit',
        items: [
          {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
          {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}
        ]
      }];

}
}
