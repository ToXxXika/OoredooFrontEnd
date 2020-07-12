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
  RefProd:any;

  constructor(private DataTransfer: DataTransferService,private Router: Router,private messageService:  MessageService,private fb : FormBuilder,private CommServ: CommandeService, private ProdServ: ProduitService,private router : Router) {
  }

  @Output() Obj = new EventEmitter<DetailsCommande>();
  displayDialog: boolean;
  MarqueModel: any;
  TypeModel: any;
  TypeDisable: any;
  LibelleModel: any;
  LibelleDisable: any;

  ngOnInit(): void {

    this.displayDialog=true;
    this.items = [
      {label: 'Chercher un produit', icon: 'pi pi-table', command: () => {
        this.router.navigateByUrl("/produits");
        }},
      {label: 'Vider les Champs', icon: 'pi pi-fw pi-refresh', command: () => {
        this.cleardata();
        }},

    ];

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
      DC.reprod = this.RefProd;
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
            this.ProdServ.UpdateBoutiqueProduitStock(Qte, 5, this.RefProd).subscribe(answer => {
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

  }

  ChangeMarqueDropdown(MarqueModel: any) {
    this.TypeProdDropdown.length=0;
    this.TypeDisable= false ;
    this.ProdServ.getTypeByMarque(MarqueModel).subscribe(dataType=>{
      for(let x of dataType){
        if (this.TypeFiltre.indexOf(x) == -1) {
          this.TypeFiltre.push(x);
        }
      }
      for (let X of this.TypeFiltre) {
        console.log(' im in Second Loop');
        console.log(X);
        this.ProdServ.getDescriptionByType(X).subscribe(DescType =>{
          console.log(DescType)
          this.TypeProdDropdown.push({label:DescType['description'],value:X});
        })
      }
    });
  }

  ChangeTypeMarqueDropdowns(MarqueModel: any, TypeModel: any) {
    this.LibelleProdDropdown.length=0;
    this.LibelleDisable= false;
    this.ProdServ.getLibelle(MarqueModel, TypeModel).subscribe(LibelleData=>{
      for(let x of LibelleData){
        if (this.LibelleFiltre.indexOf(x) == -1) {
          this.LibelleFiltre.push(x);
        }
      }
      for(let description of this.LibelleFiltre){
        this.LibelleProdDropdown.push({label:description,value:description});
      }
    })
  }

  Rechercher() {
    this.ProdServ.getProdByMLT(this.LibelleModel,this.MarqueModel,this.TypeModel).subscribe(Product=>{
      if(Product !== null){
        this.messageService.add({
          key: 'SS',
          severity: 'success',
          summary: 'Recherche de Produit',
          detail: 'Produit Trouvé est Valide',
          life: 4000,
        });
         this.RefProd = Product['referenceProduit'];
         this.Marque= this.MarqueModel;
         this.Libelle= this.LibelleModel;
         this.Type= this.TypeModel;

      }
    })
  }
}








