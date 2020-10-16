const {google} = require('googleapis')
const util = require('util');
const keys = require('./credentials.json')

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
)

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth:cl})
    const opt = {
        spreadsheetId:'1X5ol6f9HtzjXFEMh7w4gWAw9sbn6BSeuPIlgEWQtk9Y',
        range:'A2:D'
    }

    let data = await gsapi.spreadsheets.values.get(opt)
    list = data.data.values.map(row=>{
        return {
          name:row[0],
          desc:row[1],
          lat:row[2],
          lon:row[3]
        }
      }
    );
    return list
}

async function getList(){
    let globalList

    function authorize() {
        return new Promise((resolve, reject) => {

            client.authorize(async function(err,tokens){
                if(err){
                    console.log(err);
                    reject(err)
                    //return;
                }else{
                    console.log("Connected")
                    globalList = await gsrun(client)
                    resolve(globalList)
                    //return list
                }
            })

        });
    }


    let result = await authorize()

    //  client.authorize(function(err,tokens){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }else{
    //         console.log("Connected")
    //         globalList = await gsrun(client)
    //         return list
    //     }
    // })
    console.log("am I REALLY connected?" , result)


    return globalList
}

exports.getList = getList;