// * REQUIRE PACKAGES *
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const querystring = require('node:querystring');
const { v4: uuidv4 } = require('uuid');

// * INITALISE EXPRESS AND DEFINE A PORT *
const app = express();
const port = process.env.PORT || 3000;

// * ASSIGN GLOBAL VARIABLES *
const clientId = process.env.TODOIST_CLIENT_ID;
const clientSecret = process.env.TODOIST_CLIENT_SECRET;
const scope = 'data:read_write,data:delete,project:delete';
const sentState = uuidv4();
const authorizationURL = 'https://todoist.com/oauth/authorize';
const tokenURL = 'https://todoist.com/oauth/access_token';
let accessToken;

// STEP 1: AUTHORIZATION REQUEST

app.get('/auth', (req, res) => {
	const query = {
		'client_id': clientId,
		'scope': scope,
		'state': sentState,
	};
	res.redirect(`${authorizationURL}?${querystring.stringify(query)}`);
});

// STEP 2: REDIRECTION TO YOUR APPLICATION SITE

app.get('/return', (req, res) => {
	const {
		code: authorizationCode,
		state: receivedState,
	} = req.query;

	const data = {
		'client_id': clientId,
		'client_secret': clientSecret,
		'code': authorizationCode,
	};

	if (sentState !== receivedState) {
		console.error('Authorization failed');
		res.send('Authorization failed');
	}

	// STEP 3: TOKEN EXCHANGE

	if (sentState === receivedState) {
		axios.post(tokenURL, data)
			.then((response) => { accessToken = response.data.access_token; })
			.catch((error) => { console.error(error); });
		console.log('Authorization succeeded');
		res.send('Authorization succeeded');
	}

	// STEP 4: ACCESS TOKEN

	console.log(accessToken);
});

// * LISTEN TO P0RT *
app.listen(port, console.log(`🚀 Server listening on port ${port}`));

/*
const config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
};
*/
