const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const database = {
	users: [
		{
			id: '1',
			name: 'John',
			email: 'john@gmail.com',
			password: '1234',
			entries: 0,
			joined: new Date()
		},
		{
			id: '2',
			name: 'David',
			email: 'david@gmail.com',
			password: '12321',
			entries: 0,
			joined: new Date()
		}
	]
};

app.get('/', (req, res) => res.send(database.users));

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.status(400).json('no such user');
	}
});

app.post('/signin', (req, res) => {
	database.users.forEach((user) => {
		if (req.body.email === user.email && req.body.password === user.password) {
			user.json();
			return;
		}
	});
	res.status(400).json('error logging in');
	return;
});

app.post('/signup', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: database.users.length,
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length - 1].name + ' created');
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json('no such user');
	}
});

app.listen(3001, () => {
	console.log('app is working on port 3001');
});
