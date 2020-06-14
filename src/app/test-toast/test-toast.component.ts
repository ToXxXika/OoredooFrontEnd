import { Component, OnInit } from '@angular/core';
import {MessageService,MenuItem} from "primeng/api";


@Component({
  selector: 'app-test-toast',
  templateUrl: './test-toast.component.html',
  styleUrls: ['./test-toast.component.css'],
  providers : [MessageService]
})
export class TestToastComponent implements OnInit {
  items:MenuItem[];
  constructor(private messageService: MessageService) { }
   Test(){
     this.messageService.add({key: 'Success', severity: 'success', summary: ':D', detail:'Utilisateur Ajouté'});
   }
  ngOnInit(): void {
    this.items = [{
      label: 'File',
      items: [
        {label: 'New', icon: 'pi pi-fw pi-plus'},
        {label: 'Download', icon: 'pi pi-fw pi-download'}
      ],

    },
      {
        label: 'Edit',
        items: [
          {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
          {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}
        ]
      }];
  }

}
