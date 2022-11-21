
const fs = require('fs')
const path = require('path');
const connectionPool = require('./connect.js')

const populate = fs.readFileSync(path.resolve(__dirname, '../finalSchemaBO.sql')).toString();

connectionPool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(`connected to '${client.database}' on port ${client.port}`)
  console.log('creating tables and importing csv...')
  connectionPool.query(populate, function(err, result){
    if(err){
        console.log('Error when trying to seed database: ', err);
        process.exit(1);
    }
    console.log('Success! Populating database complete')
    process.exit(0);
  });

})

