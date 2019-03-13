const express = require('express')
const Sharp = require('sharp');
const fs = require('fs');
// const text2png = require('text2png');


const app = express()


app.get('/build-image', function (req, res) { 
    return Sharp('bookshelf.jpeg')
    .resize(800,400,{fit:'cover'})
    .png()
    .composite([{input:'overlay.png', gravity:"southeast"}])
    .toBuffer()
    // .then(buffer=>Sharp(buffer)
    //     .overlayWith('overlay.png',{left:0,top:0})
    //     .toBuffer())
    .then(buffer=>{
        const contentType = 'image/png';
        const img = new Buffer(buffer, 'base64');
        res.set({
            'Content-Type': contentType,
        })
        res.status(200).send(img)
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
  
module.exports = app