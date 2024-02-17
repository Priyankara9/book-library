import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  public countryCode:string="+357";
  public selectedCountry:any;
  public countries:any;
  private http:HttpClient;
  setCountryCode() :void{
    this.countryCode=this.selectedCountry.idd.root+this.selectedCountry.idd.suffixes;
  }

  constructor( http:HttpClient){
    this.http=http;
  }
  ngOnInit(): void {
    this.loadCountries();
  }
  loadCountries():void {

    this.http.get(`https://restcountries.com/v3.1/all`).subscribe(
      (response)=>{
        this.countries=response;
      },
      (error)=>{
        console.error('Error fetching data:', error);
      }
    )
    
    }
    setSelectedCountry(event:Event):void{
      const selectedValue=(event.target as HTMLSelectElement).value;
      
      this.selectedCountry = this.countries.find((country: { name: { common: string; }; }) => country.name.common === selectedValue);
  
    }

    
  }
 

  


