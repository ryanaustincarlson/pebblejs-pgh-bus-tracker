/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
// var ajax = require('ajax');
var Vector2 = require('vector2');
var getroutes = require('getroutes');
var getdirections = require('getdirections');
var getstops = require('getstops');
var getpredictions = require('getpredictions');
// var URLUtils = require('URLUtils');

var value = localStorage.getItem('hi');
console.log('local value: ' + value);

localStorage.setItem('hi', null);

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
      sections: [{
        title: 'Predictions',
        items: menuItems
      }]
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
    var stop = e.item.title;
    var stopid = stopmapping[stop];
    getpredictions.get(route, direction, stopid, predictionsSuccessFcn);
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


/*
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/
