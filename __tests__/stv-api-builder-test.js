(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jsLibsStvStvApiBuilder = require('../js/libs/stv/stv-api-builder');

var _jsLibsStvStvApiBuilder2 = _interopRequireDefault(_jsLibsStvStvApiBuilder);

jest.dontMock('../js/libs/stv/stv-api-builder.js');

describe('Loads the API Builder', function () {
    it('checks the app finds the correct API instance', function () {
        var localAPI = new _jsLibsStvStvApiBuilder2['default']();
        expect(localAPI.fetchAPI('player')).toBe('http://player.api.stv.' + tld + '/v1/');
        expect(localAPI.fetchAPI('stv')).toBe(undefined);
    });
});

},{"../js/libs/stv/stv-api-builder":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var APIBuilder = (function () {
	function APIBuilder() {
		_classCallCheck(this, APIBuilder);

		// Grab Object containing api urls for current env
		var apiObj = STV.url;
		this.apiList = {};
		// If object exists in window
		if (typeof apiObj === 'object') {
			// Assign named values for a cleaner API interface
			this.apiList['player'] = apiObj.playerAPIUrl;
			this.apiList['stv'] = apiObj.stvAPI;
		} else {
			var playerAPIUrl = 'http://player.api.stv.tv/v1/';
			var stvAPI = 'http://api.stv.tv/';
			this.apiList = {
				'player': playerAPIUrl,
				'stv': stvAPI
			};
		}
	}

	_createClass(APIBuilder, [{
		key: 'fetchAPI',
		value: function fetchAPI(api) {
			// TODO throw exception if no API
			return this.apiList[api];
		}
	}]);

	return APIBuilder;
})();

exports['default'] = APIBuilder;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9Kb3NlcGhNb3JyaXNvbi9Qcm9qZWN0cy9zdHYtYXBpLWNsaWVudC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSm9zZXBoTW9ycmlzb24vUHJvamVjdHMvc3R2LWFwaS1jbGllbnQvX190ZXN0c19fL2Zha2VfNmJjZDYzODMuanMiLCIvVXNlcnMvSm9zZXBoTW9ycmlzb24vUHJvamVjdHMvc3R2LWFwaS1jbGllbnQvanMvbGlicy9zdHYvc3R2LWFwaS1idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztzQ0NFdUIsZ0NBQWdDOzs7O0FBRnZELElBQUksQ0FBQyxRQUFRLENBQUMsbUNBQW1DLENBQUMsQ0FBQzs7QUFJbkQsUUFBUSxDQUFDLHVCQUF1QixFQUFFLFlBQU07QUFDcEMsTUFBRSxDQUFDLCtDQUErQyxFQUFFLFlBQVk7QUFDNUQsWUFBSSxRQUFRLEdBQUcseUNBQWdCLENBQUM7QUFDaEMsY0FBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ2xGLGNBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3BELENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ1ZrQixVQUFVO0FBQ25CLFVBRFMsVUFBVSxHQUNoQjt3QkFETSxVQUFVOzs7QUFHN0IsTUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNyQixNQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsTUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7O0FBRS9CLE9BQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUM3QyxPQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7R0FDcEMsTUFBTTtBQUNOLE9BQUksWUFBWSxHQUFHLDhCQUE4QixDQUFDO0FBQ2xELE9BQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDO0FBQ2xDLE9BQUksQ0FBQyxPQUFPLEdBQUc7QUFDZCxZQUFRLEVBQUcsWUFBWTtBQUN2QixTQUFLLEVBQUcsTUFBTTtJQUNkLENBQUM7R0FDRjtFQUNEOztjQWxCbUIsVUFBVTs7U0FtQnRCLGtCQUFDLEdBQUcsRUFBRTs7QUFFYixVQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDekI7OztRQXRCbUIsVUFBVTs7O3FCQUFWLFVBQVUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiamVzdC5kb250TW9jaygnLi4vanMvbGlicy9zdHYvc3R2LWFwaS1idWlsZGVyLmpzJyk7XG5cbmltcG9ydCBBUElCdWlsZGVyIGZyb20gJy4uL2pzL2xpYnMvc3R2L3N0di1hcGktYnVpbGRlcic7XG5cbmRlc2NyaWJlKCdMb2FkcyB0aGUgQVBJIEJ1aWxkZXInLCAoKSA9PiB7XG4gICAgaXQoXCJjaGVja3MgdGhlIGFwcCBmaW5kcyB0aGUgY29ycmVjdCBBUEkgaW5zdGFuY2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgbG9jYWxBUEkgPSBuZXcgQVBJQnVpbGRlcigpO1xuICAgICAgICBleHBlY3QobG9jYWxBUEkuZmV0Y2hBUEkoJ3BsYXllcicpKS50b0JlKCdodHRwOi8vcGxheWVyLmFwaS5zdHYuJyArIHRsZCArICcvdjEvJyk7XG4gICAgICAgIGV4cGVjdChsb2NhbEFQSS5mZXRjaEFQSSgnc3R2JykpLnRvQmUodW5kZWZpbmVkKTtcbiAgICB9KTtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJQnVpbGRlciAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvLyBHcmFiIE9iamVjdCBjb250YWluaW5nIGFwaSB1cmxzIGZvciBjdXJyZW50IGVudlxuXHRcdGxldCBhcGlPYmogPSBTVFYudXJsO1xuXHRcdHRoaXMuYXBpTGlzdCA9IHt9O1xuXHRcdC8vIElmIG9iamVjdCBleGlzdHMgaW4gd2luZG93XG5cdFx0aWYgKHR5cGVvZiBhcGlPYmogPT09ICdvYmplY3QnKSB7XG5cdFx0XHQvLyBBc3NpZ24gbmFtZWQgdmFsdWVzIGZvciBhIGNsZWFuZXIgQVBJIGludGVyZmFjZVxuXHRcdFx0dGhpcy5hcGlMaXN0WydwbGF5ZXInXSA9IGFwaU9iai5wbGF5ZXJBUElVcmw7XG5cdFx0XHR0aGlzLmFwaUxpc3RbJ3N0diddID0gYXBpT2JqLnN0dkFQSTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHBsYXllckFQSVVybCA9ICdodHRwOi8vcGxheWVyLmFwaS5zdHYudHYvdjEvJztcblx0XHRcdGxldCBzdHZBUEkgPSAnaHR0cDovL2FwaS5zdHYudHYvJztcblx0XHRcdHRoaXMuYXBpTGlzdCA9IHtcblx0XHRcdFx0J3BsYXllcicgOiBwbGF5ZXJBUElVcmwsXG5cdFx0XHRcdCdzdHYnIDogc3R2QVBJXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXHRmZXRjaEFQSShhcGkpIHtcblx0XHQvLyBUT0RPIHRocm93IGV4Y2VwdGlvbiBpZiBubyBBUElcblx0XHRyZXR1cm4gdGhpcy5hcGlMaXN0W2FwaV07XG5cdH1cbn1cbiJdfQ==
