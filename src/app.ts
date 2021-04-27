import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import 'reflect-metadata';

import './database';

import routes from './routes';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  response.render('html/client.html');
});

app.get('/pages/admin', (request, response) => {
  response.render('html/admin.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket) => {
  console.log('Se conectou', socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };