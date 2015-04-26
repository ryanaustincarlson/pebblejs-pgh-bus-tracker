var URLUtils = {
  constructURL : function(route, data)
  {
    var url = 'http://truetime.portauthority.org/bustime/api/v2/';
    url += route + '?';
    data.key = 'myAm3A47DLjS4wuSvvHCrgs42';
    data.format = 'json';
    var params = [];
    for (var key in data)
    {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    url += params.join('&');
    return url;
  }
};

this.exports = URLUtils;