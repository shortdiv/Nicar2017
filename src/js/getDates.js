var fs = require('fs');

var getDates = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('./days.txt', 'utf8', (err, data) => {
      const datum = data.split('\n')
      resolve(datum)
    })
  })
};

export { getDates }
