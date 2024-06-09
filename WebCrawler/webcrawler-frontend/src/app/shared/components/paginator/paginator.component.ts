import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit{

  //#region Properties

  public currentPage: number = 1;

  public totalPages: number = 1;

  //#endregion Properties

  //#region Inputs

  @Input('currentPageInput')
  public set currentPageInput(value: number) {
    this.currentPage = value;
  }

  @Input('totalPagesInput')
  public set totalPagesInput(value: number) {
    this.totalPages = value;
  }

  //#endregion Inputs

  //#region Getters

  public get isToFirstPageDisabled(): boolean {
    return this.currentPage == 1 || this.currentPage == 2;
  }

  public get isPreviousPageDisabled(): boolean {
    return this.currentPage == 1;
  }

  public get isToLastPageDisabled(): boolean {
    return this.currentPage == this.totalPages || this.currentPage == this.totalPages - 1;
  }

  public get isNextPageDisabled(): boolean {
    return this.currentPage == this.totalPages;
  }

  //#endregion Getters

  //#region Events

  @Output()
  public pageChange: EventEmitter<number> = new EventEmitter<number>();

  //#region Constructor

  constructor() { }

  //#endregion Constructor

  //#region Angular Lifecycle Hooks

  ngOnInit(): void {
    console.log('PaginatorComponent');
  }

  //#endregion Angular Lifecycle Hooks

  //#region Methods

  public onFirstPage(): void {
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }

  public onLastPage(): void {
    this.currentPage = this.totalPages;
    this.pageChange.emit(this.currentPage);
  }

  public onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.pageChange.emit(this.currentPage);
  }

  public onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }

    this.pageChange.emit(this.currentPage);
  }

  //#endregion Methods

}
