import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommandeService} from '../../Services/commande.service';
import {Commande} from '../../models/commande';
import {DetailsCommande} from '../../models/DetailsCommande';
import {ProduitService} from '../../Services/produit.service';
import {MenuItem, MessageService} from 'primeng';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DataTransferService} from '../../Services/data-transfer.service';
import {TestClass} from '../../models/TestClass';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  providers:[MessageService]
})
export class CommandeComponent implements OnInit {
  items: MenuItem[];
  TypeProdDropdown: any[] = [];
  MarqueDropdown: any[] = [];
  MarqueFiltre: string[] = [];
  TypeFiltre : any[]=[];
  LibelleProdDropdown: any[]=[];
  LibelleFiltre: string[]= [];
  //====================================
  idcommande:string ;
  cininput:string ;
  NomClient: string ;
  PrenomClient: string ;
  Marque:any ; Type:any;Libelle:any;Date: any ;
  CommandeForm: FormGroup;
  dateValue: Date;
  Quantite: number;


  constructor(private DataTransfer: DataTransferService,private Router: Router,private messageService:  MessageService,private fb : FormBuilder,private CommServ: CommandeService, private ProdServ: ProduitService,private router : Router) {
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
  @Output() Obj = new EventEmitter<DetailsCommande>();

  ngOnInit(): void {
    this.loadDropdowns();
    this.items = [
      {label: 'Chercher un produit', icon: 'pi pi-table', command: () => {
        this.router.navigateByUrl("/produits");
        }},
      {label: 'Vider les Champs', icon: 'pi pi-fw pi-refresh', command: () => {
        this.cleardata();
        }},

    ];
    this.CommandeForm = this.fb.group({
    'Marque': new FormControl(''),
      'Type': new FormControl(''),
      'Libelle': new FormControl(''),
      'DateT': new FormControl(''),
      'Qte': new FormControl('')
    });
    (document.getElementById("idcommande")as HTMLOutputElement).value = "IDC" + this.getRandomCommandID(10000,100000);
  }
  getRandomCommandID(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  cleardata(){
    this.cininput = "";
    this.NomClient = "";
    this.PrenomClient="";
    this.idcommande="";
  }

  AddCommande() {
    console.log(this.dateValue);
    let C: Commande = new Commande();
    let DC: DetailsCommande = new DetailsCommande();
    this.Marque = this.CommandeForm.get('Marque').value;
    this.Type = this.CommandeForm.get('Type').value;
    this.Libelle = this.CommandeForm.get('Libelle').value;
    this.ProdServ.getProdByMLT(this.Libelle,this.Marque,this.Type).subscribe(P=> {
      let RefProd:any = P[0]['referenceProduit'];
      console.log(RefProd);
      this.idcommande = (document.getElementById("idcommande") as HTMLInputElement).value;
      this.cininput = (document.getElementById("cininput") as HTMLInputElement).value;
      this.PrenomClient = (document.getElementById("PrenomClient") as HTMLInputElement).value;
      this.NomClient = (document.getElementById("NomClient") as HTMLInputElement).value;
      let Qte = this.Quantite;
      let days: any = this.dateValue.getDate();
      let month: any = this.dateValue.getMonth()+1;
      let year: any = this.dateValue.getFullYear();
      this.Date = year + "-" + month + "-" + days;
      C.idCommande = this.idcommande;
      C.dateCommande = this.Date;
      DC.cinclient = this.cininput;
      DC.idcom = this.idcommande;
      DC.nomclient = this.NomClient;
      DC.prenomclient = this.PrenomClient;
      DC.qtecom = Qte;
      DC.reprod = RefProd;
      let CommandSave = async () => {
        this.CommServ.SaveCommande(C).subscribe(response => {
          if (response) {
            this.messageService.add({
              key: 'SS',
              severity: 'success',
              summary: 'Insertion Du Commande',
              detail: 'Ajout Commande est terminée'
            })
          } else {
            this.messageService.add({key: 'SS', severity: 'warn', summary: 'Insertion Du Commande', detail: 'Ajout Commande a echouée'})

          }
        }, error => {
          this.messageService.add({
            key: 'SS',
            severity: 'danger',
            summary: 'Insertion Du Commande',
            detail: 'un erreur est survenu' + error
          })
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
        //##############################################################################
        this.CommServ.SaveDetailCommande(DC).subscribe(response => {
          if (response) {
            this.messageService.add({
              key: 'SS',
              severity: 'success',
              summary: 'Insertion Details Commande ',
              detail: 'Ajout Details Commande est terminée '
            });
            this.ProdServ.UpdateBoutiqueProduitStock(Qte, 5, RefProd).subscribe(answer => {
              if (answer) {
                this.messageService.add({
                  key: 'SS',
                  severity: 'success',
                  summary: 'Mise a jour',
                  detail: 'Stock de Produit est Modifié'
                });
                this.Obj.emit(DC);
                this.DataTransfer.GetObjectCommande(DC);

                this.router.navigateByUrl("/detailcommande")
              } else {
                this.messageService.add({
                  key: 'SS',
                  severity: 'warn',
                  summary: 'Mise a jour',
                  detail: 'Erreur dans la mise a jour de stock de produit'
                })
                this.Obj.emit(DC);
                this.DataTransfer.GetObjectCommande(DC);

                this.router.navigateByUrl("/detailcommande")
              }
            }, error => {
              this.messageService.add({
                key: 'SS',
                severity: 'danger',
                summary: 'Erreur Mise a jour ',
                detail: 'Erreur est survenue ' + error
              })
            })
          } else {
            this.messageService.add({
              key: 'SS',
              severity: 'warn',
              summary: 'Insertion Details Commande',
              detail: 'Ajout Detail commande a echouée'
            })
          }
        }, error => {
          this.messageService.add({
            key: 'SS',
            severity: 'danger',
            summary: 'Insertion Details Commande',
            detail: 'un erreur est survenu' + error
          });

        })
      }
      CommandSave();
    })
  }
}







