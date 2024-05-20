const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist/my-angular-app')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/my-angular-app', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
