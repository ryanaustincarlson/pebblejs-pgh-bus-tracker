var URLUtils = require('URLUtils');
var UI = require('ui');
var ajax = require('ajax');

var getpredictions = {
  parsePredictions : function(predictions)
  {
    console.log('IN parsePredictions');
    var items = [];
    for (var i=0; i<predictions.length; i++)
    {
      var prediction = predictions[i];
      var minutes = prediction.prdctdn;
      var route = prediction.rt;
      var destination = prediction.des;
      
      console.log('prediction: ' + minutes);
      
      var title = route + ' to ' + destination;
      var subtitle = minutes;

      console.log(title + ' ... ' + subtitle);

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
        var resultsMenu = null;
        
        if (!!predictions)
        {
          console.log('parsingPredictions...');
          var menuItems = getpredictions.parsePredictions(predictions);

          resultsMenu = new UI.Menu({
            sections: [{
              title: 'Predictions',
              items: menuItems
            }]
          });
        }
        
        var info = {
          route: route,
          direction: direction,
          stopid: stopid
        };

        onSuccess(resultsMenu, info);
      }
    );
  }
};
this.exports = getpredictions;
