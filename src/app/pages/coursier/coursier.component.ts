import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../Services/produit.service';
import {Transfert} from '../../models/Transfert';
import {InscriptionService} from '../../Services/inscription.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-coursier',
  templateUrl: './coursier.component.html',
  styleUrls: ['./coursier.component.css'],
  providers : [MessageService]
})
export class CoursierComponent implements OnInit {
  Transfert: Transfert[] = [];
  constructor(private messageService: MessageService,private ProdService: ProduitService,private UserService: InscriptionService) { }

  ngOnInit(): void {
    this.ProdService.getTransfertBycin('01234576').subscribe( Transferts =>{
      this.Transfert = Transferts ;
      }
    )
  }
  AcceptTransfert(){
    this.UserService.UpdateCoursierStatus('01234576').subscribe( Update =>{
      this.messageService.add({
        key: 'SS',
        severity: 'success',
        summary: 'Demande de transfert ',
        detail: 'Utilisateur non disponible pendant loperation'
      });
    },error =>   this.messageService.add({
      key: 'SS',
      severity: 'danger',
      summary: 'Demande de transfert',
      detail: error
    }))
    this.
  }
}
