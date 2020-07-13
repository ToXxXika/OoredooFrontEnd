import {Component, OnInit, ViewChild,OnDestroy} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {ProduitService} from '../../Services/produit.service';
import {boutiqueProduit} from '../../models/boutiqueProduit';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Alert} from '../../models/alert';
import {Produit} from '../../models/produit';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  providers : [MessageService]
})
export class ProduitComponent implements OnInit{
  Produits: Produit[] = [];
  cols: any[];
  TypeProdDropdown: any[] = [];
  MarqueDropdown: any[] = [];
  MarqueFiltre: string[] = [];
  LibelleProdDropdown: any[]=[];
  LibelleFiltre: string[]= [];
  typeFiltra: any[]=[];
  loading: boolean = true;
  displayDialog: boolean;
  userform: FormGroup;
  T:Alert = new Alert() ;
  TypeDisable:boolean;
  LibelleDisable: boolean;
  MarqueModel: any;
  TypeModel: any;
  LibelleModel: any;

  constructor(private fb: FormBuilder,private ProdServ: ProduitService, private messageService: MessageService) {
  }


  LoadLists() {
    this.TypeProdDropdown.push({label:"Liste des Types", value:""});
    this.MarqueDropdown.push({label: "Liste des Marques", value: ""});
    this.LibelleProdDropdown.push({label:"Liste des Libéllés",value:""});
    this.ProdServ.recupererProduit().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        //filtrage de marque pour eviter la redondance
        if (this.MarqueFiltre.indexOf(data[i].marque) == -1) {
          this.MarqueFiltre.push(data[i].marque);
        }
      }
      for (let j = 0; j < this.MarqueFiltre.length; j++) {
        this.MarqueDropdown.push({label: this.MarqueFiltre[j], value: this.MarqueFiltre[j]});
      }
    });
  }


  ngOnInit(): void {
    //don't display the Dialog Result
  this.displayDialog = false ;
  this.TypeDisable = true ;
  this.LibelleDisable = true ;
   //Load my Form Controls
    this.userform = this.fb.group({
      'Libelle': new FormControl(''),
      'Type': new FormControl(''),
      'Marque': new FormControl(''),
    });
   //=================================================
    this.LoadLists();
    let y: number = + localStorage.getItem('BoutiqueLocal');
    console.log(y);
          this.ProdServ.getSpecifiedProduct(y).subscribe(Pr =>{
            this.Produits = Pr ;
          });
  }

  showDialogToAdd() {
    this.displayDialog = true ;
  }
/*  ngOnDestroy() {
    localStorage.clear();
  }*/

  Confirmer() {
    const InputMarque =this.MarqueModel;
    const InputType = this.TypeModel;
    const InputLibelle =this.LibelleModel;
    //switch with real values
    this.T.idBoutique=localStorage.getItem("BoutiqueLocal");
    this.T.marque=InputMarque;
    this.T.type=InputType;
    this.T.libelle= InputLibelle ;
    console.log(this.T);
    this.ProdServ.saveAlert(this.T).subscribe( response => {
      console.log(response);
      if (response === true){
        this.messageService.add({key: 'SS', severity: 'success', summary: 'Travail Terminé', detail:'Alert Ajouté'});
      }else {
        this.messageService.add({key: 'SS', severity: 'warn', summary: 'Oops!', detail:'Alert non Ajouté'});
      }
    },error =>  this.messageService.add({key: 'SS', severity: 'danger', summary: ':D', detail:'Erreur est survenue'+ error}));

    this.displayDialog = false ;
  }

  ChangeMarqueDropdown(Marque: any) {
    this.TypeProdDropdown.length=0;
    this.TypeDisable= false ;
    this.ProdServ.getTypeByMarque(Marque).subscribe(dataType=>{
      for(let x of dataType){
        if (this.typeFiltra.indexOf(x) == -1) {
          this.typeFiltra.push(x);
        }
      }
      for (let X of this.typeFiltra) {
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

}
