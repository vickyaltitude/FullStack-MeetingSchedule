const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
const dataR = require('./controller/connect');
const ds = require('./model/data');

app.use(express.static(path.join(__dirname,'public')));

let meetlinks = ["https://meet.google.com/qpj-xcbj-ysu?authuser=0","https://meet.google.com/hbz-fwyu-bxu?authuser=0","https://meet.google.com/jzd-zjia-zzr?authuser=0","https://meet.google.com/viw-jmnf-qyd?authuser=0"]


app.get('/getdata', async (req,res,next)=>{

    try{
        const data = await dataR.collectData();
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.post('/postdata', (req,res,next)=>{

   let received = req.body;
   let slot = received.slot
   console.log('Received:', received);

    console.log('Slot:', slot);
   let table = slot == 1 ? "slotone" : slot == 2 ? "slottwo" : slot == 3 ? "slotthree" : "slotfour";
   console.log(table)
   ds.execute(`INSERT INTO ${table} (name,meetlink,slot) VALUES(?,?,?);`,[received.userN,meetlinks[slot-1],slot]).then(resp => {
    res.json({ message: 'Data inserted successfully!' ,data: req.body});
   }).catch(err => console.log(err));
  
})

app.post('/deletedata',(req,res,next)=>{
    const dat = req.body.id;
    console.log(dat);
    let id = Number(dat[0]);
    let table = dat[1] == "1" ? "slotone" : dat[1] == "2" ? "slottwo" : dat[1] == "3" ? "slotthree" : "slotfour";
    ds.execute(`DELETE FROM ${table} WHERE id = ${id}`).then(resp =>{
        res.json({ message: 'Data inserted successfully!' ,data: req.body});
    }).catch(err => console.log(err));
    
})

app.get('/',(req,res,next)=>{

    res.sendFile(path.join(__dirname,'public','meetS.html'));

})

app.listen(PORT,()=> console.log(`Server is running on PORT ${PORT}`));