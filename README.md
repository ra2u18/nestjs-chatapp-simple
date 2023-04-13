# 🗣️ Chat Room API

A simple and efficient chat room API built using TypeScript and Nest.js framework. The API allows you to create chat rooms, add users to rooms, send messages to rooms, and retrieve the latest messages from rooms.

## 🚀 Features & Endpoints

### 1. Create a room with a host

- **Method**: `POST`
- **Path**: `/rooms`
- **Request body**:

```
{
    "room": {
        "roomTitle": "powerpuff girls",
        "roomDescription": "za best"
    }
}
```

- **Response body**:

```
{
    "room": {
        "id": "clgf28nuf0000cxc4o1b9zbqz",
        "roomTitle": "powerpuff girls",
        "roomDescription": "za best",
        "hostId": "clgf221z60000cxzwpky0kicz",
        "createdAt": "2023-04-13T11:51:59.415Z",
        "updatedAt": "2023-04-13T11:51:59.415Z"
    }
}
```

### 2. Add a user to a room

- **Method**: `POST`
- **Path**: `/rooms/:roomId/users`
- **Request body**:

```
{
    "user": {
        "email": "user4@gmail.com"
    }
}
```

- **Response body**:

```
{
  room: {
    "id": "clgf0xw4q0004cxkk43dqzp2p",
    "roomTitle": "Avengers",
    "roomDescription": "Best room ever",
    "hostId": "clgf0xika0002cxkkhmg5xw96",
    "createdAt": "2023-04-13T11:15:37.322Z",
    "updatedAt": "2023-04-13T11:15:37.322Z",
    "users": [
        {
            "id": "clgf0xfz10000cxkk2dhouo7m",
            "name": "user1",
            "email": "user1@gmail.com",
            "roles": [
                "USER"
            ],
            "createdAt": "2023-04-13T11:15:16.382Z",
            "updatedAt": "2023-04-13T11:15:16.382Z"
        }
    ]
  }
}
```

### 3. Send a message to a room

- **Method**: `POST`
- **Path**: `/rooms/:roomId/messages`
- **Request body**:

```
{
    "message": {
        "payload": "hello world"
    }
}
```

- **Response body**:

```
{
    "room": {
        "id": "clgf0xw4q0004cxkk43dqzp2p",
        "roomTitle": "powerpuff girls",
        "roomDescription": "za best",
        "hostId": "clgf0xika0002cxkkhmg5xw96",
        "createdAt": "2023-04-13T11:15:37.322Z",
        "updatedAt": "2023-04-13T11:15:37.322Z",
        "messages": [
            {
                "id": "clgf1gzu40001cx3c4rj06pa8",
                "payload": "hello world",
                "createdAt": "2023-04-13T11:30:28.588Z",
                "updatedAt": "2023-04-13T11:30:28.594Z",
                "authorId": "clgf0xika0002cxkkhmg5xw96",
                "roomId": "clgf0xw4q0004cxkk43dqzp2p"
            },
            {
                "id": "clgf1h3oj0003cx3c99bk8xlq",
                "payload": "How's everyone",
                "createdAt": "2023-04-13T11:30:33.572Z",
                "updatedAt": "2023-04-13T11:30:33.576Z",
                "authorId": "clgf0xika0002cxkkhmg5xw96",
                "roomId": "clgf0xw4q0004cxkk43dqzp2p"
            }
        ]
    }
}
```

### 4. Get the latest messages from a room

- **Method**: `GET`
- **Path**: `/rooms/:roomId/messages`
- **Query parameters**: `?limit=1` (Optional: to limit the number of returned messages)
- **Response body**:

```
// With a default limit of 1, limit can be set in query params
{
    "messages": [
        {
            "id": "clgf1hvek0005cx3cso1oy87f",
            "payload": "hello world",
            "createdAt": "2023-04-13T11:31:09.501Z",
            "updatedAt": "2023-04-13T11:31:09.504Z",
            "authorId": "clgf0xika0002cxkkhmg5xw96",
            "roomId": "clgf0xw4q0004cxkk43dqzp2p"
        }
    ],
    "cursorId": "clgf1hvek0005cx3cso1oy87f"
}
```

## 📝 Todos

- [x] Set up the Nest.js project with TypeScript
- [x] Integrate Prisma with api docker file, and docker-compose for prisma and pgadmin
- [x] Initialized configuration environment for later
- [x] Initialized api documentation using OpenAPI (swagger)
- [x] Resolved relative paths into absolute paths using module_aliases and ts-resolve
- [x] Initialized a minimalistic user authentication with middleware in place
- [x] Implemented authentication guard and added room creation feature
- [x] Implemented add user to room feature
- [x] Implemented send message to room feature
- [x] Implemented get latest messages with pagination and cursor id
- [x] Finished swagger documentation

## 🌟 Evaluation Criteria

- Usage of Clean Code and Clean Architecture
- Testing
- Adherence to best practices
