import { Component, OnInit } from '@angular/core';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-coursier-layout',
  templateUrl: './coursier-layout.component.html',
  styleUrls: ['./coursier-layout.component.css']
})
export class CoursierLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
