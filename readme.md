# Flight Path Tracker Microservice

## Overview

The **Flight Path Tracker Microservice** provides a simple way to calculate a person’s flight path based on unordered flight segments. The service takes in a list of flights with source and destination airport codes, sorts them, and returns the total flight path from the starting airport to the final destination.

This service can be useful for tracking individuals or cargo across multiple flights to determine their full journey.

## Features

- Accepts a list of flight segments in any order.
- Returns the correct flight path, starting from the first departure airport and ending at the final destination.
- Handles edge cases where flights may not connect properly or where no valid path exists.

## API Endpoint

### `POST /calculate`

This endpoint calculates the complete flight path based on an unordered list of flights provided in the request.

#### Request

- **Method**: `POST`
- **Endpoint**: `/calculate`
- **Content-Type**: `application/json`
- **Body**:
  - An array of flight segments, where each segment is an array containing two airport codes (source and destination).

#### Example Request Body

```json
{
  "flights": [
    ["SFO", "EWR"],
    ["ATL", "SFO"]
  ]
}
```

#### Response

- **Success (200 OK)**:

  - A JSON array representing the complete flight path from the first departure airport to the final destination.

  **Example Response:**

  ```json
  ["ATL", "EWR"]
  ```

- **Error (400 Bad Request)**:

  - Returned when the input is invalid or when no valid flight path can be constructed.

  **Example Error Response:**

  ```json
  {
    "error": "Invalid input. Please provide a non-empty array of flights."
  }
  ```

#### Example Request

**Input:**

```json
{
  "flights": [
    ["ATL", "EWR"],
    ["SFO", "ATL"]
  ]
}
```

**Output:**

```json
["SFO", "EWR"]
```

### Example Edge Case Request

**Input:**

```json
{
  "flights": [
    ["IND", "EWR"],
    ["SFO", "ATL"],
    ["GSO", "IND"],
    ["ATL", "GSO"]
  ]
}
```

**Output:**

```json
["SFO", "EWR"]
```

## Setup and Running the Service

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **npm** (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kevindelon146/volume-fi-assessment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd volume-fi-assessment
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Running the Service

To start the server on **port 8080**, run:

```bash
npm run dev
```

The service will now be available at `http://localhost:8080`.

### Testing the API

Use `curl`, `Postman`, or any API client to test the `/calculate` endpoint.

#### Example using `curl`:

```bash
curl -X POST http://localhost:8080/calculate \
-H "Content-Type: application/json" \
-d '{"flights": [["SFO", "ATL"], ["ATL", "EWR"]]}'
```

Expected response:

```json
["SFO", "EWR"]
```

## Error Handling

The API will return a `400 Bad Request` error in cases where:

- The input data is not a valid array.
- A flight path cannot be properly calculated due to disconnected segments.
