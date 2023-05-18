User Endpoints
Sign Up a User
Create a new user account.

Endpoint: /api/signup
Method: POST
Require Authentication: No
Headers:

Content-Type: application/json
Request Body:

json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "password": "secret password"
}
Successful Response:
Status Code: 200
Headers:

Content-Type: application/json
Response Body:

json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "token": ""
}
Error Response: User already exists with the specified email
Status Code: 403
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "User already exists",
  "statusCode": 403,
  "errors": {
    "email": "User with that email already exists"
  }
}
Error Response: User already exists with the specified username
Status Code: 403
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "User already exists",
  "statusCode": 403,
  "errors": {
    "username": "User with that username already exists"
  }
}
Error Response: Body validation errors
Status Code: 400
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "email": "Invalid email",
    "username": "Username is required",
    "firstName": "First Name is required",
    "lastName": "Last Name is required"
  }
}

Log in a User
Authenticate and log in a user.

Endpoint: /api/login
Method: POST
Require Authentication: No
Headers:

Content-Type: application/json
Request Body:

json

{
  "email": "john.smith@gmail.com",
  "password": "secret password"
}
Successful Response:
Status Code: 200
Headers:

Content-Type: application/json
Response Body:

json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "token": "access_token"
}
Error Response: Invalid email or password
Status Code: 401
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "Invalid email or password",
  "statusCode": 401
}

Retrieve User Profile
Retrieve the user's profile information.

Endpoint: /api/user/profile
Method: GET
Require Authentication: Yes
Headers:

Authorization: Bearer {access_token}
Successful Response:
Status Code: 200
Headers:

Content-Type: application/json
Response Body:

json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith"
}
Error Response: Unauthorized
Status Code: 401
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "Unauthorized",
  "statusCode": 401
}

Retrieve User Projects
Retrieve the projects associated with the user.

Endpoint: /api/user/projects
Method: GET
Require Authentication: Yes
Headers:

Authorization: Bearer {access_token}
Successful Response:
Status Code: 200
Headers:

Content-Type: application/json
Response Body:

json

[
  {
    "id": 1,
    "name": "Project A",
    "privacy": true,
    "format": true,
    "created_at": "2023-05-17T12:00:00Z"
  },
  {
    "id": 2,
    "name": "Project B",
    "privacy": false,
    "format": true,
    "created_at": "2023-05-18T10:30:00Z"
  }
]
Error Response: Unauthorized
Status Code: 401
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "Unauthorized",
  "statusCode": 401
}

Retrieve User Teams
Retrieve the teams the user is a part of.

Endpoint: /api/user/teams
Method: GET
Require Authentication: Yes
Headers:

Authorization: Bearer {access_token}
Successful Response:
Status Code: 200
Headers:

Content-Type: application/json
Response Body:

json

[
  {
    "id": 1,
    "user_id": 1,
    "role": "Team Member",
    "joined_at": "2023-05-17T12:00:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "role": "Team Leader",
    "joined_at": "2023-05-18T10:30:00Z"
  }
]
Error Response: Unauthorized
Status Code: 401
Headers:

Content-Type: application/json
Response Body:

json

{
  "message": "Unauthorized",
  "statusCode": 401
}

