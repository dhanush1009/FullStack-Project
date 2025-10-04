# 📡 API Documentation - Disaster Management System

## Base URL
```
Development: http://localhost:5000
Production: https://your-backend-url.com
```

---

## 📋 Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Volunteer APIs](#volunteer-apis)
3. [Task Management APIs](#task-management-apis)
4. [Emergency APIs](#emergency-apis)
5. [Communication APIs](#communication-apis)
6. [Error Handling](#error-handling)

---

## 🔐 Authentication APIs

### 1. User Signup
**Endpoint:** `POST /api/signup`

**Description:** Register a new user (user or volunteer role)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user"  // "user" or "volunteer"
}
```

**Success Response (201):**
```json
{
  "msg": "User created"
}
```

**Error Responses:**
- `400` - User already exists
- `400` - Admin cannot signup (if email is aravinthl266@gmail.com)
- `500` - Server error

**Example:**
```javascript
const response = await axios.post('http://localhost:5000/api/signup', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123',
  role: 'user'
});
```

---

### 2. User Login
**Endpoint:** `POST /api/login`

**Description:** Authenticate user and get user details

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user"  // "user", "volunteer", or "admin"
}
```

**Success Response (200):**
```json
{
  "msg": "Login successful",
  "name": "John Doe",
  "role": "user"
}
```

**Admin Login Response:**
```json
{
  "msg": "Admin login successful",
  "name": "Admin",
  "role": "admin"
}
```

**Error Responses:**
- `404` - User not found
- `400` - Incorrect password
- `403` - Role mismatch
- `403` - Not admin (when trying admin login with wrong role)
- `500` - Server error

**Special Admin Credentials:**
- Email: `aravinthl266@gmail.com`
- Password: `Arvind@l123`
- Role: `admin`

**Example:**
```javascript
const response = await axios.post('http://localhost:5000/api/login', {
  email: 'john@example.com',
  password: 'SecurePass123',
  role: 'user'
});

// Store in localStorage
localStorage.setItem('loggedIn', 'true');
localStorage.setItem('username', response.data.name);
localStorage.setItem('role', response.data.role);
```

---

## 👥 Volunteer APIs

### 3. Register Volunteer
**Endpoint:** `POST /api/volunteers`

**Description:** Register a new volunteer with location and shelter info

**Request Body:**
```json
{
  "name": "Jane Smith",
  "age": 28,
  "shelter": "Chennai Corporation Shelter",
  "email": "jane@example.com"
}
```

**Success Response (201):**
```json
{
  "msg": "Volunteer saved",
  "volunteer": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Jane Smith",
    "age": 28,
    "shelter": "Chennai Corporation Shelter",
    "email": "jane@example.com",
    "lat": null,
    "lng": null,
    "tasks": [],
    "createdAt": "2024-10-04T15:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Name and shelter required
- `500` - Failed to save volunteer

---

### 4. Get All Volunteers
**Endpoint:** `GET /api/volunteers`

**Description:** Retrieve all registered volunteers (sorted by newest first)

**Success Response (200):**
```json
[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Jane Smith",
    "age": 28,
    "shelter": "Chennai Corporation Shelter",
    "email": "jane@example.com",
    "lat": 13.0635,
    "lng": 80.2297,
    "tasks": [
      {
        "id": "uuid-1234",
        "task": "Distribute food supplies",
        "description": "Distribute food to 50 families",
        "assignedAt": "2024-10-04T15:30:00.000Z",
        "completed": false,
        "status": "Pending",
        "proof": null
      }
    ],
    "createdAt": "2024-10-04T15:30:00.000Z"
  }
]
```

**Error Response:**
- `500` - Failed to fetch volunteers

---

### 5. Get Volunteer by Email
**Endpoint:** `GET /api/volunteers/email/:email`

**Description:** Get specific volunteer details by email

**URL Parameters:**
- `email` - Volunteer's email address

**Success Response (200):**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "name": "Jane Smith",
  "age": 28,
  "shelter": "Chennai Corporation Shelter",
  "email": "jane@example.com",
  "tasks": []
}
```

**Error Responses:**
- `404` - Volunteer not found
- `500` - Failed to fetch volunteer

**Example:**
```javascript
const email = 'jane@example.com';
const response = await axios.get(`http://localhost:5000/api/volunteers/email/${email}`);
```

---

### 6. Delete Volunteer
**Endpoint:** `DELETE /api/volunteers/:id`

**Description:** Delete a volunteer by ID (Admin only)

**URL Parameters:**
- `id` - Volunteer's MongoDB ObjectId

**Success Response (200):**
```json
{
  "msg": "Volunteer deleted successfully"
}
```

**Error Responses:**
- `404` - Volunteer not found
- `500` - Failed to delete volunteer

**Example:**
```javascript
const volunteerId = '65f1a2b3c4d5e6f7g8h9i0j1';
await axios.delete(`http://localhost:5000/api/volunteers/${volunteerId}`);
```

---

## 📋 Task Management APIs

### 7. Assign Task to Volunteer
**Endpoint:** `POST /api/volunteers/:id/assign-task`

**Description:** Assign a new task to a volunteer and send email notification

**URL Parameters:**
- `id` - Volunteer's MongoDB ObjectId

**Request Body:**
```json
{
  "task": "Distribute food supplies",
  "description": "Distribute food packets to 50 families in Zone A"
}
```

**Success Response (200):**
```json
{
  "msg": "Task assigned successfully",
  "volunteer": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Jane Smith",
    "tasks": [
      {
        "id": "uuid-generated",
        "task": "Distribute food supplies",
        "description": "Distribute food packets to 50 families in Zone A",
        "assignedAt": "2024-10-04T15:30:00.000Z",
        "completed": false,
        "status": "Pending",
        "proof": null
      }
    ]
  }
}
```

**Email Sent:**
- Subject: "✅ New Task Assigned"
- Contains task details, location, and timestamp

**Error Responses:**
- `400` - Task is required
- `400` - Task already assigned
- `404` - Volunteer not found
- `500` - Failed to assign task

---

### 8. Get Volunteer Tasks
**Endpoint:** `GET /api/tasks`

**Description:** Get all tasks for a specific volunteer

**Query Parameters:**
- `email` - Volunteer's email address

**Success Response (200):**
```json
[
  {
    "id": "uuid-1234",
    "title": "Distribute food supplies",
    "description": "Distribute food packets to 50 families in Zone A",
    "status": "Pending",
    "proof": null,
    "location": "Chennai Corporation Shelter",
    "assignedAt": "2024-10-04T15:30:00.000Z"
  },
  {
    "id": "uuid-5678",
    "title": "Medical assistance",
    "description": "Provide first aid to injured people",
    "status": "Completed",
    "proof": "proof-1234567890.jpg",
    "location": "Chennai Corporation Shelter",
    "assignedAt": "2024-10-03T10:00:00.000Z"
  }
]
```

**Example:**
```javascript
const email = 'jane@example.com';
const response = await axios.get(`http://localhost:5000/api/tasks?email=${email}`);
```

---

### 9. Submit Task Proof
**Endpoint:** `POST /api/tasks/:taskId/submit`

**Description:** Submit proof of task completion (with file upload)

**URL Parameters:**
- `taskId` - Task's UUID

**Request Body (FormData):**
```javascript
const formData = new FormData();
formData.append('email', 'jane@example.com');
formData.append('proof', fileInput.files[0]);  // File upload
```

**Success Response (200):**
```json
{
  "msg": "Proof submitted, waiting for admin approval"
}
```

**Task Status Changes:**
- Status updated to: `"Pending Approval"`
- Proof filename stored in database

**Error Responses:**
- `404` - Volunteer not found
- `404` - Task not found
- `500` - Failed to submit proof

**Example:**
```javascript
const formData = new FormData();
formData.append('email', 'jane@example.com');
formData.append('proof', document.getElementById('fileInput').files[0]);

await axios.post(`http://localhost:5000/api/tasks/${taskId}/submit`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

### 10. Approve Task (Admin)
**Endpoint:** `POST /api/tasks/:taskId/approve`

**Description:** Approve a task and mark as completed (Admin only)

**URL Parameters:**
- `taskId` - Task's UUID

**Request Body:**
```json
{
  "volunteerEmail": "jane@example.com"
}
```

**Success Response (200):**
```json
{
  "msg": "Task approved and marked as completed"
}
```

**Task Status Changes:**
- Status: `"Completed"`
- Completed: `true`

**Email Sent:**
- Subject: "✅ Task Approved!"
- Notifies volunteer of approval

**Error Responses:**
- `404` - Volunteer not found
- `404` - Task not found
- `500` - Failed to approve task

---

## 🚨 Emergency APIs

### 11. Report Emergency
**Endpoint:** `POST /emergencies`

**Description:** Report a new emergency and auto-assign nearest volunteer

**Request Body:**
```json
{
  "userName": "John Doe",
  "userLocation": "Lat: 13.0635, Lon: 80.2297",
  "lat": 13.0635,
  "lng": 80.2297
}
```

**Success Response (201):**
```json
{
  "msg": "Emergency reported",
  "emergency": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "userName": "John Doe",
    "userLocation": "Lat: 13.0635, Lon: 80.2297",
    "time": "2024-10-04T15:30:00.000Z",
    "assignedVolunteers": ["Jane Smith"]
  }
}
```

**Auto-Assignment Logic:**
1. Finds nearest volunteer based on lat/lng
2. Assigns volunteer to emergency
3. Creates task for volunteer
4. Sends email notification to volunteer

**Error Response:**
- `500` - Failed to report emergency

---

### 12. Get All Emergencies
**Endpoint:** `GET /emergencies`

**Description:** Get all reported emergencies (sorted by newest first)

**Success Response (200):**
```json
[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "userName": "John Doe",
    "userLocation": "Lat: 13.0635, Lon: 80.2297",
    "time": "2024-10-04T15:30:00.000Z",
    "assignedVolunteers": ["Jane Smith", "Bob Wilson"]
  }
]
```

**Error Response:**
- `500` - Failed to fetch emergencies

---

### 13. Assign Volunteer to Emergency
**Endpoint:** `POST /emergencies/:id/assign-volunteer`

**Description:** Manually assign a volunteer to an emergency (Admin)

**URL Parameters:**
- `id` - Emergency's MongoDB ObjectId

**Request Body:**
```json
{
  "volunteerName": "Jane Smith"
}
```

**Success Response (200):**
```json
{
  "msg": "Volunteer assigned and notified",
  "volunteer": "Jane Smith"
}
```

**Actions Performed:**
1. Adds volunteer to emergency's assignedVolunteers array
2. Creates task for volunteer
3. Sends email notification to volunteer

**Email Sent:**
- Subject: "🚨 Emergency Task Assigned"
- Contains emergency location, user info, and timestamp

**Error Responses:**
- `404` - Emergency not found
- `404` - Volunteer not found
- `400` - Volunteer email missing
- `500` - Failed to assign volunteer

---

### 14. Get Emergency Volunteers
**Endpoint:** `GET /emergencies/:id/volunteers`

**Description:** Get list of volunteers assigned to an emergency

**URL Parameters:**
- `id` - Emergency's MongoDB ObjectId

**Success Response (200):**
```json
["Jane Smith", "Bob Wilson"]
```

**Error Responses:**
- `404` - Emergency not found
- `500` - Failed to fetch volunteers

---

## 📧 Communication APIs

### 15. Send SMS Alert
**Endpoint:** `POST /send-sms`

**Description:** Send emergency SMS via Twilio

**Request Body:**
```json
{
  "to": "+919876543210"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**SMS Message:**
```
🚨 Emergency Alert! 🚨
Help needed urgently!
Location: Tamil Nadu
Coordinates: Lat=12.9716, Lon=77.5946
Help me as soon as possible
```

**Error Response:**
- `400` - Missing "to" in request
- `500` - Twilio error

**Example:**
```javascript
await axios.post('http://localhost:5000/send-sms', {
  to: '+919876543210'
});
```

---

### 16. Send Confirmation Email
**Endpoint:** `POST /api/send-confirmation`

**Description:** Send volunteer registration confirmation email

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "shelter": "Chennai Corporation Shelter",
  "age": 28
}
```

**Success Response (200):**
```json
{
  "msg": "Confirmation sent"
}
```

**Email Sent:**
- Subject: "✅ Volunteer Registration Confirmation"
- Contains registration details

**Error Responses:**
- `400` - Missing fields
- `500` - Failed to send email

---

### 17. Send Emergency Email to Admin
**Endpoint:** `POST /send-emergency-email`

**Description:** Send emergency alert email to admin and save to database

**Request Body:**
```json
{
  "userName": "John Doe",
  "userLocation": "Lat: 13.0635, Lon: 80.2297"
}
```

**Success Response (200):**
```json
{
  "message": "Emergency email sent & stored successfully",
  "emergency": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "userName": "John Doe",
    "userLocation": "Lat: 13.0635, Lon: 80.2297",
    "time": "2024-10-04T15:30:00.000Z",
    "assignedVolunteers": []
  }
}
```

**Email Sent To:** Admin (aravinthl266@gmail.com)
- Subject: "🚨 Emergency Help Needed!"
- Contains user info, location, and timestamp

**Error Response:**
- `500` - Failed to send emergency email

---

## ❌ Error Handling

### Standard Error Response Format
```json
{
  "msg": "Error message description"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `403` - Forbidden (authorization error)
- `404` - Not Found
- `500` - Internal Server Error

### Common Error Messages
- `"User exists"` - Email already registered
- `"User not found"` - No user with that email
- `"Incorrect password"` - Wrong password
- `"You are not a {role}"` - Role mismatch
- `"Volunteer not found"` - Invalid volunteer ID/email
- `"Task already assigned"` - Duplicate task
- `"Missing fields"` - Required fields not provided
- `"Server error"` - Internal server error

---

## 🔒 Security Notes

1. **No Authentication Tokens**: Current implementation uses role-based access without JWT tokens
2. **CORS Enabled**: Backend accepts requests from any origin (configure for production)
3. **Password Hashing**: All passwords hashed with bcryptjs (10 rounds)
4. **Admin Hardcoded**: Admin credentials are hardcoded (consider moving to database)
5. **File Upload**: Only single file uploads supported via Multer

---

## 📊 Rate Limiting

Currently **no rate limiting** is implemented. For production, consider adding:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## 🧪 Testing Examples

### Using cURL
```bash
# Signup
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123","role":"user"}'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123","role":"user"}'

# Get Volunteers
curl http://localhost:5000/api/volunteers
```

### Using Postman
1. Import collection with base URL: `http://localhost:5000`
2. Create requests for each endpoint
3. Test with different payloads
4. Save responses for documentation

---

## 📞 Support

For API questions or issues:
- Review this documentation
- Check server logs for errors
- Contact: aravinthl266@gmail.com

---

**Last Updated:** October 4, 2025  
**API Version:** 1.0.0
