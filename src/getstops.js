var URLUtils = require('URLUtils');
var UI = require('ui');
var ajax = require('ajax');

var getstops = {
  parseStops : function(stops)
  {
    var stopmapping = {};
    var items = [];
    for (var i=0; i<stops.length; i++)
    {
      var stop = stops[i];
      var stopname = stop.stpnm;
      var stopid = stop.stpid;
      
      stopmapping[stopname] = stopid;

      // console.log('stopname: ' + stopname);

      items.push({
        title:stopname,
      });
    }
    return {items:items, stopmapping:stopmapping};
  },
  get : function(route, direction, onSuccess)
  {
    
    var params = {
      'rt' : route,
      'dir' : direction
    };
    
    ajax(
      {
        url: URLUtils.constructURL('getstops', params),
        type: 'json'
      },
      function(data)
      {
        console.log('success!');
        var stops = data['bustime-response'].stops;
        var parseStopsObj = getstops.parseStops(stops);
        var menuItems = parseStopsObj.items;
        var stopmapping = parseStopsObj.stopmapping;

        var resultsMenu = new UI.Menu({
          sections: [{
            title: 'Stops',
            items: menuItems
          }]
        });
        
        var info = {
          route: route,
          direction: direction,
          stopmapping: stopmapping
        };

        onSuccess(resultsMenu, info);
      }
    );
  }
};
this.exports = getstops;
