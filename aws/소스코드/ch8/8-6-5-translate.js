/* AWS SDK 를 가져옵니다.*/
var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

var translate = new AWS.Translate();
exports.handler = function(event, context,callback){

console.log(JSON.stringify(event.body));

const response = JSON.parse(event.body)

  //event.body로 POST로 받은 데이터를 받습니다.
  try{
    const translateParams = {
    SourceLanguageCode: 'ko',
    TargetLanguageCode: 'en',
    Text: response.text
  }

  //translate SDK를 불러옵니다.
  translate.translateText(translateParams, function (err, data) {
    if (err) callback(err)
    callback(null,{
        statusCode:200,
        headers: {
        "Access-Control-Allow-Origin" : "*", //S3에서 요청을 할 수 있도록 허용해줍니다.
        "Access-Control-Allow-Credentials" : true
        },
        body:data.TranslatedText
    })
  })
  }catch(e){
    callback(null,{
      statusCode:200,
      body:JSON.stringify(e)
    })
  }


};
