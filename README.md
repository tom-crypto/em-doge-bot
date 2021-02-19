# Elon Musk Doge Bot Project

Em-doge-bot is a shot hobby project I made to send me SMS alerts. 

Elon Musk loves to tweet favorably about Dogecoin, and every time he does, the market responds with a surge of purchase orders. In an effort to profit off of this hilarious phenomenon I have built a program to send me text messages every time Elon tweets about Dogecoin. When I recieve a notification, I buy small amount of Doge and sell it moments later for a quick profit.

I built this project using the Serverless framework for AWS.

# How it works

The entire function runs on AWS Lambda (handler.js). handler.js is subscribed to a cron trigger that publishes every 10 minutes. At 10 minutes, the Lambda function is triggered and makes a call to Elon Musk's twitter handle via the Twitter API. We then search for any new tweets in the last 10 minutes. If, new tweets are found we REGEX for Doge. If, Doge is matched we send an alert to the end-user via AWS SNS.

