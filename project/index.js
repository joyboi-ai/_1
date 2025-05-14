const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));



app.get('/',(req,res)=>{
    fs.readdir(`./files`,(error,files)=>{
        console.log(files);
         res.render("index",{files:files});
        
    }) 
});
app.post('/create',(req,res)=>{
   console.log(req.body);
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
    if (err) {
        console.error(err)
    }
    res.redirect('/')
   })
});
app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        if (err) {
            console.error(err)
        }
        res.render('show',{filename: req.params.filename,filedata:filedata})
    })
});
app.get('/edit/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        if (err) {
            console.error(err)
        }
        res.render('edit',{filename: req.params.filename,filedata:filedata}); 
    }); 
});
app.post('/edit',(req,res)=>{
    console.log(req.body);
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
        res.redirect("/")
    })
    
})
app.listen(3000); 