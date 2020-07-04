import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../Services/commande.service';
import {Commande} from '../../models/commande';
import {DetailsCommande} from '../../models/DetailsCommande';
import {ProduitService} from '../../Services/produit.service';
import {MenuItem} from 'primeng';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  BoutiqueProdTable: any[] = [];
  items: MenuItem[];
  TypeProdDropdown: any[] = [];
  MarqueDropdown: any[] = [];
  MarqueFiltre: string[] = [];
  TypeFiltre : any[]=[];
  LibelleProdDropdown: any[]=[];
  LibelleFiltre: string[]= [];
  //====================================
  cininput:string ;
  NomClient: string ;
  PrenomClient: string ;
  MD:string ;

  constructor(private fb : FormBuilder,private CommServ: CommandeService, private ProdServ: ProduitService,private router : Router) {
  }
  loadDropdowns(){
    //get boutique from Agentcommercial Connecté
    this.ProdServ.getSpecifiedProduct(5).subscribe( data =>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if(this.TypeFiltre.indexOf(data[i]["3"])== -1){
          this.TypeFiltre.push(data[i]["3"]);
        }
        //filtrage de marque pour eviter la redondance
        if (this.MarqueFiltre.indexOf(data[i]["1"]) == -1) {
          this.MarqueFiltre.push(data[i]["1"]);
        }
        if(this.LibelleFiltre.indexOf(data[i]["2"]) == -1){
          this.LibelleFiltre.push(data[i]["2"]);
        }
      }
      console.log(this.MarqueFiltre)
      console.log(this.TypeFiltre)
      console.log(this.LibelleFiltre);
      for(let i=0;i<this.TypeFiltre.length;i++){
        this.ProdServ.getDescriptionByType(this.TypeFiltre[i]).subscribe( Desc =>{
          console.log(Desc.description);
          this.TypeProdDropdown.push({label:Desc.description , value: Desc.idType});
        });
      }
      for (let j = 0; j < this.MarqueFiltre.length; j++) {
        this.MarqueDropdown.push({label: this.MarqueFiltre[j], value: this.MarqueFiltre[j]});
      }
      for (let k =0; k<this.LibelleFiltre.length;k++){
        this.LibelleProdDropdown.push({label:this.LibelleFiltre[k],value:this.LibelleFiltre[k]});
      }
    })
  }

  ngOnInit(): void {
    this.loadDropdowns();
    this.items = [
      {label: 'Chercher un produit', icon: 'pi pi-fw pi-refresh', command: () => {
        this.router.navigateByUrl("/produits");
        }},
      {label: 'Vider les Champs', icon: 'pi pi-fw pi-times', command: () => {
        this.cleardata();
        }},

    ];
  }
  cleardata(){
    this.cininput = "";
    this.NomClient = "";
    this.PrenomClient="";
    this.MD= "";

  }

  //passage de date par fonction
  AddCommande() {
    let C: Commande = new Commande();
    let DC: DetailsCommande = new DetailsCommande();
    let Marque = (document.getElementById("") as HTMLInputElement).value;
    let Type = (document.getElementById("") as HTMLInputElement).value;
    let Libelle = (document.getElementById("") as HTMLInputElement).value;
    C.idCommande = (document.getElementById("") as HTMLInputElement).value;
 //update Quantity when Passing a new Comand

  }
}
