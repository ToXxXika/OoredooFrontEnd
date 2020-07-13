import {Component, OnInit, QueryList, ViewChildren, AfterViewInit, AfterViewChecked} from '@angular/core';
import {ProduitService} from "../../Services/produit.service";
import {TransfertService} from '../../Services/transfert.service';
import {InscriptionService} from '../../Services/inscription.service';
import {DataTransferService} from '../../Services/data-transfer.service';
import {Boutique} from '../../models/Boutique';
import {Personne} from '../../models/personne';
import {Transfert} from '../../models/Transfert';
import {Transfertboutique} from '../../models/transfertboutique';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TestClass} from '../../models/TestClass';
import {MessageService} from 'primeng';
import {google}  from 'google-maps'
@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css'],
  providers: [MessageService]
})
export class TransfertComponent implements AfterViewInit {
  Res : any = " ";
  TransfertTab: any[] = [];
  CoursierTab: any[] = [];
  Alert:TestClass = new TestClass() ;
  LL : TestClass ;
  B: Boutique= new Boutique();
   P : Personne[]= [] ;
  TransfertForm: FormGroup;
  dateValue: Date;
   idBou:any;
   idAlert: any ;
   TableRes:any[] ;
   BPTable: any[] = [];
  private position: string;
  displayposition: boolean;
  //elements when calling the Dialog Box
  RefTranDialog: any;
  StatutTransDialog: any;
  CoursierDialog: any;
  BoutiqueEmDialog: any;
  BooutiqueDisDialog: any;
  DateDualog: any;
  minimumDistance = +1e19;
  BoutiqueFinale = "";
  BoutiqueFinaleID:any ;



  constructor(private messageService: MessageService,private fb:FormBuilder,private DataTransfer: DataTransferService,private ProdService: ProduitService, private TransfertService: TransfertService, private PersonneService: InscriptionService) {
  }

 /*SetStoreMarkers(Boutique1:any,Boutique2:any) {

   let  map= new google.maps.Map(document.getElementById("map"));

  this.ProdService.getBoutiqueById(Boutique1).subscribe(Res1=>{
   let  T1 =this.ExtractionAltitude(Res1.localisation);
    let marker = new google.maps.Marker({
      position:{
        lat:+T1[0],
        lng:+T1[1]
      },
      map:map,
      title:Res1.nomBoutique
    });
    marker.setMap(map);
  }).unsubscribe();
   this.ProdService.getBoutiqueById(Boutique2).subscribe(Res2=>{
     let  T2 =this.ExtractionAltitude(Res2.localisation);
     let marker = new google.maps.Marker({
       position:{
         lat:+T2[0],
         lng:+T2[1]
       },
       map:map,
       title:Res2.nomBoutique
     });
     marker.setMap(map);
   })
  }

  */
  getRandomTransferRefernce(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //cette fonction est utilisée pour chargement de données d'utilisateurs
   LoadCoursiers() {
    this.CoursierTab.push({label:"Liste des Coursiers",value:""});
   this.PersonneService.Utilisateurs().subscribe( PersoData => {
         for (let i=0;i<PersoData.length;i++){
           if(PersoData[i]['role'] == "Coursier"){
             this.P.push( PersoData[i]);
           }
         }
     for(let j=0 ;j<this.P.length;j++){
       if(this.P[j]['coursierByCin']['disponibilite'] == true){
         console.log(this.P[j]['cin']);
         this.CoursierTab.push({label:this.P[j]['nom']+" "+this.P[j]['prenom'],value:this.P[j]['cin']});
       }
     }
   });

  }
  //cette fonction est utilisée pour remplir le tableau dans la page transfertHTML

  RecuperationTransfert() {
    this.TransfertService.recupererTransfert().subscribe(TransfertData => {
      console.log(TransfertData);
      this.TransfertTab = TransfertData;
    });
  }
  showDetailsTransfert(row:any ,position: string) {
    console.log(row);
    this.RefTranDialog= row.referenceTransfert ;
    this.StatutTransDialog = row.statut ;
    this.CoursierDialog = row.cinC;
    this.BoutiqueEmDialog = row.transfertboutiquesByReferenceTransfert[0]['idBouEmetteur'];
    this.BooutiqueDisDialog = row.transfertboutiquesByReferenceTransfert[0]['idBouDestinataire'];
    this.DateDualog=row.dateTransfert ;
    this.position = position;
    this.displayposition = true;

  }
  GetDataFromDataTransferService(){
    this.DataTransfer.CurrentAlert.subscribe(message => {
      this.Alert = message ;
      console.log(Object.keys(this.Alert).length);
      if(Object.keys(this.Alert).length === 0){
        console.log("Hello Alert is empty");
      }else {
        console.log(this.Alert);
        (document.getElementById("RefTransfert")as HTMLOutputElement).value = "REF" +this.getRandomTransferRefernce(100,1000);
        (document.getElementById("BoutiqueDestinataire") as HTMLOutputElement).value =this.Alert.nomBoutique;
        this.idBou = this.Alert.idBou;
        this.idAlert = this.Alert.idAlert ;
        this.ExtractionLocation(this.Alert.localisation);
     }
    });
  }
  //this algoritmh is used
  ExtractionAltitude(L:string) {
    let CH = L;
    let n = CH.indexOf('@');
    let n1 = CH.indexOf('/data');
    let Res = CH.substr(n+1,n1-n-3-2);
    let Ch1 = "";
    let Ch2 = "";
    return [Ch1 = Res.substr(0,Res.indexOf(",")),Ch2 = Res.substr(Res.indexOf(",")+1)];
  }
  ExtractionLocation(L:string) {
    let Pos = this.ExtractionAltitude(L);
     this.ProdService.getProdByMLT(this.Alert.libelle,this.Alert.marque,this.Alert.type).subscribe(Prod =>{
       console.log(Prod.boutiqueproduitsByReferenceProduit);
       let loop2 = async() =>{
         //initialize Tables Here
         this.TableRes = [];
         this.TableRes.length = 0 ;
         this.BPTable.length = 0 ;
         for (let i = 0; i < Prod.boutiqueproduitsByReferenceProduit.length; i++) {
           this.ProdService.getBoutiqueById(Prod.boutiqueproduitsByReferenceProduit[i].idBou).subscribe(Result => {
             this.BPTable.push(Result);
           });
         }
         await new Promise(resolve => {setTimeout(resolve,500)});
         //Test if we don't The Product specified in the Alert
         if(this.BPTable.length == 0){
           this.messageService.add({key:"SS",severity:'warn',summary:'Manque de Produit',detail:'Ce Produit est introuvable dans nos Boutiques '})
         }else {
           //here we calculate Destination and push results in TableRes  . The Reason we've used Promise is : Angular is Working
           for (let i = 0; i < this.BPTable.length; i++) {
             let Pos2 = this.ExtractionAltitude(this.BPTable[i].localisation);
             this.Res = this.getCoordinates(Pos, Pos2);

             await new Promise(resolve => setTimeout(resolve, 1500));
             this.TableRes.push(this.Res);
           }
         }
      }
      let loop =async ()=>{
       await new Promise((resolve,reject)=>{
         resolve(loop2());
       }).then((value => {
         value = this.TableRes;
         console.log(this.TableRes);
         for(let i = 0 ; i<this.BPTable.length;i++){
           //Find the Closest Store to us
          if(this.minimumDistance>this.TableRes[i]){
            this.minimumDistance= this.TableRes[i];
            this.BoutiqueFinale = this.BPTable[i].nomBoutique;
            this.BoutiqueFinaleID = this.BPTable[i].idBoutique;
          }
         }
         (document.getElementById("BoutiqueEmetteur")as HTMLOutputElement).value = this.BoutiqueFinale;
       }));
      }
      loop();
     });
  }
  //methode de l'api MapQuest
  getCoordinates(Pos1:any,Pos2:any):any{
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
      '        lat: ' + Pos1[0] + ',\n' +
      '        lng:' + Pos1[1] + '\n' +
      '      }\n' +
      '    },\n' +
      '    {\n' +
      '      latLng: {\n' +
      '        lat: ' + Pos2[0] + ',\n' +
      '        lng: ' + Pos2[1] + '\n' +
      '      }\n' +
      '    }\n' +
      '  ],\n' +
      '  options: {\n' +
      '    unit: \'k\'\n' +
      '  }\n' +
      '}';
    this.TransfertService.Location(tab).subscribe(data => {
      console.log('i ve reached the API');
      this.Res = data['route']['distance'];
  });
    return this.Res ;
  }
  AddTransfert(){
    let T : Transfert =  new Transfert();
    let TB: Transfertboutique = new Transfertboutique();
    T.cinC= this.TransfertForm.get('DropD').value;
    TB.idBouDestinataire=this.idBou;
    TB.idBouEmetteur=this.BoutiqueFinaleID;
    TB.refTran=(document.getElementById("RefTransfert")as HTMLInputElement).value;
    T.referenceTransfert=(document.getElementById("RefTransfert")as HTMLInputElement).value;
    T.statut=0;
    let days:any= this.dateValue.getDay();
    //add +1 to month cuz it starts from 0
    let month:any=this.dateValue.getMonth()+1;
    let year:any=this.dateValue.getFullYear();
    T.dateTransfert= year+"-"+month+"-"+days ;

    let Operation = async ()=> {
      this.TransfertService.SaveTransfert(T).subscribe(response => {
        if (response) {
          this.messageService.add({key: "SS", severity: 'success', summary: 'Demande de transfert', detail: 'Le transfert est Encours'});

        } else {
          this.messageService.add({key: "SS", severity: 'danger', summary: 'Demande de transfert', detail: 'Le transfert est echoué'});

        }
      }, error => {
        this.messageService.add({key: "SS", severity: 'warn', summary: 'Demande de transfert', detail: 'Un erreur est survenue' + error});

      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      //set timeout 0
      this.TransfertService.SaveTransfertBoutique(TB).subscribe(response =>{
        if(response){
          this.messageService.add({key:"SS",severity:'success',summary:'Détails',detail:'tous les operations sont terminés'});

        }else {
          this.messageService.add({key:"SS",severity:'info',summary:'Détails',detail:'Insertion dans la table boutiqueProduit a echouée'});

        }
      },error => {
        this.messageService.add({key:"SS",severity:'danger',summary:'Détails',detail:'Un erreur est survenue dans la table BoutiqueProduit'+ error});

      });
      this.ProdService.deleteAlert(this.idAlert).subscribe(response =>{
        if(response){
          this.messageService.add({key:"SS",severity:'success',summary:'Détails',detail:'Alerte Supprimé'});
        }
      },error => {
        this.messageService.add({key:"SS",severity:'danger',summary:'Détails',detail:error});

      })
    }
     Operation();
       }
  ngOnInit(): void {
    this.LoadCoursiers();
    this.RecuperationTransfert();
    this.TransfertForm = this.fb.group({
      'DateT': new FormControl(null),
      'DropD': new FormControl(),
    });

  }

  ngAfterViewInit() {
    this.GetDataFromDataTransferService();
  }
}



