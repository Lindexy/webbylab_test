Webbylab test task

# To download a remote image

```bash
docker pull lindexy/webbylab_test
docker run --name movie  -p 80:8080 -d lindexy/webbylab_test
```

# How to run the application locally

1. Create .env file and paste all variables from the .env.example there (provide available port)
2. Install packages:

```bash
npm install
```

3. Run the start command:

```bash
npm run start
```

5. The app is ready to handle requests

# How to run the application with docker

1. Make sure that docker runs on your machine
2. In the root directory of this project run the following command

```bash
docker build -t lindexy/webbylab_test .
```

3. Wait for the image finishes installing
4. Run the following command (use any available port on your machine instead of 8080):

```bash
docker run --name movie  -p 80:8080 -d lindexy/webbylab_test
```

5. The app is ready to handle requests
