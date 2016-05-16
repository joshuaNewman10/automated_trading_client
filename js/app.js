function make_candle(raw_candle) {
  return [raw_candle['open'], raw_candle['high'], raw_candle['low'], raw_candle['close']];

}


function prepare_marked_candle_data() {
  var DEFAULT_PATTERN = 'yes';
  var switchValue = $('#myonoffswitch').is(':checked');
  if (switchValue === false) {
    return
  }
  var mark_candles = ApiMethods.mark_candle_data;
  var target_candle = ($('.canvasjs-chart-tooltip').find('div').text());
  var pattern = $('#patternBox').val();
  if (pattern === '' || pattern === undefined) {
    pattern = DEFAULT_PATTERN;
  }
  mark_selected_candle_data(target_candle, pattern);
}


function mark_selected_candle_data(markedCandle, pattern) {
  var EST_PST_HOURS_OFFSET = -8;
  var send_marked_candle = ApiMethods.send_marked_candle_data;
  var markedCandle = format_marked_candle(markedCandle);
  var chart_id = window.localStorage.getItem('chart_id');
  send_marked_candle(chart_id, EST_PST_HOURS_OFFSET, markedCandle, pattern);
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


function get_pattern_candles() {
  var get_marked_candles = ApiMethods.get_marked_candles;
  get_marked_candles(function(response_data) {
    var candle_data = response_data.candle_data;
    var pattern = response_data.pattern;
    var title = title = 'Validating Pattern ' + pattern;
    var y_params = response_data.y_params;
    var x_params = response_data.x_params;
    var formatted_data = format_raw_candle_data(candle_data);
    var chart = make_candlestick_chart('validateChartContainer', title, y_params, x_params, formatted_data);
  });
}


function register_event_listeners() {
  $('#chartContainer').on('click', prepare_marked_candle_data)
}


window.onload = function () {
  get_chart_meta_info();
  register_event_listeners();
}