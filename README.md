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
