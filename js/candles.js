function prepare_marked_candle_data() {
  var _name = 'prepare_marked_candle_data';

  var switch_id = '#myonoffswitch';
  var switch_on = ':checked'

  var marked_candles;
  var switch_value;
  var target_candle;
  var pattern;

  switch_value = $(switch_id).is(switch_on);
  if (switch_value === false) {
    return
  }

  target_candle = ($('.canvasjs-chart-tooltip').find('div').text());
  pattern = $('#patternBox').val();

  // Disallow empty patterns
  if (pattern === '' || pattern === undefined) {
    return
  }

  mark_selected_candle_data(target_candle, pattern);
}


function mark_selected_candle_data(markedCandle, pattern) {
  var _name = 'mark_selected_candle_data';

  var EST_PST_HOURS_OFFSET = -8;
  var send_marked_candle = ApiMethods.send_marked_candle_data;
  var cache = window.globals.cache;

  var cache_key = 'chart_id';
  var chart_id;
  var marked_candle;

  markedCandle = format_marked_candle(markedCandle);
  chart_id = cache.get(cache_key);

  send_marked_candle(chart_id, EST_PST_HOURS_OFFSET, markedCandle, pattern);
}


function get_requested_candle_data(chart_id) {
  var _name = 'get_requested_candle_data';

  var chart_container_name = 'chartContainer';
  var get_candle_data = ApiMethods.get_candle_data;
  var cache = window.globals.cache;
  var logger = window.globals.logger;

  var candle_data;
  var chart_id;
  var title;
  var y_params;
  var x_params;
  var formatted_data;
  var chart;


  logger.info('Chart_id', _name, chart_id)

    get_candle_data(chart_id, function(response_data) {
      chart_id = response_data.chart_id;
      cache.set('chart_id', chart_id)

      candle_data = response_data.candle_data;

      title = response_data.title;
      y_params = response_data.y_params;
      x_params = response_data.x_params;
      formatted_data = format_raw_candle_data(candle_data);

      chart = make_candlestick_chart(chart_container_name, title, y_params, x_params, formatted_data);
      chart.render();
  });
}


function get_pattern_candles() {
  var _name = 'get_pattern_candles';

  var get_marked_candles = ApiMethods.get_marked_candles;
  var validate_chart_container = 'validateChartContainer';

  var candle_data;
  var chart;
  var formatted_data;
  var pattern;
  var x_params;
  var y_params;
  var title;

  get_marked_candles(function(response_data) {
    candle_data = response_data.candle_data;
    pattern = response_data.pattern;
    title = title = 'Validating Pattern ' + pattern;
    y_params = response_data.y_params;
    x_params = response_data.x_params;
    formatted_data = format_raw_candle_data(candle_data);
    chart = make_candlestick_chart(validate_chart_container, title, y_params, x_params, formatted_data);
  });
}
