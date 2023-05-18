# Asana Clone

## Database Schema Design
![Screenshot 2023-05-18 at 5 16 05 PM](https://github.com/MaxParks/AsanaClone/assets/107880032/680a49c3-a58e-42a3-9a23-0076bcbd8033)


# API Documentation
## USER AUTHENTICATION/AUTHORIZATION
## All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: Endpoints that require authentication
 
 *  Error Response: Require authentication
    * Status Code: 401

  * Headers:
      * Content-Type: application/json
  * Body:

```

{
  "message": "Authentication required",
  "statusCode": 401
}
```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

* Request: Endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403

  * Headers:
    * Content-Type: application/json
* Body:

```

{
  "message": "Forbidden",
  "statusCode": 403
}
```

#  User Endpoints
##  Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

* Require Authentication: No

* Request
  * Method: POST
  * URL: /api/users
  * Headers:
     * Content-Type: application/json
* Body:
```
json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "password": "secret password"
}
```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
* Body:
```
json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com"
}
```

* Error Response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:
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

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
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

##  Log In a User

Authenticate and log in a user.

* Require Authentication: No
* Request
  * Method: POST
  * URL: /api/login
  * Headers:
    * Content-Type: application/json
  * Body:
```
json

{
  "email": "john.smith@gmail.com",
  "password": "secret password"
}
```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
```
json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com"
}
```

* Error Response: Unauthorized
  * Status Code: 401
  * Headers:
  * Content-Type: application/json
  * Body:
``` 
json

{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## Retrieve User Profile

Retrieve the user's profile information.

* Require Authentication: Yes
* Request
  * Method: GET
  * URL: /api/user/profile
  * Headers:
    * Authorization: Bearer {access_token}

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
```
json

{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com"
}
```

* Error Response: Unauthorized
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:
```
json

{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## Retrieve User Projects

Retrieve the projects associated with the user.

* Require Authentication: Yes
* Require proper authorization: Projects must belong to the current user

* Request
  * Method: GET
  * URL: /api/user/projects
  * Headers:
    * Authorization: Bearer {access_token}

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
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

* Error Response: Unauthorized
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
* Body:
```
json

{
  "message": "Unauthorized",
  "statusCode": 401
}
```

* Error Response: Require proper authorization
* Status Code: 403
* Headers:
    * Content-Type: application/json
* Body:
```
{
  "message": "Forbidden",
  "statusCode": 403
}
```

# Project Endpoints
## Retrieve All Projects

* Require Authentication: Yes

* Request 
  * Endpoint: /api/projects 
  * Method: GET


* Successful Response:
  * Status Code: 200
  * Headers:
    * Authorization: Bearer {access_token}
    * Content-Type: application/json
  * Response Body:

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
* Error Response: None

## Retrieve Project by ID

Retrieve a specific project by its ID.
 
* Require Authentication: Yes

* Request 
  * Endpoint: /api/projects/{id}
  * Method: GET

* Parameters:
  * id (integer, required) - The unique identifier of the project.
   
* Successful Response:
  * Status Code: 200
  * Headers:
    * Authorization: Bearer {access_token}
    * Content-Type: application/json
* Response Body:

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
* Error Response: Project not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
* Response Body:

```
json

{
  "message": "Project not found",
  "statusCode": 404
}
```
## Create New Project

Create a new project.

* Require Authentication: Yes

* Request
  * Endpoint: /api/projects
  * Method: POST
  * Headers:
    * Content-Type: application/json
* Request Body:

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
* Successful Response:
  * Status Code: 201
  * Headers:
    * Authorization: Bearer {access_token}
    * Content-Type: application/json
* Response Body: 

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
* Error Response: Invalid request body
  * Status Code: 400 
  * Headers: 
    * Content-Type: application/json
* Response Body:

```
json

{
  "message": "Invalid request body",
  "statusCode": 400
}
```
## Update Project

Update a specific project by its ID.

* Require Authentication: Yes
* Require proper authorization: Project must belong to the current user
Parameters:

* Request
  * Endpoint: /api/projects/{id}
  * Method: PUT
  * Parameters: 
      * id (integer, required) - The unique identifier of the project.
  * Headers:
      * Authorization: Bearer {access_token}
      * Content-Type: application/json
* Request Body:

```
json

{
  "name": "New Project Name",
  "privacy": false,
  "format": "true"
}
```
* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
* Response Body:

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
* Error Response: Project not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
* Response Body:

```
json

{
  "message": "Project not found",
  "statusCode": 404
}
```

* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
* Body:
```
{
  "message": "Forbidden",
  "statusCode": 403
}
```
## Delete Project

* Delete a specific project by its ID.

* Require Authentication: Yes
* Require proper authorization: Project must belong to the current user

* Request 
  * Endpoint: /api/projects/{id}
  * Method: DELETE
  * Parameters:
    * id (integer, required) - The unique identifier of the project.

* Successful Response:
  * Status Code: 204
  * Headers:
    * Authorization: Bearer {access_token}

* No response body is returned.

* Error Response: Project not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
* Response Body:
```
json

{
  "message": "Project not found",
  "statusCode": 404
}
```

# Task Endpoints
## Retrieve all tasks

* Require Authentication: Yes

* Request 
  * Endpoint: /api/tasks
  * Method: GET

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
```
json
[
  {
    "id": 1,
    "name": "Task 1",
    "description": "Description of Task 1",
    "assigned_to": 2,
    "due_date": "2023-05-20",
    "completed": false,
    "project_id": 1,
    "created_at": "2023-05-18T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Task 2",
    "description": "Description of Task 2",
    "assigned_to": 3,
    "due_date": "2023-05-22",
    "completed": false,
    "project_id": 1,
    "created_at": "2023-05-18T11:45:00Z"
  }
]
```
