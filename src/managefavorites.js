var managefavorites = {
  get : function()
  {
    var favsJSON = localStorage.getItem('favorites');
    if (!!favsJSON)
    {
      var favs = JSON.parse(favsJSON);
      console.log(favs);
      // do stuff, then return
    }
    else
    {
      return null;
    }
  },
  add : function(route, direction, stopname)
  {
    // add stuff
  }
};
this.exports = managefavorites;