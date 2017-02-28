var fs = require('fs');
var moment = require('moment');

fs.readFile('output.json', 'utf8', (err, data) => {
  var data = JSON.parse(data);
  var timings = []
  var locations = []
  var grabTime = /(?:\d.+[\s])?(?:a.m.|p.m.)/;
  var removeExtraNum = /^.*?\d\s\d/
  data.map(function(event) {
    var time = event.time.replace(" ", "")
    if(!Number.isNaN(parseInt(time[0]))) {
      newTime = time.slice(1, event.time.length)
    } else {
      newTime = time
    }
    var timePeriod = grabTime.exec(newTime)[0]
    var extraChars = removeExtraNum.exec(timePeriod);
    if(extraChars != null) {
      var extraChar = extraChars[0].slice(0,2)
      timePeriod = timePeriod.replace(extraChar, "").trim()
    }
    var location = time.replace(timePeriod, "")
    timings.push(timePeriod);
    locations.push(location);
  })
})
