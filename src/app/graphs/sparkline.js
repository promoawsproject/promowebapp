var showTrends = function (containerId) {
  $(function () {
    /*Highcharts.setOptions({ // This is for all plots, change Date axis to local timezone
        global: {
            useUTC: false
        }
    });*/

    Highcharts.setOptions({
      chart: {
        margin: [0, 0, 0, 0],
        style: {
          overflow: 'visible'
        }
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickLength: 0
      },
      yAxis: {
        title: {
          text: null
        },
        maxPadding: 0,
        minPadding: 0,
        gridLineWidth: 0,
        ticks: false,
        endOnTick: false,
        labels: {
          enabled: false
        },
        min: 0,
        max: 10
      },
      tooltip: {
        formatter: function () {
          if (this.point.date == undefined) {
            return '<b>' + this.series.name + '</b><br/>' + this.point.status;
          } else {
            return '<b>' + this.series.name + '</b><br/>' + this.point.date + " - " + this.point.status;
          }
        },
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        hideDelay: 0,
        padding: 0,
        positioner: function (w, h, point) {
          return {
            x: point.plotX - w / 2,
            y: point.plotY - h
          };
        }
      },
      plotOptions: {
        series: {
          enableMouseTracking: true,
          lineWidth: 1,
          shadow: false,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          marker: {
            radius: 2
          }
        }
      }
    });



    var table2 = new Highcharts.Chart({
      chart: {
        renderTo: containerId,
      },
      series: [{
        fillColor: 'rgba(124, 181, 236, 0.3)',
        type: 'area',
        name: 'Redness',
        data: [{
          x: 0,
          y: 5,
          status: "Baseline"
        }, {
          x: 2,
          y: 6,
          status: "Getting Better",
          date: "3/20/2015"
        }, {
          x: 3,
          y: 6,
          status: "Staying the Same",
          date: "3/31/2015"
        }, {
          x: 4,
          y: 6,
          status: "Stayng the Same",
          date: "4/1/2015"
        }, {
          x: 5,
          y: 7,
          status: "Getting Better",
          date: "4/1/2015"
        }, {
          x: 6,
          y: 8,
          status: "Getting Better",
          date: "4/2/2015"
        }]
      }]
    });


    var i = 0;
    $('.latest-icon').hover(function () {
      var chartName = $(this).parent('td').next().find('div').attr("id");
      var chart = $('#' + chartName).highcharts();
      var lastPt = chart.series[0].data.length - 1;
      chart.series[0].data[lastPt].setState('hover');
      chart.tooltip.refresh(chart.series[0].data[lastPt]);
    }, function () {
      var chartName = $(this).parent('td').next().find('div').attr("id");
      var chart = $('#' + chartName).highcharts();
      var lastPt = chart.series[0].data.length - 1;
      chart.series[0].data[lastPt].setState();
      chart.tooltip.hide();
      /*
      if (i > 0) {
          table1.series[0].data[i-1].setState();
          table1.tooltip.hide();
      }
      if (i == table1.series[0].data.length) {
          i = 0;
      }
      table1.series[0].data[i].setState('hover');
      table1.tooltip.refresh(table1.series[0].data[i]);
      i++;
      */
    });

  });
}
