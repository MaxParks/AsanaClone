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
  * Response Body:
```
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
  * Response Body:
```
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
  * Response Body:
```
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "email": "Invalid email",
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
{
  "email": "john.smith@gmail.com",
  "password": "secret password"
}
```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com"
}
```

* Error Response: Invalid credentials

  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Response Body:

    ```
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors

  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Response Body:

    ```
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email is required",
        "password": "Password is required"
      }
    }
    ```

## Retrieve User Profile

Retrieve the user's profile information.

* Require Authentication: Yes
* Request
  * Method: GET
  * URL: /api/user/profile


* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
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
  * Response Body:
```
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

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
[
  {
    "id": 1,
    "owner_id": 1,
    "team_id": 1,
    "name": "Project A",
    "description": "a cool project",
    "due_date": "07/01/2023",
    "created_at": "2023-05-17T12:00:00Z"
  },
  {
    "id": 2,
    "owner_id": 2,
    "team_id": 1,
    "name": "Project B",
    "description": "a bad project",
    "due_date": "08/22/2023",
    "created_at": "2023-05-18T10:30:00Z"
  }
]
```

* Error Response: Unauthorized
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "message": "Unauthorized",
  "statusCode": 401
}
```


# Project Endpoints
## Retrieve All Projects

* Require Authentication: Yes

* Request
  * Method: GET
  * URL: /api/projects


* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
[
  {
    "id": 1,
    "owner_id": 1,
    "team_id": 1,
    "name": "Project A",
    "description": "a cool project",
    "due_date": "07/01/2023",
    "created_at": "2023-05-17T12:00:00Z"
  },
  {
    "id": 2,
    "owner_id": 2,
    "team_id": 1,
    "name": "Project B",
    "description": "a bad project",
    "due_date": "08/22/2023",
    "created_at": "2023-05-18T10:30:00Z"
  }
]
```

## Retrieve Project by ID

Retrieve a specific project by its ID.

* Require Authentication: Yes

* Request
  * Method: GET
  * URL: /api/projects/:id

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "id": 1,
  "owner_id": 1,
  "team_id": 1,
  "name": "Project A",
  "description": "a cool project",
  "due_date": "07/01/2023",
  "created_at": "2023-05-17T12:00:00Z"
}
```
* Error Response: Project not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "message": "Project not found",
  "statusCode": 404
}
```

## Create New Project

Create a new project.

* Require Authentication: Yes

* Request
  * Method: POST
  * URL: /api/projects
  * Headers:
    * Content-Type: application/json
  * Body:

```
{
  "owner_id": 1,
  "team_id": 1,
  "name": "Project A",
  "description": "a cool project",
  "due_date": "07/01/2023",
}
```
* Successful Response:
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "id": 1,
  "owner_id": 1,
  "team_id": 1,
  "name": "Project A",
  "description": "a cool project",
  "due_date": "07/01/2023",
  "created_at": "2023-05-17T12:00:00Z"
}
```
* Error Response: Invalid request body
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "message": "Invalid request body",
  "statusCode": 400
}
```
## Update Project

Update a specific project by its ID.

* Require Authentication: Yes
* Require proper authorization: Project must belong to the current user

* Request
  * Method: PUT
  * URL: /api/projects/:id
  * Parameters:
      * id (integer, required) - The unique identifier of the project.
  * Headers:
      * Authorization: Bearer {access_token}
      * Content-Type: application/json
  * Body:

```
{
  "name": "New Project Name",
  "description": "a cool project",
  "due_date": "07/01/2023",
}
```
* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "id": 1,
  "owner_id": 1,
  "team_id": 1,
  "name": "New Project Name",
  "description": "a cool project",
  "due_date": "07/01/2023",
  "created_at": "2023-05-17T12:00:00Z"
}
```
* Error Response: Project not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "message": "Project not found",
  "statusCode": 404
}
```

* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
    * Response Body:
```
{
  "message": "Forbidden",
  "statusCode": 403
}
```

## Delete Project

Delete a specific project by its ID.

* Require Authentication: Yes
* Require proper authorization: Project must belong to the current user

* Request
  * Method: DELETE
  * URL: /api/projects/:id

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
{
  "message": "Project not found",
  "statusCode": 404
}
```

* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "message": "Forbidden",
  "statusCode": 403
}
```


# Task Endpoints
## Retrieve all tasks

Retrieves all tasks.

* Require Authentication: Yes

* Request
  * Method: GET
  * URL: /api/tasks

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
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

## Retrieve a specific task by ID

Retrieves a specific task by its ID.

* Require Authentication: Yes

* Request
  * Method: GET
  * URL: /api/tasks/:id

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

  ```
  {
    "id": 1,
    "name": "Task 1",
    "description": "Description of Task 1",
    "assigned_to": 2,
    "due_date": "2023-05-20",
    "completed": false,
    "project_id": 1,
    "created_at": "2023-05-18T10:30:00Z"
    }
  ```

* Error Response: Task not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "message": "Task not found",
  "statusCode": 404
}
```


## Create a new task

Creates a new task.

* Require Authentication: Yes

* Request
  * Method: POST
  * URL: /api/tasks
  * Body:
  ```
  {
    "name": "New Task",
    "description": "Description of the New Task",
    "assigned_to": 3,
    "due_date": "2023-05-25",
    "completed": false,
    "project_id": 1
  }

  ```

  * Successful Response:
    * Status Code: 201
    * Headers:
      * Content-Type: application/json
    * Response Body:
    ```

    {
    "id": 3,
    "name": "New Task",
    "description": "Description of the New Task",
    "assigned_to": 3,
    "due_date": "2023-05-25",
    "completed": false,
    "project_id": 1,
    "created_at": "2023-05-18T14:15:00Z"
  }
    ```

  * Error Response: Invalid request body
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Response Body:
```
{
  "message": "Invalid request body",
  "statusCode": 400
}
```


## Update a specific task by ID

Updates a specific task by its ID.

* Require Authentication: Yes

* Request
  * Method: PUT
  * URL: /api/tasks/:id
  * Body:
  ```
    {
    "name": "Updated Task",
    "description": "Updated description",
    "assigned_to": 2,
    "due_date": "2023-05-23",
    "completed": true,
    "project_id": 1
  }
  ```

  * Successful Response:
    * Status Code: 200
    * Headers:
      * Content-Type: application/json
    * Response Body:
    ```
    {
      "id": 1,
      "name": "Updated Task",
      "description": "Updated description",
      "assigned_to": 2,
      "due_date": "2023-05-23",
      "completed": true,
      "project_id": 1,
      "created_at": "2023-05-18T10:30:00Z"
  }
    ```

  * Error Response: Task not found
    * Status Code: 404
    * Headers:
      * Content-Type: application/json
    * Response Body:

```
{
  "message": "Task not found",
  "statusCode": 404
}
```

* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "message": "Forbidden",
  "statusCode": 403
}
```


## Delete Task

Delete a specific task by its ID.

* Require Authentication: Yes
* Require proper authorization: Task must belong to the current user

* Request
  * Method: DELETE
  * URL: /api/tasks/:id


* Successful Response:
  * Status Code: 204
  * No response body is returned.

* Error Response: Task not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "message": "Task not found",
  "statusCode": 404
}
```

# Team Endpoints

## Retrieve all teams

Retrieves all teams.

* Require Authentication: Yes

* Request
  * Method: GET
  * URL: /api/teams

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
  [
    {
      "id": 1,
      "name": "Team A",
      "description": "A cool team",
      "created_at": "2023-05-17T12:00:00Z"
    },
    {
      "id": 2,
      "name": "Team B",
      "description": "Another cool team",
      "created_at": "2023-05-18T10:30:00Z"
    }
  ]
```

## Retrieve a specific team by ID

Retrieves a specific team by it's ID.

* Require Authentication: Yes

* Request

  * Method: GET
  * URL: /api/teams/:id

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
  {
  "id": 1,
  "name": "Team A",
  "description": "A cool team",
  "created_at": "2023-05-17T12:00:00Z"
}
```

* Error Response: Team not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Response Body:

```
{
  "message": "Team not found",
  "statusCode": 404
}
```


## Create a Team

Creates a new team.

* Require Authentication: Yes

* Request
  * Method: POST
  * URL: /api/teams

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```
  {
    "name": "New Task",
    "description": "Description of the New Task",
    "assigned_to": 3,
    "due_date": "2023-05-25",
    "completed": false,
    "project_id": 1
  }
  ```

  * Successful Response:
    * Status Code: 200
    * Headers:
      * Content-Type: application/json
    * Response Body:
    ```
    {
    "id": 3,
    "name": "New Task",
    "description": "Description of the New Task",
    "assigned_to": 3,
    "due_date": "2023-05-25",
    "completed": false,
    "project_id": 1,
    "created_at": "2023-05-18T14:15:00Z"
    }
    ```

* Error Response: Invalid request body
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "message": "Invalid request body",
  "statusCode": 400
}
```

## Update a specific team by ID

Updates a specific team by its ID.

* Require Authentication: Yes

* Request

  * Method: PUT
  * URL: /api/teams/:id
  * Body:

  ```
    {
    "name": "Updated Team",
    "description": "Updated team description"
  }
  ```

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```
  {
    "id": 1,
    "name": "Updated Team",
    "description": "Updated team description",
    "created_at": "2023-05-17T12:00:00Z"
  }
  ```

  * Error Response: Team not found
    * Status Code: 404
    * Headers:
      * Content-Type: application/json
    * Response Body:
```
{
  "message": "Team not found",
  "statusCode": 404
}
```

* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "message": "Forbidden",
  "statusCode": 403
}
```

## Delete Team

Delete a specific team by its ID.

* Require Authentication: Yes
* Require proper authorization: Team must belong to the current user

* Request
  * Method: DELETE
  * URL: /api/tasks/:id

* Successful Response:
  * Status Code: 204
  * No response body is returned.

* Error Response: Team not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Response Body:
```
{
  "message": "Team not found",
  "statusCode": 404
}
```
