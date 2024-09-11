import express from 'express';
import { createServer } from 'http';
import treeRoutes from './api/tree/tree.service.mjs'; // Adjust path as needed
import bodyParser from 'body-parser';

const appRouter = express.Router();

const app = express();
const server = createServer(app);

app.use(bodyParser.json());

app.use('/api/tree', treeRoutes);

const port = 3001;

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;
