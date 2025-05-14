    install docker, docker compose
    clone repository
    cd to repository root, where docker-compose.yml is
    docker compose build
    docker compose up -d   ( start / restart)
    docker compose logs -f (logs)

The docker file has frontend, backend, database (with mariadb).
When runing the docker, and till the empty mariaDB is done it could raise errors /could fail.

Can be run in both Linux, Windows.

The docker file has the needed environment variables, packages, etc. so it's easier to work with it in multiple computers.
