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


function format_raw_candle_data(raw_data) {
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