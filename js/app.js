function register_event_listeners() {
  $('#chartContainer').on('click', prepare_marked_candle_data)
}


window.onload = function () {
  var logger = new Logger();
  var cache = new Cache();

  window.globals = {
    'logger': logger,
    'cache': cache
  }

  get_chart_meta_info();
  register_event_listeners();
}