import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteguardAgentService implements  CanActivate{

  constructor() { }

  canActivate() {
    if(localStorage.getItem("Role")===null){
      return  false ;
    }
    if(localStorage.getItem("Role")==="AgentCommercial"){
      return true ;
    }else{
      window.alert(" you are not an AGENT COMMERCIAL U CANT GO THERE ")
      return  false ;
    }
  }
}
