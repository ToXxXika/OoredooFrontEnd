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
  constructor(private router: Router,private TransfertService: TransfertService,private messageService: MessageService,private ProdService: ProduitService,private UserService: InscriptionService) { }

  ngOnInit(): void {
    if(Object.keys(LoginComponent.P).length === 0){
      console.log("im empty");
      this.router.navigateByUrl("/login");
    }else {
      this.ProdService.getTransfertBycin(LoginComponent.P.cin).subscribe(Transferts => {
        this.Transfert = Transferts;
        console.log(this.Transfert);
      })
    }

  }
  AcceptTransfert(event: Transfert){
    this.UserService.UpdateCoursierStatus(LoginComponent.P.cin,false).subscribe( Update =>{
      console.log(Update);
      if(Update) {
        this.messageService.add({
          key: 'SS',
          severity: 'success',
          summary: 'MISE A JOUR ',
          detail: 'Mise a jour effectué'
        });
      }else {
        this.messageService.add({
          key: 'SS',
          severity: 'warn',
          summary: 'MISE A JOUR ',
          detail: 'Mise a jour non effectué'
        });
      }
    },error =>   this.messageService.add({
      key: 'SS',
      severity: 'danger',
      summary: 'Demande de transfert',
      detail: error
    }));
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

}
