const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const cors = require('cors')
let upload = require('express-fileupload');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(upload());
app.use(express.static(__dirname + '/public'));
routes(app);


// // post data
// app.post('/post/agenda',async(req,res)=>{
//     let data = req.body

//     await agenda.add(data)
//     res.send({msg:"Menambahkan Data"})
// })

app.listen(3000, () => {
    console.log(`Server started on port`);
});

