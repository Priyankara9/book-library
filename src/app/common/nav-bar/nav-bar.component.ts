import { Component } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  activeLink:string="";
  setActiveLink(link:string):void{
    this.activeLink=link;
  }
 

}
