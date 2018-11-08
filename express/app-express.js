const express = require('express')
const app = express();
const fs = require('fs');

var finishedQuestions;
var generalQuestionsInfo;
var mainPageInfo;

fs.readFile('../json-data/FinishedQuestsLeafs.json', (err, data) => {
  if (err) throw new Error('error occurred');
  finishedQuestions = JSON.parse(data);
});

fs.readFile('../json-data/GeneralQuestsInfo.json', (err, data) => {
  if (err) throw new Error('error occurred');
  generalQuestionsInfo = JSON.parse(data);
});

fs.readFile('../json-data/MainPageInfo.json', (err, data) => {
  if (err) throw new Error('error occurred');
  mainPageInfo = JSON.parse(data);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/finishedQuests', function (req, res) {
  res.send(finishedQuestions);
});

app.get('/generalQuests', function (req, res) {
  res.send(generalQuestionsInfo);
});

app.get('/pageInfo', function (req, res) {
  res.send(mainPageInfo);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
