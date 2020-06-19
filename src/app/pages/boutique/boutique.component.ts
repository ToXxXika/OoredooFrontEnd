import { Component, OnInit } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {ProduitService} from '../../Services/produit.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  providers: [MessageService]
})
export class BoutiqueComponent implements OnInit {
  userform: FormGroup;

  submitted: boolean;

  genders: SelectItem[];
  BoutiqueDropdown : any[]=[];
  TypeProdDropdown : any[]=[];
  description: string;
  constructor(private fb: FormBuilder, private messageService: MessageService,private ProdService: ProduitService) { }

  RemplissageDeDropdown(){
    this.BoutiqueDropdown.push({label:'ListeBoutiques',value:''});
    this.TypeProdDropdown.push({label:'ListeTypes',value:''});
    this.ProdService.recupererBoutique().subscribe( BoutiqueData =>{
      for ( let i=0;i<BoutiqueData.length;i++){
        this.BoutiqueDropdown.push({label:BoutiqueData[i].nom_boutique,value:BoutiqueData[i].nom_boutique});
      }
    });
    this.ProdService.getType().subscribe( TypeData => {
      for( let i=0; i<TypeData.length;i++){
        this.TypeProdDropdown.push({label:TypeData[i].description,value:TypeData[i].description});
      }
    });

  }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'Boutique': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'description': new FormControl('')
    });
    this.RemplissageDeDropdown();
  }
  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }

}
