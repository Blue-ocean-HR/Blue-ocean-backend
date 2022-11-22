module.exports.getItemStatement =
'SELECT * FROM pantry WHERE user_id = (SELECT id FROM users WHERE email = $1)'