# DailyReadings
REST API created in node js and express to provide dailyReadings

With the postman collection in Test folder it is possible to run tests with this API.
Basically this is the endpoint somebody can call:
https://dailyreadings.cloudns.asia:50001/dailyReading/yyyy/mm/dd

or to get all of them:

https://dailyreadings.cloudns.asia:50001/dailyReadings

JS code in frontEnd folder contains the necessary code to include in FrontEnd site. I used it in a WordPress Theme.

# Used sources to setup
REST-example:
https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

AWS fist steps:
https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server

'Fun' with firewall:
https://www.cyberciti.biz/faq/how-to-open-firewall-port-on-ubuntu-linux-12-04-14-04-lts/

MongoDB port for Compass connection:
https://jasonwatmore.com/post/2020/02/05/connect-to-remote-mongodb-on-aws-ec2-simply-and-securely-via-ssh-tunnel

Swagger:
https://www.npmjs.com/package/swagger-ui-express

https://www.npmjs.com/package/swagger-autogen

https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284

To make HTTPS work, i used these steps:
 - register the AWS public IP on https://www.cloudns.net/
 - using manual procedure with certbot : https://certbot.eff.org/docs/using.html#manual
 - use the generated certificate and key in server.js