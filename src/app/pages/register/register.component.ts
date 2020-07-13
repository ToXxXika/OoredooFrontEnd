import { Component, OnInit } from '@angular/core';
import {Personne} from "../../models/personne";
import {MessageService} from "primeng/api";
import {InscriptionService} from "../../Services/inscription.service";
import {MenuItem} from 'primeng/api';
import {ProduitService} from '../../Services/produit.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[MessageService]
})

export class RegisterComponent implements OnInit {
   P:Personne = new Personne() ;
  Utilisateur: string;
  CIN:string ;
  Prenom:string ;
  Nom:string;
  Mail:string ;
  MotPasse:string ;
  columns : any [];
  Users : any[]=[];
  items:MenuItem[];
  NumTel: number;
  Role: any;
  displayboutique : boolean ;
  clonedPersonne: { [s: string]: Personne; } = {};
  Boutiques: any[]=[];
  constructor(private Prod: ProduitService,private messageService: MessageService,private inscriptionS: InscriptionService ) { }
  ClearData(){
    this.Mail='';
    this.MotPasse='';
    this.Prenom='';
    this.Nom='';
    this.Utilisateur='';
    this.CIN='';
    this.NumTel = 0 ;
    // need to add NumTel here
  }
  AjoutPersonne() {

    this.P.username = this.Utilisateur ;
    this.P.cin = this.CIN ;
    this.P.motdepasse = this.MotPasse ;
    this.P.role = this.Role ;
    this.P.mail = this.Mail;
    this.P.nom = this.Nom ;
    this.P.prenom = this.Prenom ;
    this.P.numTel = this.NumTel ;
    console.log(this.P)
    this.inscriptionS.CreerUtilisateur(this.P).subscribe(data => {
      if(data) {
        this.messageService.add({key: 'SS', severity: 'success', summary: 'Gestion des utilisateurs', detail: 'Utilisateur ajouté'});
        console.log("EEEE");
        this.ClearData();
      }else {
        this.messageService.add({key: 'SS', severity: 'warn', summary: 'Gestion des utilisateurs', detail: 'Utilisateur non ajouté'});
      }
    },error => {      this.messageService.add({key: 'SS', severity: 'danger', summary: error, detail:'une erreur est survenue'});
    });
  }

  ngOnInit() {
    this.displayboutique=true;
    this.inscriptionS.Utilisateurs().subscribe(UserData =>{
      this.Users = UserData;
    });
    this.Prod.recupererBoutique().subscribe(Bout=>{
       for(let X of Bout){
         this.Boutiques.push({label:X.nomBoutique,value:X.idBoutique});
       }
    })
    this.columns = [
      {label: 'Administrateur', value :'Admin'},
      { label: 'Coursier', value: 'Coursier' },
      { label: 'Agent Commercial', value: 'AgentCommercial' }
    ];

}

  onRowEditInit(rowData: any) {
      this.clonedPersonne[rowData.cin]= {...rowData}
  }
  onRowDelete(rowdata: any){
    this.inscriptionS.deleteUser(rowdata.cin).subscribe(response=>{
      if(response){
        this.messageService.add({key:'SS', severity:'success',summary:'Gestion des utilisateurs',detail:'Utilisateur supprimé'})
      }else {
        this.messageService.add({key:'SS', severity:'warn',summary:'Gestion des utilisateurs',detail:'suppression a échouée'})
      }
    },error => {
      this.messageService.add({key:'SS', severity:'danger',summary:'Gestion des utilisateurs',detail:'Erreur lors du Suppression'})
    })
  }

  onRowEditSave(rowData: any) {

  }

  ChangeRole(Role: any) {
    if(Role === "AgentCommercial"){
      this.displayboutique=false;
    }else {
      this.displayboutique=true;
    }
  }
}
