import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {ProduitService} from "../../Services/produit.service";
import {InscriptionService} from "../../Services/inscription.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers :[MessageService]
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  private UserNumbers : number ;
  private ProdNumbers : number ;
  constructor(private ProduitService : ProduitService,private InscriptionService: InscriptionService,private  Msg: MessageService) { }



  ngOnInit() {

    //Need to put them in a block
    this.InscriptionService.Utilisateurs().subscribe(UserData =>{
      this.UserNumbers = UserData.length ;
    });
    /*this.ProduitService.recupererProduit().subscribe(ProdData =>{
      this.ProdNumbers = ProdData.length
    });*/
    //END OF BLOCK
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
