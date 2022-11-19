import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { BookmarkServiceService } from 'src/app/services/bookmark-service.service';

@Component({
  selector: 'app-create-bookmark-modal',
  templateUrl: './create-bookmark-modal.component.html',
  styleUrls: ['./create-bookmark-modal.component.css']
})
export class CreateBookmarkModalComponent implements OnInit {
  closeResult: string = '';
  newCategoryFlag: boolean = false;
  bookmarkForm: FormGroup;

  existingCategories: string[] = [];
  URL_REGEXP: string = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

  constructor(
    private modalService: NgbModal,
    private bookmarkService: BookmarkServiceService
  ){
    this.bookmarkForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.bookmarkService.getData().forEach( (x) => {
      this.existingCategories.push(x.category)
    })
  }

  initializeForm(){
    this.bookmarkForm = new FormGroup({
      title: new FormControl('',[
        Validators.required,
        Validators.maxLength(30)
      ]),
      url: new FormControl('',[
        Validators.required,
        Validators.pattern(this.URL_REGEXP)
      ]),
      category: new FormControl(''),
      newCategory: new FormControl('')
    });
    return this.bookmarkForm;
  }

  openXl(content: any) {
		this.modalService.open(content, { size: 'xl' });
	}

  setFlagNewCategory(event: any){
    event.preventDefault();
    this.newCategoryFlag = true;
    this.bookmarkForm.controls['category'].disable();
  }

  unsetFlagNewCategory(event: any){
    event.preventDefault();
    this.newCategoryFlag = false;
    this.bookmarkForm.controls['category'].enable();
  }
  
  submit(event: any){
    event.preventDefault();
    console.log(this.bookmarkForm.controls['title'].valid);
    console.log(this.bookmarkForm.controls['url'].valid);
    console.log(this.bookmarkForm.controls['category'].valid);
    console.log(this.bookmarkForm.controls['newCategory'].valid);

    if( this.bookmarkForm.valid == true ){
      var data = this.getFormData();
      this.bookmarkService.setCategoryData(data);
      console.log(data);
    }else{
      alert('Invalid Input!');
    }
  }

  getFormData(){
    if( this.bookmarkForm.controls['newCategory'].value == '' ){
      var data = {
        title: this.bookmarkForm.controls['title'].value,
        url: this.bookmarkForm.controls['url'].value,
        category: this.bookmarkForm.controls['category'].value,      
      }
    }else{
      var data = {
        title: this.bookmarkForm.controls['title'].value,
        url: this.bookmarkForm.controls['url'].value,
        category: this.bookmarkForm.controls['newCategory'].value,      
      }
    }
    return data;
  }

  getBookMarkFormControls(){
    return this.bookmarkForm.controls;
  }
}
