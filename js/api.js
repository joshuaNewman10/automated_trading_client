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
	get_candle_data: function(start_date, end_date, granularity, callback) {
		var path = server + '/api/v1/candle';
		console.log('Fetching Requested Candle Data');
    	axios.get(path, {
      		params: {
        		start_date: start_date.format(DATE_FORMAT),
        		end_date: end_date.format(DATE_FORMAT),
        		granularity: granularity
      		},
      		config
    	}).then(function(res){
      		return {
        		start_date: start_date,
        		end_date: end_date,
        		candle_data: res.data.candles,
        		title: res.data.title,
        		y_params: res.data.y_params,
        		x_params: res.data.x_params
      		};
    	}).then(callback);
	},

	send_marked_candle_data: function(start_date, end_date, granularity, candle, pattern) {
		var path = server + '/api/v1/candle';
		console.log('Sending Marked Candle Data');
		return axios.post(path, {
        	start_date: start_date.format(DATE_FORMAT),
        	end_date: end_date.format(DATE_FORMAT),
        	granularity: granularity,
        	candle: candle,
        	pattern: pattern
    	});
	}
};
