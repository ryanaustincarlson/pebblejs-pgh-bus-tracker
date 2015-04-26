var URLUtils = require('URLUtils');
var UI = require('ui');
var ajax = require('ajax');

var getroutes = {
  sortRoutesFcn : function(a, b)
  {
    a = a.rt;
    b = b.rt;

    var retValue = null;

    // console.log(a,b);
    var aIsNum = !isNaN(a);
    var bIsNum = !isNaN(b);
    if (aIsNum && bIsNum)
    {
        retValue = Number(a) - Number(b);
    }
    else
    {
        // one of two formats if NaN
        // letterFirst: <letter><number>
        // numberFirst: <number><letter>
        // 
        // letters are only ever one character long
        // numbers can be multiple chars
        var aIsLetterFirst = isNaN(a.substr(0,1));
        var bIsLetterFirst = isNaN(b.substr(0,1));

        var aLetter = '-', bLetter = '-';
        var aNumber = Number(a), bNumber = Number(b);

        if (!aIsNum)
        {
            aNumber = Number(aIsLetterFirst ? a.substr(1) : a.substr(0, a.length-1));
            aLetter = aIsLetterFirst ? a.substr(0,1) : a.substr(a.length-1);
        }

        if (!bIsNum)
        {
            bNumber = Number(bIsLetterFirst ? b.substr(1) : b.substr(0, b.length-1));
            bLetter = bIsLetterFirst ? b.substr(0,1) : b.substr(b.length-1);
        }

        if (!aIsLetterFirst && !bIsLetterFirst) /* numbers first */
        {
            if (aNumber == bNumber)
            {
                retValue = aLetter < bLetter ? -1 : 1;
            }
            else
            {
                retValue = aNumber - bNumber;
            }
        }
        else if (!aIsLetterFirst && bIsLetterFirst)
        {
            retValue = -1;
        }
        else if (aIsLetterFirst && !bIsLetterFirst)
        {
            retValue = 1;
        }
        else /* both letters first */
        {
            if (aLetter == bLetter)
            {
                retValue = aNumber - bNumber;
            }
            else
            {
                retValue = aLetter < bLetter ? -1 : 1;
            }
        }
    }
    // console.log(a + ' <-> ' + b + ' = ' + retValue);
    return retValue;
  },
  
  parseRoutes : function(routes)
  {
    console.log('> sorting...');
    routes.sort(getroutes.sortRoutesFcn);
    console.log('> done sorting!');
    
    var items = [];
    for (var i=0; i<routes.length; i++)
    {
      var route = routes[i];
      var routeNum = route.rt;
      var routeName = route.rtnm;

      // console.log(routeNum + ' - ' + routeName);

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

        onSuccess(menuItems);
      }
    );
  }
};
this.exports = getroutes;
