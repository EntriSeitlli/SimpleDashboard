import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent {

  responsiveCol: number = 1;
  pieChartData: any[] = [];
  barChartData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.responsiveCol = (window.innerWidth <= 600) ? 1 : 2;
    this.initData();
    this.createChart();
  }

  handleSize(event: Event) {
    if (event.target instanceof Window) {
      this.responsiveCol = (event.target.innerWidth <= 600) ? 1 : 2;
    }
  }

  createChart(): void {

    // stacked bar chart
    const stackedBarCanvas: any = document.getElementById('stackedBarChart');
    const stackedBarCtx = stackedBarCanvas.getContext('2d');

    new Chart(stackedBarCtx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(255, 99, 132, 0.5)' // Red color
        }, {
          label: 'Dataset 2',
          data: [2, 3, 20, 5, 10],
          backgroundColor: 'rgba(54, 162, 235, 0.5)' // Blue color
        }]
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    });

    //bar chart
    const barCanvas: any = document.getElementById('barChart');
    const barCanvasCtx = barCanvas.getContext('2d');

    new Chart(barCanvasCtx, {
      type: 'bar',
      data: {
        labels: this.barChartData[0],
        datasets: [{
          label: 'GenAvgDeadTimePerBerthing',
          data: this.barChartData[1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    //line chart
    const lineCanvas: any = document.getElementById('lineChart');
    const lineCanvasCtx = lineCanvas.getContext('2d');


    new Chart(lineCanvasCtx, {
      type: 'line',
      data: {
        labels: ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'], // Sample dates
        datasets: [{
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2],
          fill: false, // Disable fill area under the line
          borderColor: 'rgba(255, 99, 132, 1)', // Line color
          borderWidth: 2 // Line width
        }]
      },
      options: {
        scales: {
          x: {
            time: {
              unit: 'day', // Set time unit to day
              displayFormats: {
                day: 'YYYY-MM-DD' // Display format for day
              }
            },
            ticks: {
              autoSkip: true, // Auto skip ticks for better readability
              maxRotation: 0, // Disable rotation of tick labels
              source: 'auto' // Auto detect tick values
            }
          },
          y: {
            beginAtZero: true // Start y-axis from zero
          }
        }
      }
    });

    //pie chart
    const pieCanvas: any = document.getElementById('pieChart');
    const pieCanvasCtx = pieCanvas.getContext('2d');

    new Chart(pieCanvasCtx, {
      type: 'pie',
      data: {
        labels: this.pieChartData[0],
        datasets: [{
          data: this.pieChartData[1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  initData(): void {
    let data: any, labels, values;

    fetch('178.18.253.143:8080/sp-api/spr_Funnel/2024-02-01%2000:00:00&2024-02-29%2000:00:00')
    .then(response => response.text())
    .then(text => console.log(text))

    //bar chart
    data = JSON.parse(`{"recordset": [
      {
        "VNAME": "KRITI SAMARIA",
        "GenAvgDeadTimePerBerthing": 5.6
      },
      {
        "VNAME": "KRITI SEA",
        "GenAvgDeadTimePerBerthing": 5.6
      },
      {
        "VNAME": "OVERSEAS SUN COAST",
        "GenAvgDeadTimePerBerthing": 5.6
      },
      {
        "VNAME": "BARBAROS HAYRETTIN V",
        "GenAvgDeadTimePerBerthing": 5.9
      },
      {
        "VNAME": "MED ANTARCTIC",
        "GenAvgDeadTimePerBerthing": 6.141666
      },
      {
        "VNAME": "HIGH DISCOVERY",
        "GenAvgDeadTimePerBerthing": 6.166666
      },
      {
        "VNAME": "SFL LION",
        "GenAvgDeadTimePerBerthing": 6.3
      },
      {
        "VNAME": "ADA",
        "GenAvgDeadTimePerBerthing": 6.4
      },
      {
        "VNAME": "KOCATEPE",
        "GenAvgDeadTimePerBerthing": 6.5
      },
      {
        "VNAME": "OVERSEAS SANTORINI",
        "GenAvgDeadTimePerBerthing": 6.9
      },
      {
        "VNAME": "VS LEIA",
        "GenAvgDeadTimePerBerthing": 7.333333
      },
      {
        "VNAME": "STENA POLARIS",
        "GenAvgDeadTimePerBerthing": 7.375
      },
      {
        "VNAME": "STELLA MARIS",
        "GenAvgDeadTimePerBerthing": 7.825
      },
      {
        "VNAME": "PLUTO MOON",
        "GenAvgDeadTimePerBerthing": 8.35
      },
      {
        "VNAME": "SEAVEN VOYAGER",
        "GenAvgDeadTimePerBerthing": 8.4
      }
    ]}`);

    labels = data.recordset.map((item: { VNAME: string; }) => item.VNAME);
    values = data.recordset.map((item: { GenAvgDeadTimePerBerthing: number; }) => item.GenAvgDeadTimePerBerthing);
    this.barChartData.push(labels);
    this.barChartData.push(values);

    //pie chart
    data = JSON.parse(`{"recordset":[{
            "SessionTime":207.716666,
            "Laytime":190.433333,
            "ConnectionTime":156.1,
            "TransferTime":146.1,
            "DeadTime":23.233333,
            "MooringTime":3.4,
            "UnmooringTime":2.533333
         }
      ]}`);

    labels = Object.keys(data.recordset[0]);
    values = Object.values(data.recordset[0]);
    this.pieChartData.push(labels);
    this.pieChartData.push(values);

  }
}
