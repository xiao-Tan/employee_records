import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get('/records');
  }

  getDataForPage(page: any){
    console.log('/records/' + page)
    return this._http.get('/records/' + page);
  }

  getbyname(name:any){
    return this._http.get('/records/name/' + name);
  }

  getbyaddr(addr:any){
    return this._http.get('/records/address/' + addr);
  }

}

