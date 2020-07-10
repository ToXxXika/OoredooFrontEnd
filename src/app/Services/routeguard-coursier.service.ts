import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteguardCoursierService implements CanActivate{

  constructor() { }

  canActivate(): boolean  {
    if(localStorage.getItem("Role")===null){
      return  false ;
    }
    if(localStorage.getItem("Role")==="Coursier"){
      return true ;
    }else{
      window.alert(" vous n'avez pas l'access ")
      return  false ;
    }
  }
}

