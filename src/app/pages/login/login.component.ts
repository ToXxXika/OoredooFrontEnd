import { Component, OnInit, OnDestroy } from '@angular/core';
import {InscriptionService} from "../../Services/inscription.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {MessageService} from "primeng/api";
import {StaticPersonne} from '../../models/StaticPersonne';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-message div {
            color: #ffffff;
        }

        :host ::ng-deep .custom-toast .ui-toast-message.ui-toast-message-info .ui-toast-close-icon {
            color: #ffffff;
        }
    `],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  private CookieCinValue: string ;
  private CookiePasswordValue: string ; // need to fix Cookies Configuration
  static P:StaticPersonne = new StaticPersonne();
  constructor(private inscriptionService: InscriptionService, private router: Router,private cookieService: CookieService,private messageService: MessageService) {}
 public LoadLocalstorageKeys(KeyName: string):string{
     switch (KeyName) {
       case 'KeyNom': {
         return 'NomLocal';
       }
       case 'KeyPrenom':{
         return 'PrenomLocal';
       }
       case 'KeyRole':{
         return  'RoleLocal';
       }

       case 'KeyMail':{
         return 'MailLocal';
       }
       case 'KeyBoutique':{
         return  'BoutiqueLocal';
       }
       case 'KeyCin':{
         return 'CinLocal';
       }
       case 'KeyTag':{
         return  'Localuser';
       }
       case 'KeyTel':{
         return 'NumLocal';
       }
       default : alert('KeyNotFound');
       break;
     }
  }
  VerifUser() {
    const username = (document.getElementById('cin') as HTMLInputElement).value;
    const motdepasse = (document.getElementById('motdepasse') as HTMLInputElement).value;
    if (this.CheckInputs(username,motdepasse)) {
      this.inscriptionService.login(username,motdepasse).subscribe( response=> {
           if(response['authenticated']=== true){
             let RoleGuard = "" ;
             this.inscriptionService.GetUserRole(username).subscribe(data => {
               localStorage.setItem(this.LoadLocalstorageKeys('KeyNom'),data['nom']);
               localStorage.setItem(this.LoadLocalstorageKeys('KeyPrenom'),data['prenom']);
               localStorage.setItem(this.LoadLocalstorageKeys('KeyCin'),data['cin']);
               localStorage.setItem(this.LoadLocalstorageKeys('KeyMail'),data['mail']);
               localStorage.setItem(this.LoadLocalstorageKeys('KeyTag'),data['username']);
               localStorage.setItem(this.LoadLocalstorageKeys('KeyTel'),data['numTel']);
               switch (data["role"]) {
                 case 'Admin' : {
                   RoleGuard ="Admin";
                    LoginComponent.P.Verification(data,true);
                    localStorage.setItem("Role",RoleGuard)
                   this.router.navigateByUrl('/dashboard');
                   break;
                 }
                 case 'Coursier': {
                   RoleGuard="Coursier";
                   LoginComponent.P.Verification(data,true);
                   localStorage.setItem("Role",RoleGuard)
                   this.router.navigateByUrl('/coursier');
                   break;
                 }
                 case 'AgentCommercial': {
                   RoleGuard="AgentCommercial";
                   LoginComponent.P.Verification(data,true);
                   localStorage.setItem(this.LoadLocalstorageKeys('KeyBoutique'),data['agentcommercialByCin'].idbou);
                   localStorage.setItem("Role",RoleGuard)
                   this.router.navigateByUrl('/produits');
                   break;
                 }
                 default: {
                   this.messageService.add({key:"SS",severity:"danger",summary:"Gestion des utilisateurs",detail:"Role inconnu pour cet utilisateur"});
                   break;
                 }
               }
             })
           }
       },error => {
         this.messageService.add({key:"SS",severity:"warn",summary:"Gestion des utilisateurs",detail:"Utilisateur introuvable"});
       })
    }
  }
  //Pour la verification des Champs du formulaire
  CheckInputs(username:any,motdepasse: any):boolean{
    if((username.length==0)||(motdepasse.length==0)){
      this.messageService.add({key:"SS",severity:"warn",detail:"les champs sont vides "});
      return  false ;
    }else {
      return true ;
    }
  }
  SaveCookies(){
    const  cin = (document.getElementById('cin') as HTMLInputElement).value;
    const motdepasse = (document.getElementById('motdepasse') as HTMLInputElement).value;
    if((Object.keys(cin).length == 0) && (Object.keys(motdepasse).length == 0)){
       this.messageService.add({key:"Error",severity:"Error",detail:"les champs sont vides merci de les remplir"});
    }else {
      this.cookieService.set("CIN", cin, 3);
      this.cookieService.set("motdepasse", motdepasse, 3);
    }
  };
  ngOnInit() {
     localStorage.clear();
    this.CookieCinValue = this.cookieService.get('CIN');
    this.CookiePasswordValue = this.cookieService.get('motdepasse');
  }

}
