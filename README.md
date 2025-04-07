# MUSIC_BOOKING APP
# music_booking_api
The Music 🎵 Booking API is a powerful backend service that connects artists 🎤, event organizers 🎟️, and music lovers 🎶 seamlessly. 
Organizers can create and manage event listings 📅, while artists can showcase their profiles 🖼️ and apply for gigs. 
The API ensures secure booking transactions 💳 and role-based access 🔒 for different users. 
Built with Node.js 🟢, Express 🚀, TypeScript 📜, and MongoDB 🍃, it offers scalability ⚡ and high performance. 
Artists can be easily discovered 🔍, and event organizers can streamline their bookings ✅ with ease. 
Prioritizing security 🔐, efficiency, and user-friendly interactions, this API enhances the live music 🎼 experience. 
Whether you're an artist 🎸 looking for gigs or an organizer 🎭 seeking top talent, this API bridges the gap effortlessly!

### Postman Pic https://documenter.getpostman.com/view/25014777/2sB2cSgiao
![music_postman_testing](https://github.com/user-attachments/assets/44ac1f5e-8ea7-4f65-93b9-7b0ac4ae9423)




## About 
* 👋 Hi, I’m Chidike Henry
* 😎 I’m a fullstack developer
* 💻 This is Music booking API, which I built that connects artists 🎤, event organizers 🎟️, and music lovers 🎶 seamlessly. 
* 💞️ I’m looking to collaborate on JS and DevOps projects
* 📫 How to reach me chidike.henry@gmail.com


## Introduction
The Music Booking API project is designed to assess my ability to build a scalable, efficient, and secure backend system for managing artists, events, and bookings. 
It evaluates my expertise in API design, database optimization, and asynchronous processing to handle complex user interactions. 
The project also tests my ability to implement role-based access control, ensuring secure and seamless interactions between artists and event organizers. 
Additionally, it examines my approach to data validation, error handling, and enforcing business rules to maintain system integrity. 
My skills in real-time data updates, pagination, and query optimization are also being assessed. 
The API's architecture must support high traffic loads, ensuring fast response times and smooth user experiences. 
Furthermore, my ability to write comprehensive documentation and collaborate effectively to deliver a production-ready system is a key aspect of the evaluation.

## The Task
So, I am to create a service for the Music Booking App that does this:
* Develop an API that manages artist profiles, event listings, and booking transactions 🎤🎟️.
* Implement role-based access control (RBAC) to differentiate between artists, event organizers, and admin users 🔑.
* Design and optimize a scalable database schema using MongoDB (Mongoose) to efficiently store user and booking data 🗄️.
* Ensure secure authentication and authorization using JWT and password hashing for user protection 🔒.
* Build API endpoints that allow users to:
  (a) Create and manage artist profiles 🎭.
  (b) List and book events 📅.
  (c) View and update booking statuses ✅.
* Implement pagination and filtering for efficient data retrieval and better performance 📊.
* Enforce rate limiting and input validation to prevent abuse and ensure data integrity 🚧.
* Deploy the API with comprehensive documentation and provide a Postman collection for testing 📜.
* Achieve a benchmark score of 90/100 by following best practices in API design, security, and scalability 🏆.


## Technologies Used
* NodeJS
* ExpressJS
* MongoDB
* mongoose
* Express Rate Limit
* Cors
* Bcrypt
* JWT
* Nodemon
* Postman



## Project Description: “Music Booking API”
The Music Booking App API follows a modular monolith architecture, chosen for its clean separation of concerns—each module (auth, users, artists, events, bookings) operates independently while remaining part of a unified codebase. This approach simplifies development, testing, and maintainability without the complexity of microservices.

MongoDB was selected for its flexible schema, enabling dynamic event and artist data structures while indexing and embedded documents optimize read-heavy booking queries. The API is designed with scalability and performance in mind, ensuring efficient data retrieval for high-traffic operations.

Key Features & Enhancements:
✔ Security & Access Control: JWT authentication, role-based access control (RBAC), and rate limiting to mitigate abuse.
✔ Error Handling & Consistency: Standardized error responses using custom exceptions (404 Not Found, 400 Bad Request) and a centralized error middleware.
✔ API Design & Validation: A RESTful architecture with resource-based URLs, HTTP methods, and payload validation using Joi to prevent malformed requests.
✔ Performance & Rate Limiting: Implemented express-rate-limit to control API request flow, applying stricter limits on authentication and booking transactions to enhance security and prevent spamming.
✔ Testing & Documentation: Delivered a Postman collection for testing endpoints and a well-structured GitHub repository, ensuring clarity and ease of collaboration.

By focusing on maintainability, performance, and security, this API is built to handle high-volume booking transactions efficiently, making it a reliable solution for music event management. 🚀


![music_mongoDB](https://github.com/user-attachments/assets/1056b244-63b6-4ff3-b90e-a1c994aa053a)

## Getting Started
## Mini-project   music_booking_api

## 🛠️ Key Skills Assessed

* ⚙️ API Design: Clean RESTful endpoints with intuitive resource-based routes and versioning (/api/v1/)

* 🔐 Security: JWT authentication, role-based access control (RBAC), and rate limiting to prevent abuse

* 📈 Scalability: Modular monolith architecture allowing seamless expansion without microservices overhead

* 🧠 Database Architecture: Flexible MongoDB schema with efficient indexing and embedded documents for performance

* 🧪 Validation & Error Handling: Robust input validation using Joi and centralized error middleware for consistent responses

## Prerequisites
1. Ensure you have Node.js installed on your machine. You can download it from nodejs.org.
2. MongoDB Database access with either Mongo DB Compass or Atlas installed on your machine.

## Installation
1. Clone the repository: `git clone https://github.com/lacegiovanni17/music-booking-api.git`
2. Navigate to the project root directory: `cd music-booking-api `
3. Install dependencies: `npm install`
4. Setup your environment variables `.env` file in the root directory

## Running the App from your terminal
1. From the parent directory change to the backend folder of the project by running the following command `cd backend`
2. run `npm install` to install all packages in package.json file
3. From the root folder run the following command to start the backend server: `npm run start` 
4. The backend server will be running at http://localhost:5000.
5. Use MongoDB URL in .env file to connect to Database.

## Endpoints
Note: All endpoints are accessible under the /api/v1 prefix (e.g., /api/v1/auth/login, /api/v1/users/all-users). There are no root-level shortcuts without the /api/v1 prefix.

* router.use("/auth", authRoutes);      // Authentication (Login, Register)
* router.use("/users", userRoutes);      // User management (Artists, Organizers)
* router.use("/artists", artistRouter);  // Artist-specific routes
* router.use("/events", eventRouter);    // Event creation & management
* router.use("/bookings", bookingRouter);// Booking transactions

## Core Database Models
* artists
* bookings
* events
* users

## Scalability 
* I used MongoDB for flexibility in data modeling
* Database indexes for optimized queries
* Connection pooling for database scalability
* Proper error handling and validation

## Security Considerations
* Some endpoints use JWT authentication (except registration, login, and public searches)
* Role-based authorization for sensitive operations
* Input validation on some endpoints
* Rate limiting to prevent abuse


## Usage
To retrieve all users, make a GET request to http://localhost:5000/api/v1/users/all-users

Please use Postman to test endpoints here  http://localhost:5000/api/v1/`${path}`

## Documentation
Access documentation here - https://documenter.getpostman.com/view/25014777/2sB2cSgiao

## Error Handling
The application provides appropriate error handling for invalid inputs and unexpected scenarios.
* 400 Bad Request - Invalid request data/validation errors
* 401 Unauthorized - Missing or invalid authentication
* 403 Forbidden - Authenticated but insufficient permissions
* 404 Not Found - Resource doesn't exist
* 409 Conflict - Resource conflict (e.g., duplicate booking)
* 422 Unprocessable Entity - Semantic errors in request
* 500 Internal Server Error - Unexpected server errors

## Testing
1. Import the Postman collection from /postman/Music_Booking_API.postman_collection.json
2. Set up an environment with the following variables:
    * baseUrl: The API URL (e.g., `http://localhost:5000`)
    * token: Will be set after login
    * `user_id, artist_id, event_id, booking_id`: Will be set as you create resources

![music_booking_api](https://github.com/user-attachments/assets/f6beb8d6-c2f0-42e2-93af-41e39affdaf5)

With these instructions, developers and users will be able to quickly set up and run the Music_Booking_API Backend App for testing and development purposes.

## Future Enhancements
* Add reviews and ratings for artists
* Implement real-time notifications
* Add payment gateway integration
* Create admin dashboard
* Add more analytics and reporting features

## Author
#### 👤 Author1
- GitHub: [@lacegiovanni17]https://github.com/lacegiovanni17
- Twitter: [@ChidikeC] https://twitter.com/ChidikeC
- LinkedIn: [LinkedIn]https://www.linkedin.com/in/chidike-chizoba-25628a40/

## Contributing 
Contributions, issues, critics and feature requests are welcome!

## Show your support
Please give a ⭐️ if you like this project! 

## Acknowledgments
- Hat tip to fobework
- Inspiration to all devs
- etc
