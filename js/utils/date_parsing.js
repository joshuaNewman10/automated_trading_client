function make_date(raw_date) {
  var _name = 'make_date';

	return new Date(raw_date['utc'] * 1000);
}