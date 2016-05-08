function make_candlestick_chart(target_container, title, y_axis_params, x_axis_params, data) {
  var chart_tile = title
  var yAxis = y_axis_params;
  var xAxis = x_axis_params;
  var toolTip = {'content': "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}"};
  var chart_data = [{'type': 'candlestick', 'dataPoints': data}];

  var chart = new CanvasJS.Chart(target_container, 
    {
      'zoomEnabled': true,
      'title': chart_tile,
      'exportEnabled': true,
      'axisY': yAxis,
      'axisX': xAxis,
      'toolTop': toolTip,
      data: chart_data
   }
  );
  return chart;
}