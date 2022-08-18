const path = require("path");

const express = require("express");
const app = express();
//

const helmet = require("helmet");
app.use(helmet());

// 
const cookieParser = require("cookie-parser");

//

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded());
//app.use(cookieParser());
app.use(cookieParser());

//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res, next) =>{
    res.send("Welcome page! ");
})

//

app.get("/loginsix", (req, res, next) =>{
    res.render("loginsix")
})

app.post("/process_login", (req, res, next) =>{
    //

    const password = req.body.password;
    const username = req.body.username;

    if(password === "x"){
        res.cookie("username", username);
        res.redirect("/welcome")
    }else{
        res.redirect("/loginsix?msg=fail")
    }
    //res.render("/welcome")
})


// welcome path

app.get("/welcome", (req, res, next) =>{
    res.render("welcome",{
        username:req.cookies.username
    })
})
//logout

app.get("/logout", (req, res, next) =>{
    res.clearCookie('username')
    res.redirect("/loginsix");
})
app.listen(3000);
console.log("server is runing 3000")