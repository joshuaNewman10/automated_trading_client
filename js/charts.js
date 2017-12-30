function make_candlestick_chart(target_container, title, y_axis_params, x_axis_params, data) {
  var _name = 'make_candlestick_chart';

  var chart;
  var chart_data;
  var chart_tile = title
  var xAxis = x_axis_params;
  var yAxis = y_axis_params;
  var tool_tip;

  tool_tip = {'content': "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}"};
  chart_data = [{'type': 'candlestick', 'dataPoints': data, 'xValueType': 'dateTime'}];

  chart = new CanvasJS.Chart(target_container, 
    {
      'zoomEnabled': true,
      'title': chart_tile,
      'exportEnabled': true,
      'axisY': yAxis,
      'axisX': xAxis,
      'toolTop': tool_tip,
      data: chart_data
    }
  );

  return chart;
}


function format_chart_meta_data(chart_id, chart) {
  var _name = 'format_chart_meta_data';

  var chart_data;
  var granularity;
  var num_candles;
  var instrument; 
  var start_date; 
  var end_date;

  start_date = chart['start_date'];
  end_date = chart['end_date'];
  granularity = chart['granularity'];
  instrument = chart['instrument'];
  num_candles = chart['num_candles'];

  chart_data = $('<ul><li>Chart Id: ' + chart_id + '</li>'
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
  var _name = 'get_chart_meta_info';

  var logger = window.globals.logger;

  var chart_meta_container = $('#chartMeta');
  var charts;
  var chart;
  var formatted_chart;
  var formatted_chart_data;
  var get_charts = ApiMethods.get_charts_meta_info;
  var num_charts;

  get_charts(function(response_data){
    charts = response_data.charts;
    num_charts = Object.keys(charts).length;

    logger.info('Found ' + num_charts + ' charts', _name, '');

    for (var chart_id in charts) {
      chart = charts[chart_id];
      logger.info('Loading Raw Chart With Id ' + chart_id, _name,  chart);

      formatted_chart_data = format_chart_meta_data(chart_id, chart);
      formatted_chart = formatted_chart_data['chart'];

      logger.info('Formatted Chart With Id ' + chart_id, _name,  formatted_chart);

      formatted_chart.appendTo(chart_meta_container)
      $('#' + chart_id).on('click', function() {
        get_requested_candle_data(chart_id);
      });
    }

  });
}
