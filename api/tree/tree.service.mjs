// routes/tree.mjs
import express from 'express';
import { getTree, addNode } from './tree.controller.mjs';

const treeRoutes = express.Router();

treeRoutes.get('/', getTree);
treeRoutes.post('/', addNode);

export default treeRoutes;
