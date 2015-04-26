var URLUtils = require('URLUtils');
var UI = require('ui');
var ajax = require('ajax');

var getpredictions = {
  parsePredictions : function(predictions)
  {
    var items = [];
    for (var i=0; i<predictions.length; i++)
    {
      var prediction = predictions[i];
      var timeEstimate = prediction.prdctdn;
      var route = prediction.rt;
      var destination = prediction.des;
      
      // console.log('prediction: ' + minutes);
      
      var title = '#' + route + ' to ' + destination;
      var subtitle = timeEstimate;
      if (!isNaN(timeEstimate))
      {
        subtitle += ' min';
      }

      // console.log(title + ' ... ' + subtitle);

      items.push({
        title:title,
        subtitle:subtitle
      });
    }
    return items;
  },
  get : function(route, direction, stopid, onSuccess)
  {
    
    var params = {
      // 'rt' : route,
      'dir' : direction,
      'stpid' : stopid
    };
    
    ajax(
      {
        url: URLUtils.constructURL('getpredictions', params),
        type: 'json'
      },
      function(data)
      {
        console.log('success!');
        var predictions = data['bustime-response'].prd;
        var menuItems = null;
        
        if (!!predictions)
        {
          menuItems = getpredictions.parsePredictions(predictions);
        }
        
        var info = {
          route: route,
          direction: direction,
          stopid: stopid
        };

        onSuccess(menuItems, info);
      }
    );
  }
};
this.exports = getpredictions;
