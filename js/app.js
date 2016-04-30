function make_date(raw_date) {
  return new Date(
    raw_date['year'],
    raw_date['month'],
    raw_date['day']
  )
}

function make_candle(raw_candle) {
  return [raw_candle['open'], raw_candle['high'], raw_candle['low'], raw_candle['close']];

}

function format_data(raw_data) {
  var data_points = [];

  for (var i=0; i<raw_data.length; i++) {
    var entry = raw_data[i];
    var raw_date = entry['date'];
    var raw_candle = entry['candle'];
    var data_point = {'x': make_date(raw_date), 'y': make_candle(raw_candle)};
    data_points.push(data_point);
  }
  return data_points;
}


function make_candlestick_chart(target_container, title, y_axis_params, x_axis_params, data) {
  var chart_tile = title
  var yAxis = y_axis_params;
  var xAxis = x_axis_params;
  var toolTip = {'content': "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}"};
  var chart_data = [{'type': 'candlestick', 'dataPoints': data}];

  var chart = new CanvasJS.Chart(target_container, 
    {
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

window.onload = function () {
  get_requested_candle_data();
}