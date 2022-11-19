import { Injectable } from '@angular/core';

interface IBookmarkModel{
  title: string;
  url: string;
  category: string;
}

class BookMarkModel implements IBookmarkModel{
  title: string = '';
  url: string = '';
  category: string = '';
}

interface ICategory{
  category: string;
  bookmarks: IBookmarkModel[];
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkServiceService {

  CAT = 'categories';
  BOOK = 'bookmarks';

  private bookmarks: IBookmarkModel[] = [
    {
      title: 'Java (dummy data)',
      url: 'java.com',
      category: 'Java'
    },
    {
      title: 'python (dummy data)',
      url: 'python.com',
      category: 'Python'
    },
    {
      title: 'C# (dummy data)',
      url: 'csharp.com',
      category: 'C#'
    }
  ]; 

  private categories: ICategory[] = [
    {
      category: this.bookmarks[0].category,
      bookmarks: this.bookmarks.filter( (x) => x.category == this.bookmarks[0].category )
    },
    {
      category: this.bookmarks[1].category,
      bookmarks: this.bookmarks.filter( (x) => x.category == this.bookmarks[1].category )
    },
    {
      category: this.bookmarks[2].category,
      bookmarks: this.bookmarks.filter( (x) => x.category == this.bookmarks[2].category )
    }
  ];
  constructor() { }

  setData(data: any){
    this.bookmarks.push(data);
  }

  getData(){
    return this.bookmarks;
  }

  getCategoryData(){
    return this.categories;
  }

  setCategoryData(data: IBookmarkModel){
    if( this.categories.filter( (x) => x.category == data.category ).length != 0 ){
      var index = this.categories.findIndex( (x) => x.category == data.category );
      this.categories[index].bookmarks.push(data);
    }else{
      var newData = {
        category: data.category,
        bookmarks: [data]
      }
      this.categories.push(newData);
    }
    console.log(this.categories)
    //localStorage.setItem(this.CAT, JSON.stringify(this.categories));
  }

}
