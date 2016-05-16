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
    var path = server + '/api/v1/charts';
    console.log('Fetching Charts');
    axios.get(path, {
      config
    }).then(function(res) {
      console.log(res.data.charts);
      return {
        charts: res.data.charts
      }
    }).then(callback);
  },
	get_candle_data: function(chart_id, callback) {
		var path = server + '/api/v1/candle';
		console.log('Fetching Requested Candle Data');
    	axios.get(path, {
      		params: {
        		chart_id: chart_id
      		},
      		config
    	}).then(function(res){
      		return {
        		chart_id: res.data.chart_id,
        		candle_data: res.data.candles,
        		title: res.data.title,
        		y_params: res.data.y_params,
        		x_params: res.data.x_params
      		};
    	}).then(callback);
	},

  get_marked_candles: function() {
    var path = server + '/api/v1/candle';
    console.log('Sending Marked Candle Data');
    axios.get(path, {
          params: {
            chart_id: chart_id
          },
          config
      }).then(function(res){
          return {
            chart_id: res.data.chart_id,
            candle_data: res.data.candles,
            title: res.data.title,
            y_params: res.data.y_params,
            x_params: res.data.x_params
          };
      }).then(callback);
  },

	send_marked_candle_data: function(chart_id, hours_offset, candle, pattern) {
		var path = server + '/api/v1/candle';
		console.log('Sending Marked Candle Data');
		return axios.post(path, {
        chart_id: chart_id,
        hours_offset: hours_offset,
        candle: candle,
        pattern: pattern
    });
	}
};
