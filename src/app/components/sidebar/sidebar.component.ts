import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de Board',  icon: 'ni-tv-2 text-primary',class: '' },
    { path:'/Transfert', title: 'Gestion de Transfert', icon: 'ni-tv-2 text-primary', class:''},
  { path: '/register', title: 'Gestion des utilisateurs', icon:'ni-single-02 text-yellow', class:''},
    { path: '/user-profile', title: 'Profile Utilisateur',  icon:'ni-single-02 text-yellow', class: '' },


];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
