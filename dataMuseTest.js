const request = require('request');

request('https://api.datamuse.com/words?rel_rhy=forgetful',function(error,response,body){
        console.log('error: ',error);
        console.log('status code: ',response && response.statusCode);
        console.log('body: ',body);
        console.log(typeof body);
        var bodyObj = JSON.parse(body);
        console.log(typeof bodyObj);
        console.log(bodyObj[0].word);
        console.log(Object.keys(bodyObj));
});


