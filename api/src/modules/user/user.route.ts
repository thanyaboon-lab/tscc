import express from 'express';
import { userController } from './user.bootstrap';
import { Router } from '@tscc/core';

const router = new Router();

router.get('/', userController.getAll);
// router.route('/').get(userController.getAll);
// router.route('/:id').get(userController.get);
// router.route('/').post(userController.create);
// router.route('/:id').put(userController.update);
// router.route('/:id').delete(userController.delete);

export default router.instance;
