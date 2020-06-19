import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Produit} from '../models/produit';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Boutique} from '../models/Boutique';
import {Typeprod} from '../models/typeprod'
import {Alert} from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private UrlProduit = 'http://localhost:8080/Produit/getAllProducts';
  private UrlBoutique = 'http://localhost:8080/Boutique/GetAllBoutiques';
  private UrlgetRef = 'http://localhost:8080/Produit/getRefProd';
  private UrlTypeProduit = 'http://localhost:8080/Produit/getType';
  private UrlAddAlert = 'http://localhost:8080/Alert/addAlert';


  public recupererProduit() {
    return  this.http.get<Produit[]>(this.UrlProduit);
  }
  public recupererBoutiqueProduit(){

  }
  public getType(){
    return this.http.get<Typeprod[]>(this.UrlTypeProduit);
  }

  public saveAlert(T:Alert){
    return this.http.post(this.UrlAddAlert,T);
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
