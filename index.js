var inbox = require('inbox')
    Iconv = require('iconv').Iconv;

var client = inbox.createConnection(false, "imap.gmail.com", {
  secureConnection: true,
  auth: {
      user: "sample@gmail.com",
      pass: "samplepass"
    }
});

client.on("connect", function() {
  client.openMailbox("INBOX", function(error, info) {
      if(error) throw error;
      console.log("Successfully connected to server");
    });
});

client.on("new", function(message) {
  console.log(message.title, message.from, message.date, message.UID);
  client.createMessageStream(message.UID).on("data", function(data){
      var conv = new Iconv('UTF-8', 'ISO-8859-1');
      var body = conv.convert(data).toString();
      console.log(body);
    });
});

client.connect();
