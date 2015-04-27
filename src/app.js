/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var browseRoutes = require('browseRoutes');
var browseFavorites = require('browseFavorites');

var TITLE_FAVORITES = 'Favorites';
var TITLE_ROUTES = 'Routes';

var mainMenu = new UI.Menu({
  sections: [
    {
      title: null,
      items: [
              {title : TITLE_FAVORITES},
              {title : TITLE_ROUTES}
             ]
    }]
});

mainMenu.on('select', function(e) {
  var title = e.item.title;
  if (title == TITLE_FAVORITES)
  {
    browseFavorites.start();
  }
  else if (title == TITLE_ROUTES)
  {
    browseRoutes.start();
  }
});

mainMenu.show();


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
