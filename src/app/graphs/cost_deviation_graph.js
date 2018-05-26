var showCostDeviationBarGraph = function (container, categories, deviation, callback) {


  Highcharts.chart(container, {
    credits: {
      enabled: false
    },
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: categories,
      labels: {

        style: {

          fontWeight: 'bold'
        }
      },
    },
    yAxis: {
      labels: {
        format: '{value}%',
        style: {

          fontWeight: 'bold'
        }
      },
      min: 0,
      //    max: 100,
      title: {
        text: 'Cost Deviation',
        style: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      }
    },
    legend: {
      enabled: false,
      align: 'right',
      // x: -30,
      verticalAlign: 'top',
      // y: 25,
      //  floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 0,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b>',
      pointFormat: ': {point.y}' + '%' /*<br/>Total: {point.stackTotal}'*/
    },
    plotOptions: {
      column: {
        stacking: 'normal',

      },
      column: {
        //      colorByPoint: true,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Highcharts.numberFormat(this.y, 0) + '%';
          },
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
        }
      },
      series:{
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              callback(categories[this.index]);
            }
          }
        }
      }
      
    },

    colors: [
      'blue',
      'green',
      'orange',
      'brown'
    ],

    series: [{
      name: '',
      data: deviation,
      color: 'lightgrey'
    }]
  });
}
