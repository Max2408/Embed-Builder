let fetch = require('node-fetch')

exports.home = async(req, res) => {

    let token = req.cookies['token']

    if(!token) { return res.render("login" , {data : "none"})}

    if(token != process.env.SECRET_KEY){ 
        res.clearCookie("token");

        return res.render("login" , {data : "none"})
    }

    let data = await fetch("https://discordapp.com/api/v9/users/@me/guilds", {
        method: "GET",
        headers: {
            "Authorization": `Bot ${process.env.TOKEN}`
        }
    }).then(res => res.json())
    .then(json => {return json})

    res.render('servers' , {data : data})
}

exports.server = async(req, res) => {

    let token = req.cookies['token']

    if(!token) { return res.render("login" , {data : "none"})}

    if(token != process.env.SECRET_KEY){ 
        res.clearCookie("token");

        return res.render("login" , {data : "none"})
    }

    let {id} = req.params

    let data = await fetch(`https://discordapp.com/api/v9/guilds/${id}/channels`, {
        method: "GET",
        headers: {
            "Authorization": `Bot ${process.env.TOKEN}`
        }
    }).then(res => res.json())
    .then(json => {return json})

    let roles = await fetch(`https://discordapp.com/api/v9/guilds/${id}/roles`, {
        method: "GET",
        headers: {
            "Authorization": `Bot ${process.env.TOKEN}`
        }
    }).then(res => res.json())
    .then(json => {return json})

    if(!data[0]) {
        res.render("404")
    }else {
        res.render("embed" , {data : data, roles : roles})
    }
}

exports.login = async(req, res) => {
    res.render("login", {data : "none"})
}