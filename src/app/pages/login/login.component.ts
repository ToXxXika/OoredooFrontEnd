import { Component, OnInit, OnDestroy } from '@angular/core';
import {InscriptionService} from "../../Services/inscription.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {MessageService} from "primeng/api";

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
export class LoginComponent implements OnInit, OnDestroy {
  private CookieCinValue: string ;
  private CookiePasswordValue: string ; // need to fix Cookies Configuration

  constructor(private inscriptionService: InscriptionService, private router: Router,private cookieService: CookieService,private messageService: MessageService) {}
 public LoadLocalstorageKeys(KeyName: string):string{
     switch (KeyName) {
       case 'KeyUser': {
         return 'UsernameLocal';
       }
       case 'KeyRole':{
         return  'RoleLocal';
       }

       case 'KeyMail':{
         return 'MailLocal';
       }
       default : alert('KeyNotFound');
       break;
     }
  }
  VerifUser() {
   let namesurname: string;
    const username = (document.getElementById('cin') as HTMLInputElement).value;
    const motdepasse = (document.getElementById('motdepasse') as HTMLInputElement).value;
    if (this.CheckInputs()) {
      if ((this.inscriptionService.login(username, motdepasse))) {
        console.log("UserNotFound");
        //this.router.navigate([LoginComponent]);
      } else {
        //localStorage for All data about that specific user so we can display his/her Profile
        this.inscriptionService.GetUserRole(username).subscribe(data => {
          console.log(data);
          console.log(data["role"]);
          namesurname= data["nom"]+" "+data["prenom"];
          console.log(namesurname);
          localStorage.setItem(this.LoadLocalstorageKeys('KeyUser'),namesurname);
          switch (data["role"]) {
            case 'Admin' : {
              console.log("going to Dashboard");
              this.router.navigateByUrl('/dashboard');
              break;
            }
            case 'Coursier': {
              //a Faire InterFace d'un Coursier
              this.router.navigateByUrl('/Dashboard');
              break;
            }
            case 'AgentCommercial': {
              //a faire interface d'un Agent Commercial
              this.router.navigateByUrl('/boutique');
              break;

            }
            default: {
              alert("ERROR IN TABLE");
              break;
            }
          }
        })
      }
    }
  }
  //Pour la verification des Champs du formulaire
  CheckInputs():boolean{

     const  username = (document.getElementById('cin') as HTMLInputElement).value;
    const motdepasse = (document.getElementById('motdepasse') as HTMLInputElement).value;
    if((username.length==0)||(motdepasse.length==0)){
      this.messageService.add({key:"ErrorInput",severity:"warn",detail:"les champs sont vides "});
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

    this.CookieCinValue = this.cookieService.get('CIN');
    this.CookiePasswordValue = this.cookieService.get('motdepasse');
  }
  ngOnDestroy() {
   // localStorage.clear();
  }

}
