let discord = require('discord.js')
let client = new discord.Client()

exports.send = async(req, res) => {

    client.login(process.env.TOKEN)

    let channel = client.channels.cache.find(ch => ch.id === req.body.channlid)

    if(!channel) {
        res.redirect('/')
    }else {
        let embed = new discord.MessageEmbed()
        
        if(req.body.title) {
            embed.setTitle(req.body.title)
        }

        if(req.body.description) {
            embed.setDescription(req.body.description)
        }

        if(req.body.footer) {
            embed.setFooter(req.body.footer)
        }

        if(req.body.timestamp === "yes") {
            embed.setTimestamp()
        }

        if(req.body.image) {
            embed.setImage(req.body.image)
        }

        if(req.body.thumbnail) {
            embed.setThumbnail(req.body.thumbnail)
        }

        if(req.body.color) {
            embed.setColor(req.body.color)
        }else{
            embed.setColor('RANDOM')
        }

        channel.send(embed)

        res.render('success')
    }
}

exports.login = async(req, res) => {
    if(req.body.password != process.env.PASSWORD) {
        res.render("login" , {data: "Wrong"})
    }else {
        var options = {
            maxAge: 1000 * 60 * 60 * 24 ,
        };
        var value = process.env.SECRET_KEY;
        res.cookie('token' , value, options)

        res.redirect('/')
    }
}