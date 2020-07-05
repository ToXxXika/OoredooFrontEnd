import { Component, OnInit } from '@angular/core';
import {DataTransferService} from '../../Services/data-transfer.service';
import {Router} from '@angular/router';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detailcommande',
  templateUrl: './detailcommande.component.html',
  styleUrls: ['./detailcommande.component.css']
})
export class DetailcommandeComponent implements OnInit {
Idcommande : any;
CinClient:any;
NomClient:any;
PrenomClient:any;
RefProd:any;
Qte: any ;

  constructor(private router : Router,private DataTransfer: DataTransferService) { }
 GetDetailsCommandeFromCommande(){
   this.DataTransfer.CurrentCommande.subscribe(Detail=>{
       this.Idcommande= Detail.idcom;
       this.CinClient = Detail.cinclient;
       this.NomClient=  Detail.nomclient;
       this.PrenomClient = Detail.prenomclient;
       this.RefProd=  Detail.reprod;
       this.Qte = Detail.qtecom ;
   });
 }
  ngOnInit(): void {
    this.GetDetailsCommandeFromCommande();
  }

  pdf() {
    const options = {
      name:'Commande.pdf',
      image: {type:'jpeg'},
      html2canvas:{},
      jsPDF: {orientation: 'landscape'}
    }
    const element : Element = document.getElementById("Cadre");
    html2pdf().from(element).set(options).save();
  }

  list() {
    this.router.navigateByUrl("/produits");
  }
}
