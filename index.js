var inbox = require('inbox')
    Iconv = require('iconv').Iconv,
    Mailparser = require('mailparser').MailParser,
    Slack = require('node-slack');

var client = inbox.createConnection(false, "imap.gmail.com", {
  secureConnection: true,
  auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD
    }
});
var mailparser = new Mailparser();
var slack = new Slack(process.env.SLACK_DOMAIN, process.env.SLACK_TOKEN);

client.on("connect", function() {
  client.openMailbox("INBOX", function(error, info) {
      if(error) throw error;
      console.log("Successfully connected to server");
    });
});

mailparser.on('end', function(email) {
    slack.send({
        text: email.text,
        channel: process.env.SLACK_CHANNEL,
        username: 'Bot',
        icon_emoji: 'test'
    });
});


client.on("new", function(message) {
    client.createMessageStream(message.UID).on("data", function(data){
         var conv = new Iconv('UTF-8', 'ISO-8859-1');
         var body = conv.convert(data).toString();
         mailparser.write(body);
         mailparser.end();
    });
});

client.connect();
