var express = require("express");
var app = express();
const data = require('./Scripts/json/users.json');

app.use(express.static(__dirname + '/View'));
app.use(express.static(__dirname + '/Scripts'));
app.use(express.static(__dirname + '/src'));
//Store all HTML files in view folder.
// app.get('/',(req,res)=>{
//     res.sendFile('Yuhao.html');
// });
app.get('/zayn', (req, res) => {
    res.sendFile(__dirname + '/View/ZAYN.html');
});
app.get('/MAMA', (req, res) => {
    res.sendFile(__dirname + '/View/MAMA.html');
});
app.get('/yuhao', (req, res) => {
    res.sendFile(__dirname + '/View/Yuhao.html');
});
app.get('/api/:name', (req, res) => {
    let sendjson = JSON.stringify(data.filter(line => line.name === req.params.name)[0]);
    console.log(sendjson);
    if (sendjson)
        res.send(sendjson);
    else res.send('');
});

app.listen(80);