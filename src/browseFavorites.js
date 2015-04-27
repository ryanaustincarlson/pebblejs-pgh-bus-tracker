var UI = require('ui');
var Vector2 = require('vector2');
var managefavorites = require('managefavorites');

var browseFavorites = {
  start : function()
  {
    var favs = managefavorites.get();
    if (!!favs)
    {
      // show things
    }
    else
    {
      var noFavsCard = new UI.Card({
        title: 'No Favorites Yet',
        subtitle: null,
        body: 'Drill down on a route to set up your favorites.'
      });
      
      noFavsCard.show();

    }
  }
};
this.exports = browseFavorites;