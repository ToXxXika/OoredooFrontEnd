import { Component, OnInit } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ProduitService} from '../../Services/produit.service';
import {Alert} from '../../models/alert';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  providers: [MessageService]
})
export class BoutiqueComponent implements OnInit {
  userform: FormGroup;

  submitted: boolean;
  BoutiqueDropdown : any[]=[];
  TypeProdDropdown : any[]=[];
  MarqueDropdown : any[]=[];
  MarqueFiltre: string[]=[];
  description: string;
  T:Alert = new Alert();
  constructor(private fb: FormBuilder, private messageService: MessageService,private ProdService: ProduitService) { }

  RemplissageDeDropdown(){
    this.BoutiqueDropdown.push({label:'ListeBoutiques',value:''});
    this.TypeProdDropdown.push({label:'ListeTypes',value:''});
    this.MarqueDropdown.push({label:'ListeMarque',value:''});
    this.ProdService.recupererBoutique().subscribe( BoutiqueData =>{

      for ( let i=0;i<BoutiqueData.length;i++){
        console.log(BoutiqueData[i].idBoutique);
        this.BoutiqueDropdown.push({label:BoutiqueData[i].nomBoutique,value:BoutiqueData[i].idBoutique});
      }
    });
    this.ProdService.getType().subscribe( TypeData => {
      for( let i=0; i<TypeData.length;i++){
        this.TypeProdDropdown.push({label:TypeData[i].description,value:TypeData[i].idType});
      }
    });
    this.ProdService.recupererProduit().subscribe( data => {
      for (let i = 0; i < data.length; i++) {
       //filtrage de marque pour eviter la redondance
        if (this.MarqueFiltre.indexOf(data[i].marque) == -1) {
          this.MarqueFiltre.push(data[i].marque);
        }
      }
      for(let j=0;j<this.MarqueFiltre.length;j++){
        this.MarqueDropdown.push({label:this.MarqueFiltre[j],value: this.MarqueFiltre[j]});
      }
    });
  }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'Boutique': new FormControl(''),
      'Type': new FormControl(''),
      'Marque': new FormControl(''),
    });
    this.RemplissageDeDropdown();
  }
  //Ajout d'une alert a la table
  AddAlert(){
    const InputMarque = this.userform.get('Marque').value ;
    const InputType = this.userform.get('Type').value;
    const InputBoutique = this.userform.get('Boutique').value;
    console.log(InputBoutique);
      this.T.idBoutique=InputBoutique;
      this.T.marque=InputMarque;
      this.T.type=InputType;
      this.T.idAlert=2;
    this.ProdService.saveAlert(this.T)
  }
  onSubmit(value: string) {
    this.AddAlert();
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'AlertAjouté'});
  }

}
