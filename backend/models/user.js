const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Рик Санчез',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Гениальный учёный',
  },
  avatar: {
    type: String,
    default:
      'http://pm1.narvii.com/6878/7590f2750286a5952f65d5a0ebebc8f328b8163br1-720-901v2_00.jpg',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
function findUserByCredentials(email, password) {
  // попытаемся найти пользовател по почте
  return this.findOne({ email }) // this — это модель User
    .select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }

        return user; // теперь user доступен
      });
    });
}
userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
