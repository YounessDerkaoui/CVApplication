import {Component, OnInit} from '@angular/core';
import {ApexChart, ApexNonAxisChartSeries} from "ng-apexcharts";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit{

  chartSeries: ApexNonAxisChartSeries = [40,32,15];
  chartDetails: ApexChart = {
    type: "pie",
    toolbar: {
      show: true
    },
  };


  ngOnInit(): void {
  }
}
