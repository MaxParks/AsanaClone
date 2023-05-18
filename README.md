#User Endpoints

##Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

Require Authentication: No

Request

Method: POST
URL: /api/users
Headers:
Content-Type: application/json
Body:
```
json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "password": "secret password"
}
```
Successful Response

Status Code: 200
Headers:
Content-Type: application/json
Body:
```
json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "token": ""
}
```
Error Response: User already exists with the specified email

Status Code: 403
Headers:
Content-Type: application/json
Body:
```
json

{
  "message": "User already exists",
  "statusCode": 403,
  "errors": {
    "email": "User with that email already exists"
  }
}
```
Error Response: User already exists with the specified username

Status Code: 403
Headers:
Content-Type: application/json
Body:
```
json

{
  "message": "User already exists",
  "statusCode": 403,
  "errors": {
    "username": "User with that username already exists"
  }
}
```
Error Response: Body validation errors

Status Code: 400
Headers:
Content-Type: application/json
Body:
```
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
```
##Log In a User
Authenticate and log in a user.

Require Authentication: No

Request

Method: POST
URL: /api/login
Headers:
Content-Type: application/json
Body:
```
json

{
  "email": "john.smith@gmail.com",
  "password": "secret password"
}
```
Successful Response

Status Code: 200
Headers:
Content-Type: application/json
Body:
```
json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "token": ""
}
```
Error Response: Unauthorized

Status Code: 401
Headers:
Content-Type: application/json
Body:
``` 
json

{
  "message": "Unauthorized",
  "statusCode": 401
}
```
##Retrieve User Profile
Retrieve the user's profile information.

Require Authentication: Yes

Request

Method: GET
URL: /api/user/profile
Headers:
Authorization: Bearer {access_token}
Successful Response

Status Code: 200
Headers:
Content-Type: application/json
Body:
```
json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith"
}
```
Error Response: Unauthorized

Status Code: 401
Headers:
Content-Type: application/json
Body:
```
json

{
  "message": "Unauthorized",
  "statusCode": 401
}
```
##Retrieve User Projects
Retrieve the projects associated with the user.

Require Authentication: Yes

Request

Method: GET
URL: /api/user/projects
Headers:
Authorization: Bearer {access_token}
Successful Response

Status Code: 200
Headers:
Content-Type: application/json
Body:
```
json

[
  {
    "id": 1,
    "owner_id": 1,
    "team_id": 1,
    "name": "Project A",
    "privacy": true,
    "format": true,
    "created_at": "2023-05-17T12:00:00Z"
  },
  {
    "id": 2,
    "owner_id": 2,
    "team_id": 1,
    "name": "Project B",
    "privacy": false,
    "format": true,
    "created_at": "2023-05-18T10:30:00Z"
  }
]
```
Error Response: Unauthorized

Status Code: 401
Headers:
Content-Type: application/json
Body:
```
json

{
  "message": "Unauthorized",
  "statusCode": 401
}
```

#Project Endpoints
##Retrieve All Projects

Endpoint: /api/projects
Method: GET
Require Authentication: Yes

Successful Response:
Status Code: 200
Headers:

Authorization: Bearer {access_token}
Content-Type: application/json
Response Body:

```
json

[
  {
    "id": 1,
    "owner_id": 1,
    "team_id": 1,
    "name": "Project A",
    "privacy": true,
    "format": true,
    "created_at": "2023-05-17T12:00:00Z"
  },
  {
    "id": 2,
    "owner_id": 2,
    "team_id": 1,
    "name": "Project B",
    "privacy": false,
    "format": true,
    "created_at": "2023-05-18T10:30:00Z"
  }
]
```
Error Response: None

##Retrieve Project by ID
Retrieve a specific project by its ID.

Endpoint: /api/projects/{id}
Method: GET
Require Authentication: Yes
Parameters:

id (integer, required) - The unique identifier of the project.
Successful Response:
Status Code: 200
Headers:

Authorization: Bearer {access_token}
Content-Type: application/json
Response Body:

```
json
Copy code{
  "id": 1,
  "owner_id": 1,
  "team_id": 1,
  "name": "Project A",
  "privacy": true,
  "format": true,
  "created_at": "2023-05-17T12:00:00Z"
}
```
Error Response: Project not found
Status Code: 404
Headers:

Content-Type: application/json
Response Body:

```
json

{
  "message": "Project not found",
  "statusCode": 404
}
```
##Create New Project
Create a new project.

Endpoint: /api/projects
Method: POST
Require Authentication: Yes
Headers:

Content-Type: application/json
Request Body:

```
json

{
  "owner_id": 1,
  "team_id": 1,
  "name": "Project A",
  "privacy": true,
  "format": true
}
```
Successful Response:
Status Code: 201
Headers:

Authorization: Bearer {access_token}
Content-Type: application/json
Response Body:

```
json

{
  "id": 1,
  "owner_id": 1,
  "team_id": 1,
  "name": "Project A",
  "privacy": true,
  "format": true,
  "created_at": "2023-05-17T12:00:00Z"
}
```
Error Response: Invalid request body
Status Code: 400
Headers:

Content-Type: application/json
Response Body:

```
json

{
  "message": "Invalid request body",
  "statusCode": 400
}
```
##Update Project
Update a specific project by its ID.

Endpoint: /api/projects/{id}
Method: PUT
Require Authentication: Yes
Parameters:

id (integer, required) - The unique identifier of the project.
Headers:

Authorization: Bearer {access_token}
Content-Type: application/json
Request Body:

```
json

{
  "name": "New Project Name",
  "privacy": false
}
```
Successful Response:
Status Code: 200
Headers:

Content-Type: application/json
Response Body:

```
json

{
  "id": 1,
  "owner_id": 1,
  "team_id": 1,
  "name": "New Project Name",
  "privacy": false,
  "format": true,
  "created_at": "2023-05-17T12:00:00Z"
}
```
Error Response: Project not found
Status Code: 404
Headers:

Content-Type: application/json
Response Body:

```
json

{
  "message": "Project not found",
  "statusCode": 404
}
```
##Delete Project
Delete a specific project by its ID.

Endpoint: /api/projects/{id}
Method: DELETE
Require Authentication: Yes
Parameters:

id (integer, required) - The unique identifier of the project.
Successful Response:
Status Code: 204
Headers:

Authorization: Bearer {access_token}

No response body is returned.
Error Response: Project not found
Status Code: 404
Headers:

Content-Type: application/json
Response Body:
```
json

{
  "message": "Project not found",
  "statusCode": 404
}
```
