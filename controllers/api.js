let fetch = require('node-fetch')

exports.send = async(req, res) => {
        
        let embed = {
            type : "rich"
        }

        if(req.body.title) {
            embed.title = req.body.title
        }

        if(req.body.description) {
            embed.description = req.body.description
        }

        if(req.body.footer) {
            embed.footer = {
                text : req.body.footer
            }
        }

        if(req.body.timestamp === "yes") {
            let date = new Date
            embed.timestamp = date.toISOString()
        }

        if(req.body.image) {
            embed.image = {
                url : req.body.image
            }
        }

        if(req.body.thumbnail) {
            embed.thumbnail  = {
                url : req.body.thumbnail
            }
        }

        if(req.body.color) {
            embed.color  =  parseInt(req.body.color.split("#")[1] , 16);
        }

        let body = {
            embeds : [embed],
        }

        if(req.body.role != "none") {
            if(req.body.role === "@everyone") {
                body.content = "@everyone"
            }else {
                body.content = `<@&${req.body.role}>`
            }
        }

        let data = await fetch(`https://discord.com/api/v9/channels/${req.body.channlid}/messages`, {
            method: 'POST',
            headers: {
                "Authorization": `Bot ${process.env.TOKEN}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(json => {return json})

        console.log(data)

        res.render('success')
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