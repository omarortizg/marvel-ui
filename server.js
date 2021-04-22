const express = require('express');
const app = express(),
    port = 8080;

app.use(express.static(process.cwd() + '/dist/marvel-ui/'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/dist/marvel-ui/index.html')
});

app.get('*', function (req, res) {
    res.sendFile(process.cwd() + '/dist/marvel-ui/index.html')
});

app.listen(port, () => {
    console.log(`UI Server listening on the port - ${port}`);
});
