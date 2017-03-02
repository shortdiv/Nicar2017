var fs = require('fs');
var moment = require('moment');

var cleanData = function () {
  function init(time) {
    var newTime;
    var grabTime = /(?:\d.+[\s])?(?:a.m.|p.m.)/;
    var removeExtraNum = /^.*?\d\s\d/
    time = time.replace(" ", "")
    if(!Number.isNaN(parseInt(time[0]))) {
      newTime = time.slice(1, time.length)
    } else if(!Number.isNaN(parseInt(time[6]))) {
      newTime = time.slice(23, time.length)
    } else {
      newTime = time
    }
    var timePeriod = grabTime.exec(newTime)[0]
    var extraChars = removeExtraNum.exec(timePeriod);
    if(extraChars != null) {
      var extraChar = extraChars[0].slice(0,2)
      timePeriod = timePeriod.replace(extraChar, "").trim()
      if(timePeriod[0] === '/') {
        timePeriod = timePeriod.slice(4, timePeriod.length)
      }
    }
    var venue = time.replace(timePeriod, "")

    timePeriod = getTime(timePeriod);

    return {
      venue: venue,
      startTime: timePeriod.startTime,
      endTime: timePeriod.endTime
    }
  }

  function getTime(timeFrame) {
    //console.log(timeFrame)
    var timeArray = timeFrame.replace(/\s/g, '').replace(/\./g, '').split('-');
    //getFormat//
    var startTimeFormat = getFormat(timeArray[0])
    var endTimeFormat = getFormat(timeArray[1])
    var startTime = moment(timeArray[0], startTimeFormat)
    var endTime = moment(timeArray[1], endTimeFormat)
    return {
      startTime: startTime,
      endTime: endTime
    }
  }

  function getFormat(timeString) {
    var time = timeString.trim().split(':')
    if(time.length > 1) {
      return 'h' + ':' + 'm' + ' ' + 'a'
    } else {
      return 'h' + ' ' + 'a'
    }
  }

  return {
    init: init
  }
}

export { cleanData }
