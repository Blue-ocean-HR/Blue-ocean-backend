module.exports.addUserText = `
insert into users (email)
values
  ($1);
`