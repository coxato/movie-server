const { app } = require('./app');
const { runDBAndServer } = require('./server');

runDBAndServer(app)
    .then( () => console.log('app running'))
    .catch( err => console.log('app not running ' + err.message));
