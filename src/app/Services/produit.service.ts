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
  private UrlTransfert = 'http://localhost:8080/transfert/getAllTrans';
  private UrlBoutique = 'http://localhost:8080/Boutique/GetAllBoutiques';
  private UrlgetRef= 'http://localhost:8080/Produit/getRefProd';
  private UrlSaveTrans = 'http://localhost:8080/transfert/SaveTrans';
  private UrlLocation = 'https://www.mapquestapi.com/directions/v2/route?key=7px1Em8h2JvhCDongWAiIGLgQefXi9KF';

  public recupererProduit() {
    return  this.http.get<Produit[]>(this.UrlProduit);
  }
  public recupererTransfert(){
    return this.http.get<Transfert[]>(this.UrlTransfert);
  }
  public SaveTransfert(T:Transfert):Observable<Transfert> {
    return this.http.post<Transfert>(this.UrlSaveTrans,T);
  }
  public recupererBoutique(){
    return this.http.get<Boutique[]>(this.UrlBoutique);
  }
  public  getSpecifiedProduct(marque: string , type: string){
     let opts : { params : HttpParams};
     opts = { params : new HttpParams({fromString: 'marque='+marque+'&type='+type})};
     return this.http.get<Produit[]>(this.UrlgetRef,opts);
  }
  public Location(Body: string){
    return this.http.post(this.UrlLocation, Body);
  }
  constructor(private http: HttpClient) { }
}
