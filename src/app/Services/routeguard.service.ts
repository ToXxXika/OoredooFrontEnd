import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate{

  constructor() { }

  canActivate() {
    if(localStorage.getItem("Role")===null){
      return  false ;
    }
    if(localStorage.getItem("Role")==="Admin"){
      return true ;
    }else{
     window.alert("u cant go there")  ;
      return  false ;

    }
  }
}
