import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transfert} from '../models/Transfert';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {
  private UrlTransfert = 'http://localhost:8080/transfert/getAllTrans';
  private UrlSaveTrans = 'http://localhost:8080/transfert/SaveTrans';
  private UrlLocation = 'https://www.mapquestapi.com/directions/v2/route?key=7px1Em8h2JvhCDongWAiIGLgQefXi9KF';


  constructor(private http: HttpClient) { }
  public SaveTransfert(T:Transfert):Observable<Transfert> {
    return this.http.post<Transfert>(this.UrlSaveTrans,T);
  }
  public recupererTransfert(){
    return this.http.get<Transfert[]>(this.UrlTransfert);
  }
  public Location(Body: string){
    return this.http.post(this.UrlLocation, Body);
  }
}
