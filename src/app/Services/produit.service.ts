import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Produit} from '../models/produit';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transfert} from '../models/Transfert';
import {Boutique} from '../models/Boutique';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private UrlProduit = 'http://localhost:8080/Produit/getAllProducts';
  private UrlBoutique = 'http://localhost:8080/Boutique/GetAllBoutiques';
  private UrlgetRef = 'http://localhost:8080/Produit/getRefProd';


  public recupererProduit() {
    return  this.http.get<Produit[]>(this.UrlProduit);
  }


  public recupererBoutique(){
    return this.http.get<Boutique[]>(this.UrlBoutique);
  }
  public  getSpecifiedProduct(marque: string , type: string){
     let opts : { params : HttpParams};
     opts = { params : new HttpParams({fromString: 'marque='+marque+'&type='+type})};
     return this.http.get<Produit[]>(this.UrlgetRef,opts);
  }

  constructor(private http: HttpClient) { }
}
