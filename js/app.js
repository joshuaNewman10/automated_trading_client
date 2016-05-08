function make_date(raw_date) {
  var date = new Date(raw_date['utc'] * 1000);
  return date
}

function make_candle(raw_candle) {
  return [raw_candle['open'], raw_candle['high'], raw_candle['low'], raw_candle['close']];

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

function get_requested_candle_data(chart_id) {
  console.log('Chart_id', chart_id)
  var get_candle_data = ApiMethods.get_candle_data;

    get_candle_data(chart_id, function(response_data) {
      console.log(response_data)
      var chart_id = response_data.chart_id;
      window.localStorage.setItem('chart_id', chart_id)
      var candle_data = response_data.candle_data;
      var title = response_data.title;
      var y_params = response_data.y_params;
      var x_params = response_data.x_params;
      var formatted_data = format_raw_candle_data(candle_data);
      var chart = make_candlestick_chart('chartContainer', title, y_params, x_params, formatted_data);
      chart.render();
  });
}

function mark_selected_candle_data(startDate, endDate, granularity, markedCandle, pattern) {
  var send_marked_candle = ApiMethods.send_marked_candle_data;
  markedCandle = format_marked_candle(markedCandle);
  send_marked_candle(startDate, endDate, granularity, markedCandle, pattern);
}

window.onload = function () {
  get_chart_meta_info();
}