var UI = require('ui');
var Vector2 = require('vector2');
var getroutes = require('getroutes');
var getdirections = require('getdirections');
var getstops = require('getstops');
var getpredictions = require('getpredictions');
var managefavorites = require('managefavorites');

var TITLE_SET_AS_FAVORITE = 'Set as Favorite';
var TITLE_REMOVE_FROM_FAVORITES = 'Remove from Favorites';

var browseRoutes = {
  start : function()
  {
    // Show splash screen while waiting for data
    var splashWindow = new UI.Window();

    // Text element to inform user
    var text = new UI.Text({
      position: new Vector2(0, 0),
      size: new Vector2(144, 168),
      text:'Downloading routes...',
      font:'GOTHIC_28_BOLD',
      color:'black',
      textOverflow:'wrap',
      textAlign:'center',
      backgroundColor:'white'
    });

    // Add to splashWindow and show
    splashWindow.add(text);
    splashWindow.show();

    var predictionsSuccessFcn = function(menuItems, info)
    {
      if (!!menuItems)
      {
        var predictionsMenu = new UI.Menu({
          sections: [
            {
              title: 'Favorites',
              items: null
            },
            {
              title: 'Predictions',
              items: menuItems
            }]
        });
        
        predictionsMenu.items(0, [{title: TITLE_SET_AS_FAVORITE}]);
        
        predictionsMenu.on('select', function(e) {
          if (e.sectionIndex === 0 && e.itemIndex === 0)
          {
            if (e.item.title == TITLE_SET_AS_FAVORITE)
            {
              var route = info.route;
              var direction = info.direction;
              var stopname = info.stopname;

              managefavorites.add(route, direction, stopname);
              predictionsMenu.item(0, 0, {title: TITLE_REMOVE_FROM_FAVORITES});
            }
            else
            {
              predictionsMenu.item(0, 0, {title: TITLE_SET_AS_FAVORITE});
            }
          }
        });
        
        predictionsMenu.show();
      }
      else
      {
        var errorCard = new UI.Card({
          title: 'No Routes Found',
          subtitle: 'Sorry - try another route/stop!',
        });

        errorCard.show();
      }
    };

    var stopsSuccessFcn = function(menuItems, info)
    {
      var stopsMenu = new UI.Menu({
        sections: [{
          title: 'Stops',
          items: menuItems
        }]
      });
      stopsMenu.show();

      var route = info.route;
      var direction = info.direction;
      var stopmapping = info.stopmapping;

      stopsMenu.on('select', function(e) {
        console.log('The item is titled "' + e.item.title + '"');
        var stopname = e.item.title;
        var stopid = stopmapping[stopname];
        getpredictions.get(route, direction, stopid, stopname, predictionsSuccessFcn);
      });
    };

    var directionsSuccessFcn = function(menuItems, info)
    {
      var directionsMenu = new UI.Menu({
        sections: [{
          title: 'Directions',
          items: menuItems
        }]
      });
      directionsMenu.show();

      var route = info.route;

      directionsMenu.on('select', function(e){
        console.log('The item is titled "' + e.item.title + '"');
        var direction = e.item.title;
        getstops.get(route, direction, stopsSuccessFcn);
      });
    };

    var routesSuccessFcn = function(menuItems)
    {

      var routesMenu = new UI.Menu({
        sections: [{
            title: 'Routes',
            items: menuItems
          }]
      });

      routesMenu.show();
      splashWindow.hide();

      routesMenu.on('select', function(e){
        console.log('The item is titled "' + e.item.title + '"');
        var route = e.item.title;
        getdirections.get(route, directionsSuccessFcn);
      });
    };

    // Make initial request
    getroutes.get(routesSuccessFcn);
  }
};
this.exports = browseRoutes;