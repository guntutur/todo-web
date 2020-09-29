This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `docker build -t todos_guntur:dev .`

This will build Docker Images for development environment.<br />
After Images builds successfully, run the image with

### `docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true todos_guntur:dev`

The will launch the apps interactive terminal mode, the apps will be using port 3001 as we bridge the exposed 3000 port inside docker in our docker run command above.<br />
The server engine will use default node webpack for the development purpose
Open [http://<docker-host-ip>:3001](http://<docker-host-ip>:3001) to view it in the browser.

### `docker build -f Dockerfile.prod -t todos_guntur:prod .`

This will build Docker Images for production environment.<br />
The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!<br />
After Images builds successfully, run the image with

### `docker run -it --rm -p 8080:80 todos_guntur:prod`

The will launch the apps interactive terminal mode, the apps will be using port 8080 as we bridge the exposed nginx 80 port inside docker in our docker run command above.<br />
The server engine will use nginx for production environment
Open [http://<docker-host-ip>:8080](http://<docker-host-ip>:8080) to view it in the browser.

# trivia
add d after -it (`-itd`) to run docker in daemon, then monitor running process with `docker ps`
