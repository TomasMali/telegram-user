


'use strict';

const http = require('http')
const axios = require('axios');

const Telegram = require('telegram-node-bot');


const UsersController = require('./users')

class OtherwiseController extends Telegram.TelegramBaseController {
 
  handle($) {

    // Qui cerco se l'utente è registrato
    const telegramUser = $.update.message.from;  // http://localhost:3000/users/find_one/
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/users/find_one/' + telegramUser.id,
      method: 'GET'
    }
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', (d) => {
        let obj = JSON.parse(d);
        if (!obj.message)
          $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
        else {
          // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
          axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
            .then(response => {
              let obj = response.data;
              // Controllo se l'utente è admin
              var result = []
              if (obj.message[0].admin !== true) {
              
                // Visualizzabile aggli utenti normali
                $.runMenu({
                  message: '*** COSA POSSO FARE PER TE *** ',
                  layout: 2,
                  '\u274e  /RemoveMe': () => { new UsersController().removeUser($) }
                })


              }
              else {



                $.runMenu({
                  message: '*** SCEGLI UNO DEI COMANDI *** ',
                  layout: 1,
  
                  '/UtentiRegistrati \ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66': () => { new UsersController().getAllUsers($) }
                    
                })


              }
          //    $.sendMessage(result.join('\n'));

            })
            .catch(error => {
              console.log(error);
            });
          // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        }
      })
    })
    req.on('error', (error) => {
      console.error(error)
    })
    req.end()


  }



}

module.exports = OtherwiseController;