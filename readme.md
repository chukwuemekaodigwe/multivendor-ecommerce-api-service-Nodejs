### README for the Project
# Authorization Module
We have three user levels, the free users who are the customers who visit the shop; the Paid User who are the vendors, then the Admin. Each has its own priviledges. You could specify the priviledge of a route by using a middleware i already created

```
minimumPermissionLevelRequired()
```
Expore the module at `/src/common/middlewares/auth.permission.middleware.ts` to know more about the priviledges

Each here has an access token which you can use to autheticate the system else you could create a new account through the routes
```
1) POST /users/createAdmin  // for admin account

2) POST /users   //for paid account
````

FREE USER

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9kaWd3ZUBnbWFpbC5jb20iLCJwZXJtaXNzaW9uTGV2ZWwiOjEsInByb3ZpZGVyIjoiZW1haWwiLCJuYW1lIjoiT2RpZ3dlIE1hbGFjaHkiLCJyZWZyZXNoS2V5IjoiaDJxVkl6M011U1BSMlZOaWJIUlhIZz09IiwiaWF0IjoxNzAyNjM4OTk1fQ.eWW1Y94nq3c8YU4cthyF9AXKv1attZhQrwYd5lgLq54",
    "refreshToken": "ZGVLWmJSSVNRV2lIRmJpdHhESGh3T210SzdDRzFvcE14WENZcFFhRkZydDN6NEFWREJYNURNUnJzL0dxd0dDdncrbjIvNjUvd25RS0lCN25PK1Fyc2c9PQ=="
}

PAID USER
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdjNDE2ZmQ5YTg4MmE3OTg5YTIzZmEiLCJlbWFpbCI6Im9kaWd3ZTIzNEBnbWFpbC5jb20iLCJwZXJtaXNzaW9uTGV2ZWwiOjQsInByb3ZpZGVyIjoiZW1haWwiLCJuYW1lIjoiT2RpZ3dlIE1hbGFjaHkiLCJyZWZyZXNoS2V5IjoiMEowdTRuK1VOcCtBaHdDUlVxZVhtdz09IiwiaWF0IjoxNzAyNjQ0NjAwfQ.ZnZ79DFfS33XaKIKD0oie49DqrwTqwDJ68C4Rpst1Q4",
    "refreshToken": "QmlPWDRKZUVVYkN2QnJELzNNaUQ5bVNON3BTNGxVa1AyTjNIeTJpRkJFQjZaTmYvMHBMNUtEa3dpQ09UODZ0ZnFjOHI3WFcxK0tFMWZRUFBpUTBTeEE9PQ=="
}

ADMIN

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdjMzMxNGU2ZDJhZjQwZTMzZTljOWYiLCJlbWFpbCI6Im9kaWd3ZUBnbWFpbC5jb20iLCJwZXJtaXNzaW9uTGV2ZWwiOjIwNDgsInByb3ZpZGVyIjoiZW1haWwiLCJuYW1lIjoiT2RpZ3dlIE1hbGFjaHkiLCJyZWZyZXNoS2V5IjoiZkNCRHphVkdJVUYwWmZXaENCT2puQT09IiwiaWF0IjoxNzAyNjQ1MDg1fQ.WNaATZdOs37mVThJRf1U4rqsavk7RWeYsa06e6HAJzs",
    "refreshToken": "dDlnSWkrZ2lvZHBVT3hRM09LamM2QnJaM0lTYTk3SVlzamEwRndwMTdkSXBvdUNmV2hmRFBXS09NZFZqOTRoWmZWOVB0T1F5WUpaQnVPNlVVVFpDZXc9PQ=="
}


The access token is added as an authorization header of the form:

```
const token = 'ACCESS_TOEKN'
authorization: `Bearer ${token}`

````

Then at the backend, the autheciated user details as seen below could be accessed by calling

```
const user = req.jwt
console.log(user.userId)  // for the user id

````
Through this you could access the authenenticated user id to perform any operations you wish.  


At the database the authenticated user or vendor is seen as `vendorId`. This enables you to associate a record to its owner


I have created some routes

POST /auth  for login
POST /users FOR adding new account or vendor
POST /users/createAdmin to add new admin account
GET /users for list of VENDORS
GET | PATCH | DELETE ``` /users/:userId ```` for specific user operations


AUTHENTICATED USER
````
{
    userId: '657c3314e6d2af40e33e9c9f',
    email: 'odigwe@gmail.com',
    permissionLevel: 2048,
    provider: 'email',
    name: 'Odigwe Malachy',
    refreshKey: 'fCBDzaVGIUF0ZfWhCBOjnA==',
    iat: 1702645085
}

  ````
  Use the ```refreshkey```` to refresh the accestoken if it expires  
  POST /auth/refresh
  req.body = refresh_token


### Project Structure
The project have been structed in modules. Each feature has its own directory which houses other directories realted tot the project.
Each module has a models directory, controller directory, middleware drectory and a route file. It could also be extended to accomdated other files/directory
like services

In the project directory, we have `common` directory which houses any route, service, controller or middleware generally used by other modules.
The enables team member who wish to take ownership of a module or feature to do that effectively. And also encouraging colloraboration,
efficiency and maintainability. So we are encouraged to maintain the structure

The main project directory is the `/src` directory in the root. So every other parts odf the project code resides in that /src directory

While making commits, you a branch so the admin could keep track of the project and merge them without confusion.
