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

  ngOnInit(): void {
    let map = new google.maps.Map(document.getElementById("map"))

  }

}
