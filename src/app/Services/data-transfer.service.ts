import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Alert} from '../models/alert';
import {TestClass} from '../models/TestClass';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private ObejctSource = new BehaviorSubject(new TestClass());
  CurrentAlert = this.ObejctSource.asObservable();

  constructor() { }
  GetObjectAlert(Alert: TestClass){
    console.log(Alert);
    this.ObejctSource.next(Alert);

  }
}
