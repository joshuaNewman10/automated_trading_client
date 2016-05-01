function format_marked_candle(marked_candle) {
	marked_candle = marked_candle.replace(/\s+/g, '');
	var open_index = marked_candle.indexOf('Open:');
	var close_index = marked_candle.indexOf('Close:');
	var low_index = marked_candle.indexOf('Low:');
	var high_index = marked_candle.indexOf('High:');

	var date = marked_candle.substring(0, open_index);
	var open = marked_candle.substring(open_index, high_index);
	var high = marked_candle.substring(high_index, low_index);
	var low = marked_candle.substring(low_index, close_index);
	var close = marked_candle.substring(close_index);


	return {
		'date': date,
		'open': open,
		'close': close,
		'low': low,
		'high': high
	}
}


function mark_selected_candle_data(startDate, endDate, granularity, markedCandle, pattern) {
	var send_marked_candle = ApiMethods.send_marked_candle_data;
	markedCandle = format_marked_candle(markedCandle);
	send_marked_candle(startDate, endDate, granularity, markedCandle, pattern);
}


function get_requested_candle_data() {
	var get_candle_data = ApiMethods.get_candle_data;
  	var start_date = moment();
  	var end_date = moment();
  	var granularity = 'D';

  	get_candle_data(start_date, end_date, granularity, function(response_data) {
  		console.log(response_data)
  		var chart_id = response_data.chart_id;
  		window.localStorage.setItem('chart_id', chart_id)
  		var candle_data = response_data.candle_data;
  		var title = response_data.title;
  		var y_params = response_data.y_params;
  		var x_params = response_data.x_params;
    	var formatted_data = format_data(candle_data);
    	var chart = make_candlestick_chart('chartContainer', title, y_params, x_params, formatted_data);
    	chart.render();
  });
}