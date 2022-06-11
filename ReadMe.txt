This project based on APIs Build for Login System. We are developing APIs for like Login, Sign and up etc. We are test in PostMan Software. 

Features Of Project:

1.Login (token auth)
2.Sign up (password hashing)
3.Forget password (token auth)
4.password reset by email (send email for password reset) (token auth)
5.Change Password (token auth)

Installation Requirement for Project -

Editor VS Code (Your Wish)
Postman Software (For api test)

1. nodemon - npm install -D nodemon (for continouse run on save file)
2. express - npm install express (api build  - request and response handle)
3. dotenv - npm i dotenv (Declare cridential data info and access where we need)
4. bcrypt - npm i bcrypt (password hashing)
5. cors - npm i cors (connection for frontend with backend when run both script at same time)
6. jsonwebtoken - npm i jsonwebtoken (authentication for user login/signup/logout)
7. mongodb - npm i mongoose (mongo database)
8. nodemailer - npm i nodemailer (send email for password reset)


Folder Structure - 
1.Models- Define the Schema of database collections
2.Controllers - Handle all actions (like - login, signup, forget password, reset password etc)
3.Routes - defines all routes for url access and unaccess url from browser
4.Middleware - 
5.Confige - Store all configurations file (like mongodb connection, email connection etc)




response status code 

100 - user register successfully
101 - Password and Confirm Password do not match
102 - All fields are required.
103 - user already exists