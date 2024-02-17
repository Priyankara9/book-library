import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
interface Book{
  id:number;
  isbn:string;
  title:string;
  author:string;
  category:string;
  qty:number;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})


export class BookDetailsComponent implements OnInit{

data: Book[] = [];
isupdated: boolean=false;
constructor(private http:HttpClient){}

bookToDelete :number |null=null;
isdeleted : boolean=false;
bookToUpdate: Book = {} as Book;
setBookToUpdate(book:Book):void {
    this.bookToUpdate.id=book.id;
    this.bookToUpdate.isbn=book.isbn;
    this.bookToUpdate.title=book.title;
    this.bookToUpdate.author=book.author;
    this.bookToUpdate.category=book.category;
    this.bookToUpdate.qty=book.qty;
}
setBookTodelete(id: number):void {
    this.bookToDelete=id;
    
}
clearBookTodelete():void {
  this.bookToDelete=null;
 
}
updateBook( book: Book): void {
  console.log("update book method called")
  this.http.post(`http://localhost:8080/book/update`, book).subscribe(
    (response) => {
      
     
      this.fetchDataFromServer();
      // this.bookToUpdate={} as Book;
      this.bookToUpdate.id=0;
      this.isupdated=true;
      // Handle success as needed
    },
    (error) => {
      console.error('Error updating book:', error);
      // Handle error as needed
    }
  )
}
  
    
     
     
fetchDataFromServer():void {

      this.http.get<any[]>('http://localhost:8080/book/get').subscribe(
        (response)=>{
          this.data=response;
        },
        (error)=>{
          console.error('Error fetching data:', error);
        }
      )
      
    }
    deleteBook(id:number):void {
      console.log("delete function called");
      this.http.delete(`http://localhost:8080/book/delete/${id}`).subscribe(
        (response)=>{
          this.fetchDataFromServer(); 
          this.clearBookTodelete(); 
          this.isdeleted=true;
        },
        (error)=>{
          console.error('Error fetching data:', error);
        }
      )
    }
    ngOnInit(): void {
      this.fetchDataFromServer();  
      
     }
}
