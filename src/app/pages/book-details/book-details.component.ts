import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  
    data: any[] = [];
     
     constructor(private http:HttpClient){}
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
    ngOnInit(): void {
      this.fetchDataFromServer();  
     }
}
