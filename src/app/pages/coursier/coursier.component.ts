import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../Services/produit.service';
import {Transfert} from '../../models/Transfert';
import {InscriptionService} from '../../Services/inscription.service';
import {MessageService} from 'primeng';
import {TransfertService} from '../../Services/transfert.service';
import {LoginComponent} from '../login/login.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-coursier',
  templateUrl: './coursier.component.html',
  styleUrls: ['./coursier.component.css'],
  providers : [MessageService]
})
export class CoursierComponent implements OnInit {
  Transfert: Transfert[] = [];
  selectedTransfert: Transfert;
  rowData: any;
  Confirmer: boolean;
  constructor(private router: Router,private TransfertService: TransfertService,private messageService: MessageService,private ProdService: ProduitService,private UserService: InscriptionService) { }

  ngOnInit(): void {
    if(Object.keys(LoginComponent.P).length === 0){
      console.log("im empty");
      this.router.navigateByUrl("/login");
    }else {
      this.ProdService.getTransfertBycin(localStorage.getItem('CinLocal')).subscribe(Transferts => {
        this.Transfert = Transferts;
        console.log(this.Transfert);
      })
    }
    this.Confirmer=true;

  }
  //le Coursier confirme que La Boutique a recevoir le produit specifique en cliquant dans ce buttone ( avec Changement de Taille de  quantite disponible dans la boutique Destinataire
  // a faire
  //lehne lazemna nzidou Update 3le Stock de Produit 3and el Boutique li mchetlha el sel3a
  AcceptTransfert(event: Transfert){
    this.TransfertService.UpdateTransfer(event.referenceTransfert,1).subscribe(upTransfert =>{
      console.log(upTransfert);
      if(upTransfert === true){
        this.messageService.add({
          key: 'SS',
          severity: 'success',
          summary: 'Transfert MAJ ',
          detail: 'Mise a jour du transfert effectué'
        });
      }else {
        this.messageService.add({
          key: 'SS',
          severity: 'warn',
          summary: 'Transfert MAJ',
          detail: 'Mise a jour du transfert non effectué'
        });
      }

    },error => {
      this.messageService.add({
        key: 'SS',
        severity: 'danger',
        summary: 'Transfert MAJ ',
        detail: error
      });

    });

  }

  //le Coursier demarre le Transfert  Dans cette Fonction seulement le Statut de Coursier se change  (Disponibilité = false )
  StartTransfert() {
    this.UserService.UpdateCoursierStatus(localStorage.getItem('CinLocal'),false).subscribe( Update =>{
      console.log(Update);
      if(Update) {
        this.messageService.add({
          key: 'SS',
          severity: 'success',
          summary: 'Demarrage de Transfert',
          detail: 'Coursier a commencé le Transfert'
        });
        this.Confirmer=false;
      }else {
        this.messageService.add({
          key: 'SS',
          severity: 'warn',
          summary: 'Demarrage de Transfert',
          detail: 'demarrage de transfert a echoué '
        });
      }
    },error =>   this.messageService.add({
      key: 'SS',
      severity: 'danger',
      summary: 'Demande de transfert',
      detail: error
    }));
  }
}
