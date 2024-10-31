# Parking API

## Existing API
- **Endpoint: POST** `/check-in` check in first available space by parking type.
  Request: `{"spaceType": "CAR" // Options: "CAR", "MOTOR", "RESIDENT"}`
- **Endpoint: POST** `/check-in/spaces` check in from parking by parking space number.
  Request: `{"parkingSpaceId": number}`
- **Endpoint: POST** `/check-out` check out from parking by parking space number. Request: `{"parkingSpaceId": number}`
- **Endpoint: GET** `/occupation` provides information by parking spaces. 
- **Endpoint: GET** `/generalInfo` provides information about parking spaces (grouped by floor, and space type).

### what good to add
- endpoint to get active sessions and all sessions