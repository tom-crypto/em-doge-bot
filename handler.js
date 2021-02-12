const axios = require('axios');

module.exports.run = async (event, context) => {
  const time = new Date();
  const config = {
    headers: { Authorization: `Bearer ${process.env.token}` }
  };

  const elonUserId = '44196397'
  response = await axios.get(`https://api.twitter.com/2/users/${elonUserId}/tweets?tweet.fields=created_at`, config);
  
  for (const tweet of response.data.data) {
    //console.log('LINE 13', new Date(tweet.created_at))
    if (doesNewTweetExist(time, new Date(tweet.created_at))) {
      // if doge match
      continue
      // then send email via ses
    }
    else {
      doesTweetContainDoge(tweet.text)
    }
  }
};


function doesNewTweetExist(dt2, dt1){
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  minutes = Math.abs(Math.round(diff));
  if (minutes <= 10){
    return true
  }
  else {
    return false
  }
  };

// const test =  new Date("2021-02-12T10:15:48.000Z")
// const time = new Date();

// console.log(doesNewTweetExist(time, test));

function doesTweetContainDoge(t) {
  const regex = new RegExp(/doge|oge/gi);
  let dogeExists = regex.test(t);
  console.log(dogeExists)
  return dogeExists

}