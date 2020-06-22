import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../Services/produit.service";
import {TransfertService} from '../../Services/transfert.service';
import {InscriptionService} from '../../Services/inscription.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css']
})
export class TransfertComponent implements OnInit {
  MinimumDistance = 10000000;
  TransfertTab : any[]=[];
  CoursierTab : any[]=[];
  dateTrans: any;
  constructor(private ProdService: ProduitService, private TransfertService: TransfertService,private PersonneService: InscriptionService) { }
    // cette fonction est utilisée pour enregistrer un transfert dans la base de données
    // if faut prendre en consideration

  getRandomTransferRefernce(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min))+min;
  }
  AjouterTransfert(){
    const Reference = "REFT" + this.getRandomTransferRefernce(1000,10000);
    (document.getElementById("RefTransfert")as HTMLOutputElement).value = Reference ;


  }
  //cette fonction est utilisée pour chargement de données d'utilisateurs
  LoadCoursiers(){
    this.PersonneService.getCoursier().subscribe(CoursierData =>{
      this.CoursierTab= CoursierData ;
    });
  }
  //cette fonction est utilisée pour remplir le tableau dans la page transfertHTML
   RecuperationTransfert(){
     this.TransfertService.recupererTransfert().subscribe(TransfertData =>{
       this.TransfertTab = TransfertData ;
     });
   }
  ExtractionLocation() {
    this.ProdService.recupererBoutique().subscribe( dataB=> {
      //filtre de produits et specification
      for (let i = 0 ; i < dataB.length; i++) {
          const Ch = dataB[i].localisation;
          //Developpement de Code pour la soustraction du chaine et Extraction du Longtitude Altitude
         // tslint:disable-next-line:max-line-length
          //par exemple https://www.google.com/maps/place/Ooredoo/@33.8893822,10.0851487,14z/data=!4m8!1    le programme va nous donner 33.8893822 , 10.0851487
          const n = Ch.indexOf('@'); // search for the position of @ in the string
          const dataL = Ch.indexOf('/data'); //search for the position of /data in the string
          const n1 = Ch.substr(n,( dataL - n ) - 4).substr(1).indexOf(',');
          const Ch4 = Ch.substr(1).substr(n1+1,(Ch.substr(1).length)); //longtitude
          const Ch5 =Ch.substr(1).substring(0,n1);  //Altitude
         const tab = '{\n' +
           '  locations: [\n' +
           '    {\n' +
           '      adminArea1: \'TN\',\n' +
           '      adminArea1Type: \'Country\',\n' +
           '      geocodeQualityCode: \'P1AAA\',\n' +
           '      geocodeQuality: \'POINT\',\n' +
           '      dragPoint: false,\n' +
           '      sideOfStreet: \'N\',\n' +
           '      linkId: \'fcc83bcc-4794-4b89-ab79-8058919d70b5\',\n' +
           '      unknownInput: \'\',\n' +
           '      type: \'s\',\n' +
           '      latLng: {\n' +
           '        lat: 36.770118,\n' +  //Switch me with Real Values and thank you
           '        lng: 10.1354401\n' +  // hey don't forget me too ;D we love u
           '      }\n' +
           '    },\n' +
           '    {\n' +
           '      latLng: {\n' +
           '        lat: ' + Ch5 + ',\n' +
           '        lng: ' + Ch4 + '\n' +
           '      }\n' +
           '    }\n' +
           '  ],\n' +
           '  options: {\n' +
           '    unit: \'k\'\n' +
           '  }\n' +
           '}';
           this.TransfertService.Location(tab).subscribe( data =>{
             if (this.MinimumDistance > data['route']['distance']){
               this.MinimumDistance = data['route']['distance'];
               // tslint:disable-next-line:max-line-length
               console.log('Distance: ' + this.MinimumDistance + ' Time: ' + data['route']['formattedTime'] + ' Localistation: ' + dataB[i].nomBoutique);
             }
           });
       }
    });
  }
   getDataFromNavBar(){
    console.log(sessionStorage.getItem("Localisation"))
    console.log(sessionStorage.getItem("NomBoutique"));
    console.log(sessionStorage.getItem("MarqueProduit"));
    console.log(sessionStorage.getItem("TypeProduit"));

   }
  ngOnInit(): void {
    this.LoadCoursiers();
    this.RecuperationTransfert();
  }

}
