import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TestClass} from '../models/TestClass';
import {DetailsCommande} from '../models/DetailsCommande';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private ObejctSource = new BehaviorSubject(new TestClass());
  CurrentAlert = this.ObejctSource.asObservable();
  private ObjectSourceCommande = new BehaviorSubject(new DetailsCommande());
  CurrentCommande = this.ObjectSourceCommande.asObservable();
  constructor() { }
  GetObjectAlert(Alert: TestClass){
    this.ObejctSource.next(Alert);

  }
  GetObjectCommande(C: DetailsCommande){
    this.ObjectSourceCommande.next(C);
  }
}
