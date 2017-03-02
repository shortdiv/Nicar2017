let request = require('request');
let fs = require('fs');
let lodash = require('lodash')
let cheerio = require('cheerio');
import { cleanData } from './cleanData.js'

  var url = 'http://ire.org/conferences/nicar2017/schedule/';

  request(url, function(error, response, html) {
    if(!error && response.statusCode == 200) {
      var dayCounter = 0;
      var counter = 0;
      var schedule = [];
      var dates = [
        '03/01/2017',
        '03/02/2017',
        '03/03/2017',
        '03/04/2017',
        '03/05/2017'
      ]
      var $ = cheerio.load(html);
        $('.col-60').each(function() {
          if(counter === 4) {
            dayCounter++
          } else if(counter === 80) {
            dayCounter++
          } else if(counter === 146) {
            dayCounter++
          } else if(counter === 219) {
            dayCounter++
          } else if(counter === 241) {
            dayCounter++
          }
          var json = {
            title: "",
            link: "",
            speakers: "",
            descriptions: "",
            startTime: "",
            endTime: ""
          }
          //console.log($(elem).find('h3').text())
          var title = $(this).find('h3').text()
          var link = $(this).find('a').attr('href')
          var speakers = $($(this).find('p')[0]).text()
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
          counter++
        })

		  fs.writeFile('output.json', JSON.stringify(schedule, null, 2), function(err) {
        if(err) throw err
      })
      console.log('written!')
    }
  })
