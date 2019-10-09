const { app } = require('./app');

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
