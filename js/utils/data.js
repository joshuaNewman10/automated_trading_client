function format_marked_candle(marked_candle) {
	var _name = 'format_marked_candle';

	var date;

	var open_index;
	var close_index;
	var high_index;
	var low_index;

	var open;
	var close;
	var high;
	var low;

	// Remove marked candle white-spacing
	marked_candle = marked_candle.replace(/\s+/g, '')

	open_index = marked_candle.indexOf('Open:');
	close_index = marked_candle.indexOf('Close:');
	low_index = marked_candle.indexOf('Low:');
	high_index = marked_candle.indexOf('High:');

	// Parse out substrings
	date = marked_candle.substring(0, open_index);
	open = marked_candle.substring(open_index, high_index);
	high = marked_candle.substring(high_index, low_index);
	low = marked_candle.substring(low_index, close_index);
	close = marked_candle.substring(close_index);

	return {
		'date': date,
		'open': open,
		'close': close,
		'low': low,
		'high': high
	}
}


function format_raw_candle_data(raw_data) {
  var _name = 'format_raw_candle_data';

  var data_points = [];
  var data_point;
  var entry;
  var raw_candle;
  var raw_date;

  for (var i=0; i<raw_data.length; i++) {
    entry = raw_data[i];
    raw_date = entry['date'];
    raw_candle = entry['candle'];
    data_point = {'x': make_date(raw_date), 'y': make_candle(raw_candle)};
    data_points.push(data_point);
  }
  return data_points;
}


function make_candle(raw_candle) {
  var _name = 'make_candle';

  return [raw_candle['open'], raw_candle['high'], raw_candle['low'], raw_candle['close']];
}