# Todoist Oauth

## Configuration

### Variables
1. Go to the [App Management Console](https://developer.todoist.com/appconsole.html)
2. Click on *'Create a new app'*, fill in your application's name and click on *'Create app'*.
4. Add the received Client ID, the Client secret and the port that Express.JS will listen to in the `.env` file:

```
TODOIST_CLIENT_ID=<add your Client ID>
TODOIST_CLIENT_SECRET=<add your Client Secret>
PORT=3000
```
5. Modify the `port` constant (*'3000'*) with the backup port that Express.JS will listen to.
6. Modify the `scope` constant with the permissions that you would like the users to grant to your application

### Route
1. Go to the [App Management Console](https://developer.todoist.com/appconsole.html)
2. Fill in the OAuth redirect URL for your application and click on the *'Save settings'* button.
3. Replace *'/return'* with the route that you chose in the previous step.
```
app.get('/return', (req, res) => {
```
4. *(Optionally)* Replace *'/auth'* with the endpoint that you want to use for the authorization.
```
app.get('/return', (req, res) => {
```
