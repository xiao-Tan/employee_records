import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export interface MyPagination {
  itemsCount: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  public pagesArray: Array<number> = [];
  public currentPage: number = 1;

  @Input() set setPagination(pagination: MyPagination) {
    if (pagination) {
      const pagesAmount = Math.ceil(
        pagination.itemsCount / pagination.pageSize
      );
      console.log(pagination.pageSize)
      console.log(pagination.itemsCount)
      this.pagesArray = new Array(pagesAmount).fill(1);
    }
  }
  @Output() goToPage = new EventEmitter<number>();
  public setPage(pageNumber: number): void {
    if (pageNumber === this.currentPage)
      return;
    this.currentPage = pageNumber;
    this.goToPage.emit(pageNumber);
  }
}
