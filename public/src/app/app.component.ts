import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Records';
  //records: any;
  public users: any;
  public totalUsersAmount: number = 0;
  private _currentPage: number = 1;
  search_name: any
  search_type: any

  constructor(private _httpService: HttpService) { }

  ngOnInit(){
    this._httpService.getAll()
      .subscribe(data => {
        this.totalUsersAmount = data['result'].length;
        console.log(this.totalUsersAmount)
      })
    this.goToPage(1);
  }

  // getAllRec(){
  //   this._httpService.getAll()
  //     .subscribe(data => {
  //       this.users = data['result']
  //       this.totalUsersAmount = data['result'].length;
  //       console.log(this.totalUsersAmount)
  //     })
  // }

  public goToPage(page: number): void {
    this._currentPage = page;
    this._loadUsers(this._currentPage);
  }

  private _loadUsers(page: number = 1) {
    console.log("Curr Page" + page)
    this._httpService.getDataForPage(page)
      .subscribe(data => {
        this.users = data['result']
      }) 
  }

  onSubmit() {
    console.log("I am in")
    console.log(this.search_type)
    console.log(this.search_name)
    if (this.search_type == "Name"){
      this._httpService.getbyname(this.search_name)
      .subscribe(data => {
        this.users = data['result']
        console.log(this.users)
      })
    }
    if (this.search_type == "Address"){
      this._httpService.getbyaddr(this.search_name)
      .subscribe(data => {
        this.users = data['result']
        console.log(this.users)
      })
    }
  }
}
