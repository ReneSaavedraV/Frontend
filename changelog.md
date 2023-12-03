# Changelog ⚙

### General

* Added eslint and custom rules
* Changed `README` and added setup instructions

### Session Management

* Added `src/auth/` folder with context handling the session and token (based on the mock project) using local storage
* Floppy auth workflow and variable navbar elements based on session (FIX THIS)
* Profile now displays user info for current sesh
* Edit profile now working on a basic level (FIX THIS TOO, NEED TO ADD VALIDATION AND SCOPE TO EDIT ONLY THE USER IN THE CURRENT SESSION)

# To Do 📝

* Remove `loggedIn` state. Just check for token nullity (gotta fix this because token isn't actually null, just a string loooolllllll)