'use strict';
import express from 'express'
import Admin from '../controller/admin'
const router = express.Router()
router.post('/register', Admin.register);
router.post('/login', Admin.login);
export default router