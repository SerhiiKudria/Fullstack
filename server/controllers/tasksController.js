const { Task, User } = require('./../models');
const _ = require('lodash');
const createError = require('http-errors');

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });

    res.status(200).send({ data: foundTasks });
  } catch (e) {
    next(e);
  }
};

module.exports.createTask = async (req, res, next) => {
  const { body } = req;
  try {
    body.userId = process.env.TEST_USER_ID || 1;
   
    const createdTask = await Task.create(body);
    const preparedTask = _.omit(createdTask.get(), [
      'createdAt',
      'updatedAt',
    ]);
    
    res.status(201).send({ data: preparedTask });
  } catch (e) {
    // не ок - відправити 4** або 5** + помилку
    next(e);
  }
};


module.exports.getTaskById = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const foundTask = await Task.findByPk(taskId, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!foundTask) {
      return next(createError(404, 'Task Not Found'));
    }
    res.status(200).send({ data: foundTask });
  } catch (e) {
    next(e);
  }
};

module.exports.updateTaskById = async (req, res, next) => {
  const {
    body,
    params: { taskId },
  } = req;

  try {
    const [, [updatedTask]] = await Task.update(body, {
      raw: true,
      where: { id: taskId },
      returning: true,
    });

    if (!updatedTask) {
      return next(createError(404, 'Task Not Found'));
    }

    const preparedTask = _.omit(updatedTask, [
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedTask });
  } catch (e) {
    next(e);
  }
};



module.exports.deleteTaskById = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const deletedTaskCount = await Task.destroy({ where: { id: taskId } });

    if (!deletedTaskCount) {
      return next(createError(404, 'Task Not Found'));
    }

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};