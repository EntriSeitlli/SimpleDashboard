import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent {

  responsiveCol: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.responsiveCol = (window.innerWidth <= 850) ? 1 : 2;
    this.createChart();
  }

  handleSize(event: Event) {
    if (event.target instanceof Window) {
      this.responsiveCol = (event.target.innerWidth <= 850) ? 1 : 2;
    }
  }

  createChart(): void {

    // stacked bar chart
    const stackedBarCanvas: any = document.getElementById('stackedBarChart');
    const stackedBarCtx = stackedBarCanvas.getContext('2d');

    // provide url for data doesnt work
    new Chart(stackedBarCtx, {
      type: 'bar',
      data: {
        labels: ['age<18', '18>age<24', '24>age<32', '32>age<45', '45>age'],
        datasets: [{
          label: 'Count',
          data: [62, 174, 165, 142, 87],
          backgroundColor: 'rgba(255, 99, 132, 0.5)' // Red color
        }, {
          label: 'Deaths',
          data: [45, 122, 140, 98, 75],
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

    fetch('http://178.18.253.143:8080/sp-api/spr_TopXVesselsDeadTime/15')
      .then(response => response.json())
      .then(jsonData => {
        new Chart(barCanvasCtx, {
          type: 'bar',
          data: {
            labels: jsonData.recordset.map((item: { VNAME: string; }) => item.VNAME),
            datasets: [{
              label: 'GenAvgDeadTimePerBerthing',
              data: jsonData.recordset.map((item: { GenAvgDeadTimePerBerthing: number; }) => item.GenAvgDeadTimePerBerthing),
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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    //line chart
    const lineCanvas: any = document.getElementById('lineChart');
    const lineCanvasCtx = lineCanvas.getContext('2d');


    // provide url for data doesnt work
    new Chart(lineCanvasCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Sample dates
        datasets: [{
          label: '2002',
          data: [54951, 51826, 53561, 53264, 56071, 55027, 57754, 56773, 57035, 55169, 54054, 54754],
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            min: 45000,
            max: 65000
          }
        }
      }
    });

    //pie chart
    const pieCanvas: any = document.getElementById('pieChart');
    const pieCanvasCtx = pieCanvas.getContext('2d');

    fetch('http://178.18.253.143:8080/sp-api/spr_Funnel/2024-02-01%2000:00:00&2024-02-29%2000:%20%2000:00')
      .then(response => response.json())
      .then(jsonData => {
        new Chart(pieCanvasCtx, {
          type: 'pie',
          data: {
            labels: Object.keys(jsonData.recordset[0]),
            datasets: [{
              data: Object.values(jsonData.recordset[0]),
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

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
