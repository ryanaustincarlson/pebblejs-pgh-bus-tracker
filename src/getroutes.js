var URLUtils = require('URLUtils');
var UI = require('ui');
var ajax = require('ajax');

var getroutes = {
  parseRoutes : function(routes)
  {
    var items = [];
    for (var i=0; i<routes.length; i++)
    {
      var route = routes[i];
      var routeNum = route.rt;
      var routeName = route.rtnm;

      console.log(routeNum + ' - ' + routeName);

      items.push({
        title:routeNum,
        subtitle:routeName
      });
    }
    return items;
  },
  get : function(onSuccess)
  {
    ajax(
      {
        url: URLUtils.constructURL('getroutes', {}),
        type: 'json'
      },
      function(data)
      {
        console.log('success!');
        var routes = data['bustime-response'].routes;
        var menuItems = getroutes.parseRoutes(routes);

        var resultsMenu = new UI.Menu({
          sections: [{
            title: 'Routes',
            items: menuItems
          }]
        });

        onSuccess(resultsMenu);
      }
    );
  }
};
this.exports = getroutes;
