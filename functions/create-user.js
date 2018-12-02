import express from "express"
import bodyParser from "body-parser"

const functionName = 'create-user'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

exports.handler = (event, context, callback) => {
  // const { from, to, subject, replyTo, html } = JSON.parse(event.body);
  console.log(event.body);
  // mailer.sendMail({ from, to, subject, replyTo, html }, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //     callback(null, {
  //       statusCode: 404
  //     });
  //   }
  //   else {
  //     callback(null, {
  //       statusCode: 200
  //     });
  //   }
  // });
}
