<div align="center">
 <h1>Moxy</h1>
  <h2> A dev tool to mock and proxy any API endpoints in a single place.</h2>
<hr />
</div>

# The problem
Sometimes we like to mock the APIs in our local development with custom values so we can test/develop the things for all possible scenarios at the same time we also like to proxy it to some real backend API once we are done with mocking and testing. 

Presently there is no single tool/service that solves these both in the same endpoint.

There are so many tools and online services available to mock APIs with your custom test JSON values and one can use a reverse proxy server like Nginx or Caddy to achieve proxy but there is no single tool present that can have Mock and Proxy in a single place with a nice UI.


# This solution
A tool that does both, Proxy and Mock in a single place with a nice UI.

# Getting Started
It's built on Next.js as a full-stack app you install the Moxy app in the following ways: 

## Docker

```sh
docker pull ghcr.io/rake7h/moxy:latest

docker run --name moxy -d -e APP_HOST=http://localhost:3000 -p 3000:3000 ghcr.io/rake7h/moxy:latest
```

## Docker compose

```dockerfile
version: "3"
services:
  moxy:
    image: ghcr.io/rake7h/moxy:latest
    platform: linux/x86_64
    ports:
      - "3000:3000"
    volumes:
      - /db/:/app/db/
    environment:
      - DB_PATH=/db/
      - APP_HOST=http://localhost:3000
```

Once it's up and running it will be available on the: 
http://localhost:3000


# Dashboard UI and APIs
## Endpoints

Endpoints are paths that get mapped to a record(mock) or a target(proxy) URL. You can create an endpoint and configure the response for it either by providing a target URL or record name.

### UI
http://localhost:3000/dashboard/endpoints

### API for endpoint access:

```curl
http://localhost:3000/moxy/<your endpoint path>
```
Example

```curl
http://localhost:3000/moxy/v1/user/get/
```

## Records

Records are nothing but mock values or JSON content that we use for mock purposes. You can configure an endpoint to return a record and that endpoint will become a mock API.

### UI

http://localhost:3000/dashboard/record

### API to direct access a record:

```curl
http://localhost:3000/api/collections/<collection-name>
```

Example:

```curl
http://localhost:3000/api/collections/example-mock
```
