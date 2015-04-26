var URLUtils = require('URLUtils');
var UI = require('ui');
var ajax = require('ajax');

var getdirections = {
  parseDirections : function(directions)
  {
    var items = [];
    for (var i=0; i<directions.length; i++)
    {
      var direction = directions[i].dir;

      console.log('dir: ' + direction);

      items.push({
        title:direction,
      });
    }
    return items;
  },
  get : function(route, onSuccess)
  {
    ajax(
      {
        url: URLUtils.constructURL('getdirections', {'rt' : route}),
        type: 'json'
      },
      function(data)
      {
        console.log('success!');
        var directions = data['bustime-response'].directions;
        var menuItems = getdirections.parseDirections(directions);

        var resultsMenu = new UI.Menu({
          sections: [{
            title: 'Directions',
            items: menuItems
          }]
        });
        
        var info = {route: route};

        onSuccess(resultsMenu, info);
      }
    );
  }
};
this.exports = getdirections;