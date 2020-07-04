import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {ProduitService} from '../../Services/produit.service';
import {boutiqueProduit} from '../../models/boutiqueProduit';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Alert} from '../../models/alert';
import {Produit} from '../../models/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  providers : [MessageService]
})
export class ProduitComponent implements OnInit {
  Produits: Produit[] = [];
  cols: any[];
  TypeProdDropdown: any[] = [];
  MarqueDropdown: any[] = [];
  MarqueFiltre: string[] = [];
  LibelleProdDropdown: any[]=[];
  LibelleFiltre: string[]= [];
  loading: boolean = true;
  displayDialog: boolean;
  userform: FormGroup;
  T:Alert = new Alert() ;


  constructor(private fb: FormBuilder,private ProdServ: ProduitService, private messageService: MessageService) {
  }


  LoadLists() {
    this.ProdServ.getType().subscribe(TypeData => {
      for (let i = 0; i < TypeData.length; i++) {
        this.TypeProdDropdown.push({label: TypeData[i].description, value: TypeData[i].idType});
      }
    });
    this.ProdServ.recupererProduit().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        //filtrage de marque pour eviter la redondance
        if (this.MarqueFiltre.indexOf(data[i].marque) == -1) {
          this.MarqueFiltre.push(data[i].marque);
        }
        if(this.LibelleFiltre.indexOf(data[i].libelle) == -1){
          this.LibelleFiltre.push(data[i].libelle);
        }
      }
      for (let j = 0; j < this.MarqueFiltre.length; j++) {
        this.MarqueDropdown.push({label: this.MarqueFiltre[j], value: this.MarqueFiltre[j]});
      }
      for (let k =0; k<this.LibelleFiltre.length;k++){
        this.LibelleProdDropdown.push({label:this.LibelleFiltre[k],value:this.LibelleFiltre[k]});
      }

    });
  }


  ngOnInit(): void {
    //don't display the Dialog Result
  this.displayDialog = false ;
   //Load my Form Controls
    this.userform = this.fb.group({
      'Libelle': new FormControl(''),
      'Type': new FormControl(''),
      'Marque': new FormControl(''),
    });
   //=================================================
    this.LoadLists();
          this.ProdServ.getSpecifiedProduct(5).subscribe(Pr =>{
            this.Produits = Pr ;
            console.log(this.Produits)
          });
  }

  showDialogToAdd() {
    this.displayDialog = true ;
  }

  Confirmer() {
    const InputMarque = this.userform.get('Marque').value ;
    const InputType = this.userform.get('Type').value;
    const InputLibelle = this.userform.get('Libelle').value;
    //switch with real values
    this.T.idBoutique=2;
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
}
