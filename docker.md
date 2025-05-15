    install docker, docker compose
    clone repository
    cd to repository root, where docker-compose.yml is
    docker compose build
    docker compose up -d   ( start / restart)
    docker compose logs -f (logs)

The docker file contains the frontend, backend, database (with mariadb), and other needed components to run the EVoting software.
When runing the docker, and till the empty mariaDB is not done with the installation, it could raise errors /could fail.

Can be run in both Linux, Windows.

The docker file has the needed environment variables, packages, etc. so it's easier to work with it in multiple computers.

# Errors

If the terminal raises the error 

    docker: 'compose' is not a command

this error means, the docker daemon is not running on the computer.

To run the docker deamon on Windows, start the docker desktop application.
