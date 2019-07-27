import { GadgetService } from './gadget.service';
import { Component, OnInit, NgZone, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  events = [];
  opened: boolean;
  defaultOpened: boolean ;
  public innerWidth: any;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;


  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // this.sidenav.open();  // Viewchild 必須在此事件才有用。
    this.innerWidth = window.innerWidth;
    this.decideSidenavOpen();
  }

  // 持續聆聽事件
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.decideSidenavOpen();
  }

  decideSidenavOpen() {
    console.log(this.innerWidth);
    this.defaultOpened = (this.innerWidth > 599);
    this.sidenav.mode = (this.defaultOpened ? 'side' : 'over');
    this.sidenav.opened = this.defaultOpened ;
  }

  decideToggle() {
    if (!this.defaultOpened) {
      console.log("toggle ~");
      this.sidenav.toggle();
    }
  }

  decideClose() {
    if (!this.defaultOpened) {
      console.log("close ~");
      this.sidenav.close();
    }
  }

}
