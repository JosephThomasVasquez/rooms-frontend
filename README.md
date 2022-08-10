# QuickList App

## Checklist and Directory manager

## Demo [Here](https://rooms-frontend.vercel.app/user/login)

<hr>

## **Desciption**

A checklist manager for routine checks of item lists, locations, services, equipment, or anything that could use a checklist for tracking purposes.

## **Features**

- ### **Users**

  - Register User (email & password)
  - Login User
  - Logout User

- ### **Authentication**

  - Password encryption and decryption
  - Password Strength Pattern
  - JsonWebToken encryption and verification
  - Cookie creation and verification

- ### **Checklist Templates**

  - Create Template
  - Edit Template
  - Delete Template
  - **Template Options:**
    - Template Name
    - Location
    - Description
    - Input multiple items
    - Toggle `Sharing` so all other users can use the template

- ### **Checklists**

  - Create Checklist from Template
  - Edit Checklist i.e. (Toggle items completed or not)
  - View Checklist Items

- **Dashboard**
  - Display welcome message of user `first_name`
  - Show Recent Items (Not yet Implemented)

- ### **Admin**
  - Add User to Account
  - Edit User Details*
  - Set Role of users to *User* or *Admin*
  - Has all template features as general user
  - View Templates as a table with additional such as percentage complete, styling, and amount of items completed per checklist
  - Download checklists from `start date` and `end date` as a **`.csv`** file.
  - **Directory:**
    - Add Rooms
    - Edit Rooms
    - List Rooms in Table
    - Add Buildings
    - Edit Buildings
    - List Buildings as cards

## **Stack**

### Front-End:

- React
- React Router 6
- Bootstrap 5
- @heroicons/react
- Dayjs
- Javascript
- HTML
- CSS

### Back-End:

- Node
- Express
- PostgreSQL
- Knex
- JWT
- json2csv
- bcrypt
