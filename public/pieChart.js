var PieChart = function(title, data) {

  var container = document.getElementById("graph");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: { 
      text: title 
    },
    series: [
      {
        data: data
      }
    ]
  });

};