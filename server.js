const express = require('express');
const config = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const mySecret = 'mySecretKey';

app.use(session({
  secret: config.mySecretKey,
  resave: false,
  saveUninitialized: false
}));


app.use(session({
  secret: mySecret,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: url,
    dbName: dbName,
    ttl: 60 * 60 // time-to-live for session documents (in seconds)
  })
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/investment', (req, res) => {
  res.sendFile(__dirname + '/public/investment.html');
});

app.post('/investment', async (req, res) => {
  try {
    const investmentOption = req.body.investmentOption;
    const amount = req.body.amount;
    let message = `You have chosen Option ${investmentOption} and invested $${amount}.`;
    if (investmentOption === 'option1') {
      message += ' Your expected annual return is $' + amount * 0.05;
    } else if (investmentOption === 'option2') {
      message += ' Your expected annual return is $' + amount * 0.07;
    } else if (investmentOption === 'option3') {
      message += ' Your expected annual return is $' + amount * 0.1;
    }

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('investments');

    const result = await collection.insertOne({
      option: investmentOption,
      amount: amount,
      expected_return: message,
      created_at: new Date()
    });
    console.log('Inserted document:', result.ops[0]);

    client.close();

    req.session.message = message;
    res.status(200).redirect('/investment');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

async function startServer() {
  try {
    await app.listen(3000);
    console.log('Server is running on port 3000');
  } catch (err) {
    console.error(err);
  }
}

startServer();
