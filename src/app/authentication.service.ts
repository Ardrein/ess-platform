import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { 
  }

  private route = '';
  

  login(username: String, password: String){

  }

}
