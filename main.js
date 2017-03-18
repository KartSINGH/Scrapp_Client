const express = require('express'),
    path = require('path'),
    app = express()

app.use('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8889, 'localhost', () => {
    console.log('Server running on port 8889')
})