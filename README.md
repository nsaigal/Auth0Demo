# Auth0Demo

I've built a basic proof of concept where the user can login using Auth0 via the web auth UI. Here is the current flow:
1. I created the Auth0 app / admin user here: https://manage.auth0.com/dashboard/us/dev-q514-v6g/
2. The user logs in with authorized username/password credentials - this generates an access token.
3. We store the access token / refresh token in the keychain (iOS) / shared preferences (Android)
4. If successfully authenticated, we navigate the user to the Main screen
5. We use the access token to authorize the User Info api call & display "Welcome, {name}!"
6. Next time the user opens the app we check if the access token has expired. If so, we use the refresh token to generate a new access token
