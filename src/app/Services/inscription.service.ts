import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Personne} from '../models/personne';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private  urlConnect = 'http://localhost:8080/users/addUser';
  private  VerifUser = 'http://localhost:8080/users/login';
  private  getUsers = 'http://localhost:8080/users/getAllUsers';
  private getSpecifiedUser = 'http://localhost:8080/users/getUserByUserName';
  private getUserByrole= 'http://localhost:8080/users/GetUsersByRole';
  private getUserRole = 'http://localhost:8080/users/getUserRole';
  private getCourser = 'http://localhost:8080/users/getCoursier';
  private UpdateCoursier = 'http://localhost:8080/users/updateUser';
  private UrlDeleteUserByCin = 'http://localhost:8080/users/deleteByCin';
  private Result : boolean ;

  constructor(
    private http: HttpClient,
  ) {}
  public deleteUser(cin:string){
    let opts : {params : HttpParams}
    opts = {params : new HttpParams({fromString:'cin='+cin})};
    return this.http.get(this.UrlDeleteUserByCin,opts);
  }

  public UpdateCoursierStatus(cin:any,dispo:any){
    let opts: {params : HttpParams}
    opts = {params: new HttpParams({fromString: 'cin='+cin+'&dispo='+dispo})};
    return this.http.get(this.UpdateCoursier,opts);

  }
  public CreerUtilisateur(personne: Personne): Observable<Personne> {
    return this.http.post<Personne>(this.urlConnect, personne);
  }
 //this function is used to get a Specified Logged on User and Pass his Name + Surname To the next page of our website
  public GetUserName(username: string) {
    let opts: { params: HttpParams };
    opts = {params: new HttpParams({fromString: `username=${username}`})};
    return this.http.get<any>(this.getSpecifiedUser, opts);
  }
  //cette fonction est utilisée pour récuperer tous les coursiers enregistrés dans la base de données
  public getCoursier(){
    return this.http.get<any>(this.getCourser);
  }
  public GetUserRole(username: string){
    let opts : { params : HttpParams};
    opts ={ params: new HttpParams({fromString:`username=${username}`})};
    return this.http.get<Personne>(this.getUserRole,opts);
  }
  public GetUserByRole(){
    return this.http.get<Personne[]>(this.getUserByrole);
  }
  //this function is used to Login with Crypt ( Basic Authentication in the backend)
 public login(username: string , password: string ) {
    console.log(username);
    console.log(password);

    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
   return this.http.get<any>(this.VerifUser, {headers})};

 public Utilisateurs(){
    return this.http.get<Personne[]>(this.getUsers);
 }

}
