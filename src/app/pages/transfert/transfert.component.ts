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

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css'],
  providers: [MessageService]
})
export class TransfertComponent implements AfterViewInit {
  Res : any = " ";
  MinimumDistance :any="";
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
  constructor(private messageService: MessageService,private fb:FormBuilder,private DataTransfer: DataTransferService,private ProdService: ProduitService, private TransfertService: TransfertService, private PersonneService: InscriptionService) {
  }


  getRandomTransferRefernce(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //cette fonction est utilisée pour chargement de données d'utilisateurs
   LoadCoursiers() {
   this.PersonneService.Utilisateurs().subscribe( PersoData => {
         for (let i=0;i<PersoData.length;i++){
           if(PersoData[i]['role'] == "Coursier"){
             this.P.push( PersoData[i]);
           }
         }
     for(let j=0 ;j<this.P.length;j++){
       if(this.P[j]['coursierByCin']['disponibilite'] == false){
         console.log(this.P[j]['cin']);
         this.CoursierTab.push({label:this.P[j]['nom']+" "+this.P[j]['prenom'],value:this.P[j]['cin']});
       }
     }
   });

  }
  //cette fonction est utilisée pour remplir le tableau dans la page transfertHTML
  RecuperationTransfert() {
    this.TransfertService.recupererTransfert().subscribe(TransfertData => {
      this.TransfertTab = TransfertData;
    });
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
       console.log(Prod);
       let loop2 = async() =>{
         this.TableRes = [];
         this.TableRes.length = 0 ;
         this.BPTable.length = 0 ;
         for (let i = 0; i < Prod[0].boutiqueproduitsByReferenceProduit.length; i++) {
          // console.log(Prod[0].boutiqueproduitsByReferenceProduit[i]);
           this.ProdService.getBoutiqueById(Prod[0].boutiqueproduitsByReferenceProduit[i].idBou).subscribe(Result => {
             this.BPTable.push(Result);
           });
         }
         await new Promise(resolve => {setTimeout(resolve,500)});
         if(this.BPTable.length == 0){
           this.messageService.add({key:"SS",severity:'warn',summary:'Manque de Produit',detail:'Ce Produit est introuvable dans nos Boutiques '})
         }else {
           for (let i = 0; i < this.BPTable.length; i++) {
             let Pos2 = this.ExtractionAltitude(this.BPTable[i].localisation);
             this.Res = this.getCoordinates(Pos, Pos2);
             await new Promise(resolve => setTimeout(resolve, 900));
             this.TableRes.push(this.Res);
           }
         }
         console.log("============= BPTABLE");
         console.log(this.BPTable);
      }
      let loop =async ()=>{
       await new Promise((resolve,reject)=>{
         resolve(loop2());
       }).then((value => {
         value = this.TableRes;
         for(let i = 0 ; i<this.BPTable.length;i++){
           console.log(this.TableRes[i] +" " +this.BPTable[i].nomBoutique);
         }
       }));
      }
      loop();
     });
  }
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
      this.Res = data['route']['distance'];
  });
    return this.Res ;
  }
  AddTransfert(){
    let T : Transfert =  new Transfert();
    let TB: Transfertboutique = new Transfertboutique();
    T.cinC= this.TransfertForm.get('DropD').value;
    TB.idBouDestinataire=this.idBou;
    TB.idBouEmetteur=2;
    TB.refTran=(document.getElementById("RefTransfert")as HTMLInputElement).value;
    T.referenceTransfert=(document.getElementById("RefTransfert")as HTMLInputElement).value;
    T.statut=0;
    let days:any= this.dateValue.getDay();
    let month:any=this.dateValue.getMonth();
    let year:any=this.dateValue.getFullYear();
    T.dateTransfert= year+"-"+month+"-"+days ;
    console.log(T);
    console.log(TB);
    let Operation = async ()=> {

      this.TransfertService.SaveTransfert(T).subscribe(response => {
        if (response) {
          this.messageService.add({key: "SS", severity: 'success', summary: 'Demande de transfert', detail: 'Le transfert est En cours'});
        } else {
          this.messageService.add({key: "SS", severity: 'danger', summary: 'Demande de transfert', detail: 'Le transfert est echoué'});

        }
      }, error => {
        this.messageService.add({key: "SS", severity: 'warn', summary: 'Demande de transfert', detail: 'Un erreur est survenue' + error});

      });
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.TransfertService.SaveTransfertBoutique(TB).subscribe(response =>{
        if(response){
          this.messageService.add({key:"SS",severity:'success',summary:'Détails',detail:'tous les operations sont terminés'});
        }else {
          this.messageService.add({key:"SS",severity:'info',summary:'Détails',detail:'Insertion dans la table boutiqueProduit a echouée'});

        }
      },error => {
        this.messageService.add({key:"SS",severity:'danger',summary:'Détails',detail:'Un erreur est survenue dans la table BoutiqueProduit'+ error});

      });
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



