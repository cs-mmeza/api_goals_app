const db = require('./config')

function requestAll(table, account_id, callback) {
    db.any(`SELECT * FROM ${table} WHERE account_id = ${account_id}`)
        .then(result => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        });
}

function requestOne(table, id, callback) {
    db.any(`SELECT * FROM ${table} WHERE id = ${id}`)
        .then(result => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        });
}

function requestAccount(username, callback) {
    db.any(`SELECT * FROM accounts WHERE username = '${username}'`)
        .then(result => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        });
}

function create(table, item, callback) {
    const keys = Object.keys(item);
    const properties = keys.join(', ');
    const values = keys.map(key => `'${item[key]}'`).join(', ');

    db.any(`INSERT INTO ${table} (${properties}) VALUES(${values}) returning *`)
        .then(([result]) => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        });
}

function update(table, id, item, callback) {
    const keys = Object.keys(item);
    const updates = keys.map(key => `${key} = '${item[key]}'`).join(', ');

    const sql = `UPDATE ${table} SET ${updates} WHERE id = ${id} returning *`;
    db.any(sql)
        .then(([result]) => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        });
}

function remove(table, id, callback) {
    db.any(`DELETE FROM ${table} WHERE id = ${id}`)
        .then(() => {
            callback(null);
        })
        .catch(error => {
            callback(error);
        });
}

module.exports = {
    requestAll, 
    requestOne,
    requestAccount, 
    create, 
    update, 
    remove};


// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })