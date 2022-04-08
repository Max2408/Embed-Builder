const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const discord = require('discord.js')
const client = new discord.Client();

let viewsRouter = require('./routers/views')
let api = require('./routers/api')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static('public'))

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(cookieParser())

app.use('/' , viewsRouter)
app.use('/api' , api)

app.use('*' , (req, res) => {
    res.render('404')
})

app.listen(process.env.PORT, async() => {
    console.log('===> App listening at ', process.env.PORT)

    client.on('ready', () => {
        console.log('===> Logged in as: ', client.user.username);

        client.user.setActivity(process.env.STATUS ,{ type : "STREAMING" })
    });
})

client.login(process.env.TOKEN)