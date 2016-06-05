var server = 'http://127.0.0.1:5000';

DATE_FORMAT = 'YYYY-MM-DD'

axios.defaults.headers.common['Authorization'] = 'trade';

var config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {
    email_address: 'jonewman1020@gmail.com'
  }
};


var ApiMethods = {

  get_charts_meta_info: function(callback) {
    var _name = 'APIMETHODS.get_charts_meta_info';

    var logger = window.globals.logger;
    var path = server + '/api/v1/charts';

    logger.info('Fetching Charts', _name, '')
    axios.get(path, {
      config
    }).then(function(response) {
      logger.info('Result', _name, response.data.charts);
      return {
        charts: response.data.charts
      }
    }).then(callback);
  },

	get_candle_data: function(chart_id, callback) {
    var _name = 'APIMETHODS.get_candle_data';

    var logger = window.globals.logger;
		var path = server + '/api/v1/candle';

		logger.info('Fetching Requested Candle Data', _name, '');

    	axios.get(path, {
        params: {
          chart_id: chart_id
        },
        config
    	}).then(function(response){
      		return {
        		chart_id: response.data.chart_id,
        		candle_data: response.data.candles,
        		title: response.data.title,
        		y_params: response.data.y_params,
        		x_params: response.data.x_params
      		};
    	}).then(callback);
	},

  get_marked_candles: function() {
    var _name = 'APIMETHODS.get_marked_candles';

    var logger = window.globals.logger;
    var path = server + '/api/v1/candle';

    logger.info('Sending Marked Candle Data', _name, '');

    axios.get(path, {
      params: {
        chart_id: chart_id
      },
        config
      }).then(function(response){
          return {
            chart_id: response.data.chart_id,
            candle_data: response.data.candles,
            title: response.data.title,
            y_params: response.data.y_params,
            x_params: response.data.x_params
          };
      }).then(callback);
  },

	send_marked_candle_data: function(chart_id, hours_offset, candle, pattern) {
    var _name = 'APIMETHODS.send_marked_candle_data';

    var logger = window.globals.logger;
		var path = server + '/api/v1/candle';

		logger.info('Sending Marked Candle Data', _name, '');

		return axios.post(path, {
      chart_id: chart_id,
      hours_offset: hours_offset,
      candle: candle,
      pattern: pattern
    });
	}
};
