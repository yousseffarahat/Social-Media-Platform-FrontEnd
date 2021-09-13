import {Sort} from "./sort";

export class Pageable {
  sort: Sort;
  offset: string;
  pageSize: string;
  pageNumber: string;
  paged: string;
  unpaged: string;

  constructor(sort: Sort, offset: string, pageSize: string, pageNumber: string, paged: string, unpaged: string) {
    this.sort = sort;
    this.offset = offset;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.paged = paged;
    this.unpaged = unpaged;
  }
}
