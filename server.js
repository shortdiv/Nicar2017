let express = require('express');
let request = require('request');
let fs = require('fs');
let lodash = require('lodash')
let cheerio = require('cheerio');
let app = express();

  var url = 'http://ire.org/conferences/nicar2017/schedule/';
var link;

  request(url, function(error, response, html) {
    if(!error && response.statusCode == 200) {
      var schedule = [];
      var $ = cheerio.load(html);
			$('.col-60').each(function(i, elem) {
        var json = {
		    	title: "",
		    	link: "",
		    	speakers: "",
		    	descriptions: "",
		    	time: ""
		    }

				var title = $(this).find('h3').text()
				var link = $(this).find('a')
				link = link[0].attribs.href;
				var speakers = $(this).find('p')[0]
				speakers = $(speakers).text()
				var description = $(this).find('p').text();
				description = description.split(speakers)[1].replace("Register now!", "");
				var time = $(this).next().text().replace(/\s+/g, ' ')

				json.title = title;
				json.link = link;
				json.speakers = speakers.split("Speakers: ")[1];
				json.descriptions = description;
				json.time = time;

				schedule.push(json)
			})
		  fs.writeFile('output.json', JSON.stringify(schedule, null, 2), function(err) {
			  if(err) throw err
		  })
			console.log('written!')
    }
  })


