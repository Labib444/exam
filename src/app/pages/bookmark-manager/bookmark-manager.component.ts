import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBookmarkModalComponent } from 'src/app/shared/create-bookmark-modal/create-bookmark-modal.component';

import { BookmarkServiceService } from 'src/app/services/bookmark-service.service';
@Component({
  selector: 'app-bookmark-manager',
  templateUrl: './bookmark-manager.component.html',
  styleUrls: ['./bookmark-manager.component.css']
})
export class BookmarkManagerComponent {

  bookmarks: any[] = [];
  categories: any[] = [];
  selectedBookmark: any = {};
  

  constructor(
    private modalService: NgbModal,
    private bookmakrService: BookmarkServiceService
  ){
    
  }

  ngOnInit(): void {
    this.bookmarks = this.bookmakrService.getData();    
    this.categories = this.bookmakrService.getCategoryData();
  }

  openModal() {
		this.modalService.open(CreateBookmarkModalComponent, { size: 'xl' });
	}

  seeDetails(event: any, bookmarkData: any){
    event.preventDefault();
    this.selectedBookmark = bookmarkData;
  }

}
