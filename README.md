#Tree Service

## Setup

## Install dependencies:

```bash
npm install
```
## Start the server:
```bash
node index.mjs
```
## Endpoints
GET /api/tree
Returns the entire tree.

POST /api/tree
Adds a node to the tree.

## Request Body
```json

{
  "parent": "<id>",
  "label": "<label>"
}
```

## Run Test Case 
Stop the main server
 ```bash
npm test
 ```
