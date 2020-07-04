import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../Services/produit.service';

@Component({
  selector: 'app-coursier',
  templateUrl: './coursier.component.html',
  styleUrls: ['./coursier.component.css']
})
export class CoursierComponent implements OnInit {

  constructor(private ProdService: ProduitService) { }

  ngOnInit(): void {
  }

  getTransfertByCouriser(){

  }
}
