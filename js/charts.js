function make_candlestick_chart(target_container, title, y_axis_params, x_axis_params, data) {
  var chart_tile = title
  var yAxis = y_axis_params;
  var xAxis = x_axis_params;
  var toolTip = {'content': "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}"};
  var chart_data = [{'type': 'candlestick', 'dataPoints': data, 'xValueType': 'dateTime'}];

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


function format_chart_meta_data(chart_id, chart) {
  var start_date = chart['start_date'];
  var end_date = chart['end_date'];
  var granularity = chart['granularity'];
  var instrument = chart['instrument'];
  var num_candles = chart['num_candles'];

  var chart_data = $('<ul><li>Chart Id: ' + chart_id + '</li>'
                 + '<li><button id=' + chart_id + '>Get Data</button>'
                 + '<li>Start Date: ' + start_date + '</li>'
                 + '<li>End Date: ' + end_date + '</li>'
                 + '<li>Granularity: ' + granularity + '</li>'
                 + '<li>Instrument: ' + instrument + '</li>'
                 + '<li>Num Candles: ' + num_candles +  '</li></ul>');

  return  {
    'chart': chart_data,
    'chart_id': chart_id
  }
}


function get_chart_meta_info() {
  get_charts = ApiMethods.get_charts_meta_info;
  get_charts(function(response_data){
    var charts = response_data.charts;
    console.log(charts);
    var num_charts = Object.keys(charts).length;
    console.log('Found ' + num_charts + ' charts' );

    var chart_meta_container = $('#chartMeta');

    for (var chart_id in charts) {
      var chart = charts[chart_id];
      console.log(chart);
      var formatted_chart_data = format_chart_meta_data(chart_id, chart);
      var formatted_chart = formatted_chart_data['chart'];
      var chart_id = formatted_chart_data['chart_id'];
      console.log(formatted_chart);
      formatted_chart.appendTo(chart_meta_container)
      $('#' + chart_id).on('click', function() {
        console.log('Called!');
        get_requested_candle_data(chart_id);
      });
    }

  });
}
