import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transfert} from '../models/Transfert';
import {Observable} from 'rxjs';
import {Transfertboutique} from '../models/transfertboutique';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {
  private UrlTransfert = 'http://localhost:8080/transfert/getAllTrans';
  private UrlSaveTrans = 'http://localhost:8080/transfert/SaveTrans';
  private UrlLocation = 'https://www.mapquestapi.com/directions/v2/route?key=7px1Em8h2JvhCDongWAiIGLgQefXi9KF';
  private UrlSaveTransfertBoutique = 'http://localhost:8080/transfertboutique/SaveTransfertBoutique';
  // don't forget to complete me please :(
  private UrlGetTransfertByCoursier = 'http://localhost:8080/Transfert/getTransfertByCoursier';


  constructor(private http: HttpClient) { }
  public SaveTransfert(T:Transfert):Observable<Transfert> {
    return this.http.post<Transfert>(this.UrlSaveTrans,T);
  }
  public SaveTransfertBoutique(T:Transfertboutique):Observable<Transfertboutique>{
    return this.http.post<Transfertboutique>(this.UrlSaveTransfertBoutique,T);
  }
  public recupererTransfert(){
    return this.http.get<Transfert[]>(this.UrlTransfert);
  }
  public Location(Body: string){
    return this.http.post(this.UrlLocation, Body);
  }
  public getTransfertByCoursier(userName: string){
    let opts : { params : HttpParams};
    opts = {params : new HttpParams({fromString:`username=${userName}`})};
    return this.http.get<Transfert>(this.UrlGetTransfertByCoursier,opts);
  }
}
