'use strict';
const http = require('http')

const axios = require('axios');

var cron = require('node-cron');

const Telegram = require('telegram-node-bot')

class Utils extends Telegram.TelegramBaseController{

   
 startCron($){
     console.log('Entrato')
     //   cron.schedule('2 22 * * *', () => {
    cron.schedule('2 22 * * *', () => {
        console.log('running a task every minute');

    //    $.sendMessage("Sto resettando il menu del giorno")
        $.api.sendMessage(145645559, "Sto resettando il menu del giorno ")
        
        const data = JSON.stringify({
        })
        const option = {
            hostname: 'localhost',
            port: 3000,
            path: '/menuDelGiorno/delete_all',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
        const req = http.request(option, (res) => {
            // Non controllo lo stato della richiesta DELETE perche non mi interessa. Cancello sempre tutto. 
       //     $.sendMessage("Il menu del giorno cancellato correttamente! ")
        })
        req.on('error', (error) => {
            console.error(error)
        })
        req.write(data)
        req.end()




      });
 }


}



module.exports = Utils;


