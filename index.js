const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send( '<h1>Hotel Site: Raspberry Pi Edition </h1><p>Status: Local Development Active</p>');
});

app.listen(PORT, () => {
    comsole.log(`Server running at http://localhost:${PORT}`);
});