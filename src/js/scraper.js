let request = require('request');
let fs = require('fs');
let lodash = require('lodash')
let cheerio = require('cheerio');
import { cleanData } from './cleanData.js'

  var url = 'http://ire.org/conferences/nicar2017/schedule/';

  request(url, function(error, response, html) {
    if(!error && response.statusCode == 200) {
      var dayCounter = 0;
      var schedule = [];
      var dates = [
        '03/01/2017',
        '03/02/2017',
        '03/03/2017',
        '03/04/2017',
        '03/05/2017'
      ]
      var $ = cheerio.load(html);
      $('listview').each(function(i, elem) {
        //events on a single day//
        $(this).each(function(index) {
          var json = {
            title: "",
            link: "",
            speakers: "",
            descriptions: "",
            startTime: "",
            endTime: ""
          }
          var title = $(this).find('h3').text()
          var link = $(this).find('a')
          link = link[0].attribs.href;
          var speakers = $(this).find('p')[0]
          speakers = $(speakers).text()
          var description = $(this).find('p').text();
          description = description.split(speakers)[1].replace("Register now!", "");
          var time = $(this).next().text().replace(/\s+/g, ' ')
          var day = dates[dayCounter]
          time = cleanData().init(time, day)

          json.title = title;
          json.link = link;
          json.speakers = speakers.split("Speakers: ")[1];
          json.descriptions = description;
          json.startTime = time.startTime;
          json.endTime = time.endTime;
          json.venue = time.venue;

          schedule.push(json)
        })
        dayCounter++
      })
		  fs.writeFile('output.json', JSON.stringify(schedule, null, 2), function(err) {
        if(err) throw err
      })
      console.log('written!')
    }
  })
