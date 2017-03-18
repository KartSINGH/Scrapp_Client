const express = require('express'),
    path = require('path'),
    app = express()
app.use(express.static('.'));
app.use('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
    response.redirect('http://localhost:8889/#/');
})

app.listen(8889, 'localhost', () => {
    console.log('Server running on port 8889')
})