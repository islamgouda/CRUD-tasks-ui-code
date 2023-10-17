import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTo';
import { Observable } from 'rxjs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  Login(model:Login):Observable<any>{
    console.log("---")
    console.log(model);
    return this.http.post(environment.baseApi+"/auth/login",model);
  }
}
