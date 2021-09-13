import {Pageable} from "./pageable";
import {Sort} from "./sort";
import {Post} from "./Post";

export class Page {
  content: [Post];
  pageable: Pageable;
  last: string;
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  sort: Sort;
  first: string;
  numberOfElements: number;
  empty: string;

  constructor(content: [Post], pageable: Pageable, last: string, totalPages: number, totalElements: number, number: number, size: number, sort: Sort, first: string, numberOfElements: number, empty: string) {
    this.content = content;
    this.pageable = pageable;
    this.last = last;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.number = number;
    this.size = size;
    this.sort = sort;
    this.first = first;
    this.numberOfElements = numberOfElements;
    this.empty = empty;
  }
}
