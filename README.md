<div align="center">
<img src="https://github.com/rake7h/moxy/assets/18216179/6f1037a3-6bb1-4286-9105-77e0f5b4d7c3" alt="MOXY Dashboard" height="auto" width:"100%">
 <h1>Moxy</h1>
  <h2> Your One-Stop Shop for Mocking and Proxying APIs.</h2>
<hr />
</div>

Alright, picture this: you're deep into local development, tinkering with APIs, and you need to test every possible scenario. That's where mocking comes in handy, right? But then, when you're done playing around and want to switch to the real deal, it's a hassle to transition smoothly.

Enter Moxy.

Moxy's got your back. It's the ultimate tool that lets you mock APIs with custom JSON values and seamlessly switch to proxy mode when you're ready to connect to the real backend APIs. No more juggling between different tools or scratching your head over complicated setups.

With Moxy, it's all about simplicity and efficiency. You get a slick interface that makes mocking and proxying a breeze, so you can focus on what really matters – building awesome stuff without the headache.

Say goodbye to the hassle and hello to smooth sailing with Moxy – the go-to solution for hassle-free local development.


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
