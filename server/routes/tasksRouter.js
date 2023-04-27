const { Router } = require('express');
const { tasksController } = require('../controllers');

const tasksRouter = Router();


tasksRouter
  .route('/')
  .post(tasksController.createTask)
  .get(tasksController.getTasks);

tasksRouter
  .route('/:taskId')
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTaskById)
  .delete(tasksController.deleteTaskById);

  
module.exports = tasksRouter;
