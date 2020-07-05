import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Produit} from '../models/produit';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Boutique} from '../models/Boutique';
import {Typeprod} from '../models/typeprod'
import {Alert} from '../models/alert';
import {boutiqueProduit} from '../models/boutiqueProduit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private UrlProduit = 'http://localhost:8080/Produit/getAllProducts';
  private UrlBoutique = 'http://localhost:8080/Boutique/GetAllBoutiques';
  private UrlgetRef = 'http://localhost:8080/Produit/getAllAboutBoutique';
  private UrlTypeProduit = 'http://localhost:8080/Produit/getType';
  private UrlAddAlert = 'http://localhost:8080/Alert/addAlert';
  private UrlGetAllerts =  'http://localhost:8080/Alert/getAllAlerts';
  private UrlgetBoutProd = 'http://localhost:8080/BoutiqueProduit/getProdBoutique';
  private UrlgetProdByRef = 'http://localhost:8080/Produit/Find';
  private UrlgetProdByMLT = 'http://localhost:8080/Produit/FindByMLT';
  private UrlgetBoutiqueById= 'http://localhost:8080/Boutique/FindBoutiqueById';
  private UrlGetDescriptionbyType='http://localhost:8080/Produit/FindDesc';
  private UrlUpdateBoutiqueProduit = 'http://localhost:8080/BoutiqueProduit/updateBoutiqueProduit';

  public UpdateBoutiqueProduitStock(Qte:any,idbou:any,refprod:any){
    let opts : {params : HttpParams};
    opts = {params : new HttpParams({fromString:'nbr='+Qte+'&idbou='+idbou+'&refprod'+refprod})};
    return this.http.post(this.UrlUpdateBoutiqueProduit,opts)
  }



  public recupererProduit() {
    return  this.http.get<Produit[]>(this.UrlProduit);
  }
  public recupererBoutiqueProduit():Observable<any>{
    return this.http.get<any[]>(this.UrlgetBoutProd);
  }
  public getType(){
    return this.http.get<Typeprod[]>(this.UrlTypeProduit);
  }
  public getDescriptionByType(type:number){
    let opts : { params : HttpParams};
    opts = { params : new HttpParams({fromString: 'type='+type})};
    return this.http.get<any>(this.UrlGetDescriptionbyType,opts)
  }
  public recupererAlert(){
    return this.http.get<Alert[]>(this.UrlGetAllerts);
  }
  public saveAlert(T:Alert):Observable<Alert>{
  return this.http.post<Alert>(this.UrlAddAlert,T);
  }
  public recupererBoutique(){
    return this.http.get<Boutique[]>(this.UrlBoutique);
  }
  //=========================================

  public  getSpecifiedProduct(idbou:number){
     let opts : { params : HttpParams};
     opts = { params : new HttpParams({fromString: 'idbou='+idbou})};
     return this.http.get<any[]>(this.UrlgetRef,opts);
  }
  public getBoutiqueById(idbou:number){
    let opts: { params : HttpParams};
    opts = {params : new HttpParams({fromString:'idbou='+idbou})};
    return this.http.get<Boutique>(this.UrlgetBoutiqueById,opts);
  }
  public getProdByRef(ref:number){
    let opts : { params : HttpParams};
    opts = { params : new HttpParams({fromString: 'Ref='+ref})};
    return this.http.get<Produit>(this.UrlgetProdByRef,opts);
  }
  public getProdByMLT(libelle:string,marque:string,type:number){
    let opts : { params : HttpParams};
    opts = { params : new HttpParams({fromString:'marque='+marque+'&type='+type+'&libelle='+libelle})};
    return this.http.get<Produit[]>(this.UrlgetProdByMLT,opts)
  }

  constructor(private http: HttpClient) { }
}
