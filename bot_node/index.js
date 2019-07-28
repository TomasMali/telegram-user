'use strict'

const Telegram = require('telegram-node-bot')

const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('676793933:AAFSqroVLFsRsYU1nk12-gmVWrYprDN2q-I')


const TelegramBaseController = Telegram.TelegramBaseController


const http = require('http')

const UsersController = require('./api/controllers/users')
const OtherwiseController = require('./api/controllers/otherwise')




class StarterController extends TelegramBaseController {

  handle($) {

    // Qui cerco se l'utente è registrato
    //const telegramUser = $.update.message.from;  // http://localhost:3000/users/find_one/
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/users/find_one/' + $.update.message.from.id,
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


          tg.router.
            when(
              new TextCommand('/JoinMe', 'addUser'),
              new UsersController()
            ).
            when(
              new TextCommand('/RemoveMe', 'removeMe'),
              new UsersController()
            ).

            //    OTHERWISE CONTROLLER
            otherwise(
              new OtherwiseController()
            )



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

tg.router.
  when(
    new TextCommand('/JoinMe', 'addUser'),
    new UsersController()
  ).otherwise(
    new StarterController()
  )