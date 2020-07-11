import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';
import {DetailsCommande} from '../models/DetailsCommande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
    private UrlSaveCommande ='http://localhost:8080/Commande/AddCommande';
    private UrlSaveDetailCommande = 'http://localhost:8080/Commande/AddDetailCommande';
    private UrlgetCommandes = 'http://localhost:8080/Commande/getDetailsC';
  constructor(private http:HttpClient) { }

  public SaveCommande(T:Commande){
    return this.http.post<Commande>(this.UrlSaveCommande,T);
  }
  public SaveDetailCommande(DC:DetailsCommande){
    return this.http.post<DetailsCommande>(this.UrlSaveDetailCommande,DC);
  }
  public GetCommandes(){
    return this.http.get<DetailsCommande[]>(this.UrlgetCommandes);
  }
}
