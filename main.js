const express = require('express'),
    path = require('path'),
    app = express()
app.use(express.static('.'));
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8889,() => {
    console.log('Server running on port 8889')
})