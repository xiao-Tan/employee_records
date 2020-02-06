import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';

export interface MyPagination {
  itemsCount: number;
  pageSize: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Records';
  records: any
  constructor(private _httpService: HttpService) { }

  ngOnInit(){
    this.getAllRec();
  }

  getAllRec(){
    this._httpService.getAll()
      .subscribe(data => {
        this.records = data['result']
      })
  }
}
