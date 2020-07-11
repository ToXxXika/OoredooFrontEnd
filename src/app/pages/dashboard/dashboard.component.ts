import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {ProduitService} from "../../Services/produit.service";
import {InscriptionService} from "../../Services/inscription.service";
import {MessageService} from "primeng/api";
import {TransfertService} from '../../Services/transfert.service';
import {CommandeService} from '../../Services/commande.service';
import {DetailsCommande} from '../../models/DetailsCommande';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers :[MessageService]
})
export class DashboardComponent implements OnInit {
  public datachart: any
  public datasets: any;
  public data: any;
  public PriceTable : any[]=[];
  public Productname : any[]=[];
  private UserNumbers : number ;
  private ProdNumbers : number ;
  private AlertNumbers: number ;
  private TransfertNumbers : number ;
  private Commandes: DetailsCommande[]=[];
  constructor(private Commande: CommandeService,private ProduitService : ProduitService,private InscriptionService: InscriptionService,private  Msg: MessageService,private Transfert: TransfertService) {
   this.ProduitService.recupererProduit().subscribe(ProdData=>{
     for (let i =0 ;i<ProdData.length;i++){
       this.PriceTable.push(ProdData[i].prix)
       this.Productname.push(ProdData[i].libelle+" "+ProdData[i].marque);
     }
     console.log(this.PriceTable);
     console.log(this.Productname);
      this.datachart={
       labels: this.Productname,
        datasets:[
          {
            label: 'Prix Produit',
            data: this.PriceTable,
            fill: false ,
            borderColor: '#4bc0c0'
          }
        ]
      }
    })

  }



  ngOnInit() {
    this.Commande.GetCommandes().subscribe(DetailCommandeData =>{
      this.Commandes = DetailCommandeData ;
    })
    this.Transfert.recupererTransfert().subscribe(TransfertData =>{
      this.TransfertNumbers = TransfertData.length ;
    })

    this.InscriptionService.Utilisateurs().subscribe(UserData =>{
      this.UserNumbers = UserData.length ;
    });
    this.ProduitService.recupererProduit().subscribe(ProdData =>{
      this.ProdNumbers = ProdData.length;

    });
    this.ProduitService.recupererAlert().subscribe( AlertData => {
      this.AlertNumbers = AlertData.length;
    })

  }


}
