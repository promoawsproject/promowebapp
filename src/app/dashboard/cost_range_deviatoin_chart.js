var showCostRangeDeviationChart = function (container, categories, deviation, callback) {


  Highcharts.chart(container, {

    chart: {
      type: 'columnrange',
      // inverted: true
    },

    title: {
      text: ''
    },

    subtitle: {
      text: ''
    },

    xAxis: {
      categories: categories
    },

    yAxis: {
      labels: {
        format: '{value}%',
        style: {

          fontWeight: 'bold'
        }
      },
      title: {
        text: 'Cost Deviation Range',
        style: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      }
    },

    tooltip: {
      // headerFormat: '<b>{point.x}</b>',
      // pointFormat: ': {y}'+'%'
      // valueSuffix: '%'
    },

    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
          format: '{y}%'
        }
      },
      series: {
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

    legend: {
      enabled: false
    },

    series: [{
      name: '',
      data: deviation,
      color: 'lightgrey'
    }]

  });

}
