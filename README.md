# 🗣️ Chat Room API

A simple and efficient chat room API built using TypeScript and Nest.js framework. The API allows you to create chat rooms, add users to rooms, send messages to rooms, and retrieve the latest messages from rooms.

## 🚀 Features & Endpoints

### 1. Create a room with a host

- **Method**: `POST`
- **Path**: `/rooms`
- **Request body**: `{ "name": "room_name", "hostId": "user_id" }`
- **Response body**: `{ "id": "room_id", "name": "room_name", "hostId": "user_id" }`

### 2. Add a user to a room

- **Method**: `POST`
- **Path**: `/rooms/:roomId/users`
- **Request body**: `{ "username": "user_name" }`
- **Response body**: `{ "id": "user_id", "username": "user_name", "roomId": "room_id" }`

### 3. Send a message to a room

- **Method**: `POST`
- **Path**: `/rooms/:roomId/messages`
- **Request body**: `{ "userId": "user_id", "content": "message_content" }`
- **Response body**: `{ "id": "message_id", "userId": "user_id", "content": "message_content", "timestamp": "message_timestamp" }`

### 4. Get the latest messages from a room

- **Method**: `GET`
- **Path**: `/rooms/:roomId/messages`
- **Query parameters**: `?limit=10` (Optional: to limit the number of returned messages)
- **Response body**: `[{ "id": "message_id", "userId": "user_id", "content": "message_content", "timestamp": "message_timestamp" }, ...]`

## 📝 Todos

- [x] Set up the Nest.js project with TypeScript
- [x] Integrate Prisma with api docker file, and docker-compose for prisma and pgadmin
- [x] Initialized configuration environment for later
- [x] Initialized api documentation using OpenAPI (swagger)
- [x] Resolved relative paths into absolute paths using module_aliases and ts-resolve
- [x] Initialized a minimalistic user authentication with middleware in place
- [ ] Implement authentication guard and bootstrap simple resource for rooms

## 🌟 Evaluation Criteria

- Usage of Clean Code and Clean Architecture
- Testing
- Adherence to best practices
