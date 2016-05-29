var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:rh871530@localhost:5432/dailyExpense';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, name VARCHAR(40) not null,amount MONEY, transactionDate DATE, complete BOOLEAN)');
query.on('end', function() { client.end(); });
