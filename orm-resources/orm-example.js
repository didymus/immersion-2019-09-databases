/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

const Sequelize = require('sequelize');
const db = new Sequelize('chatter', 'root', '');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
const User = db.define('User', {
  username: Sequelize.STRING,
});

const Message = db.define('Message', {
  idUser: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
});

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
User.sync()
  .then(() => {
    // Now instantiate an object and save it:
    return User.create({ username: 'Jean Valjean' });
  })
  .then(() => {
    // Retrieve objects from the database:
    return User.findAll({
      where: {
        username: 'Jean Valjean',
      },
    });
  })
  .then((users) => {
    users.forEach((user) => {
      console.log(`${user.username} exists`);
    });
    db.close();
  })
  .catch((err) => {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });
