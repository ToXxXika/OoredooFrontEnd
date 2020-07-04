import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
    private UrlSaveCommande ='http://localhost:8080/Commande/AddCommande';
  constructor(private http:HttpClient) { }

  public SaveCommande(T:Commande){
    return this.http.post<Commande>(this.UrlSaveCommande,T);
  }
}
