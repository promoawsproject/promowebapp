var showCostChart = function(container) {
  // Radialize the colors
  Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
      return {
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7
        },
        stops: [
          [0, color],
          [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
        ]
      };
    })
  });

  // Build the chart
  Highcharts.chart(container, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Actual Cost'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          /*  format: '<b>{point.name}</b>: {point.percentage:.1f} %',*/

          format: '{point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          },
          connectorColor: 'silver'
        }
      }
    },
    series: [{
      name: 'Share',
      data: [{
          name: 'Pre Production',
          y: 1.1
        },
        {
          name: 'Talents / Supporting Cast',
          y: 13.4
        },
        {
          name: 'Crew',
          y: 21.7
        },
        {
          name: 'Technical Equipment',
          y: 4.7
        },
        {
          name: 'Studio And Locations',
          y: 7.9
        },
        {
          name: 'Art, Props, Wardrobe, Make-Up',
          y: 11.1
        },
        {
          name: 'Transportation',
          y: 2.8
        },
        {
          name: 'Catering',
          y: 2.8
        },
        {
          name: 'Hotels, Travels, Perdiems',
          y: 1.2
        },
        {
          name: 'Film Stock, Laboratory, Telecine',
          y: 0.2
        },
        {
          name: 'Post Production',
          y: 31.2
        },
        {
          name: 'Insurances, Permits, Miscellaneous',
          y: 2.0
        }
      ]
    }]
  });
}
