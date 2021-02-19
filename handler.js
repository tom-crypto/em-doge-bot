const axios = require('axios');
const AWS = require('aws-sdk');

var SNS = new AWS.SNS()

const sendTextMsg = async (number, message) => {
  const response = await SNS.publish({
    PhoneNumber: number,
    Message: message
  }).promise();
  console.log(response);
  }

module.exports.run = async (event, context) => {
  const time = new Date();
  const config = {
    headers: { Authorization: `Bearer ${process.env.token}` }
  };

  const elonUserId = '44196397'
  response = await axios.get(`https://api.twitter.com/2/users/${elonUserId}/tweets?tweet.fields=created_at`, config);
  
  for (const tweet of response.data.data) {
    if (newTweetExists(time, new Date(tweet.created_at))) {
      if (tweetContainsDoge(tweet.text)) {
        sendTextMsg('process.env.MY_PHONE_NUMBER','Doge alert!')
      }
    }
  };


function newTweetExists(dt2, dt1){
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  minutes = Math.abs(Math.round(diff));
  return minutes <= 10
};


function tweetContainsDoge(t) {
  const regex = new RegExp(/doge|oge/gi);
  let dogeExists = regex.test(t);
  console.log(dogeExists)
  return dogeExists
  };

};
