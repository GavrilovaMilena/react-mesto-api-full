const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка. Данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(() => {
      const error = new Error('CastError');
      error.statusCode = 404;
      throw error;
    }).then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Невозможно удалить чужую карточку'));
      } else {
        Card.findByIdAndRemove(req.params._id)
          .orFail(() => {
            const error = new Error('CastError');
            error.statusCode = 404;
            throw error;
          }).then(() => {
            if (!card) {
              next(new NotFoundError('Карточка не найдена'));
            } else {
              Card.deleteOne(card);
              res.status(200).send({
                message: 'Карточка удалена успешно',
              });
            }
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Данные некорректны'));
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};
