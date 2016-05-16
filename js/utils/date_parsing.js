function make_date(raw_date) {
  var date = new Date(raw_date['utc'] * 1000);
  var debug_date = raw_date['year'] + '-' + raw_date['month'] + '-' + raw_date['day'] + '-' + raw_date['hour'] + '-' + raw_date['minute'];
  var utc_date = new Date(Date.UTC(raw_date['year'],raw_date['month'],raw_date['day'],raw_date['hour'],raw_date['minute']))
  console.log('JS Date:', date, 'STRING DATE', debug_date, 'JS UTC DATE', utc_date);
  return date
}