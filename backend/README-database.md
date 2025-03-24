# Database


## Project setup:

### Required dependencies

Run the following command to install all required packages:
`pip install flask_sqlalchemy flask_migrate python-dotenv mysql-connector-python`


### Environment variables
Create a `.env` file in your **local** backend directory and add the database connection string:
DATABASE_URL="mysql+mysqlconnector://<username>:<password>@<host>:<port>/<database>"

For local testing, replace the cloud database URL with your local database credentials.


### Project structure

- `config.py` - Project configuration settings (e.g. database connection)
- `db.py` – Database setup using SQLAlchemy
- `models.py` – Define database models here
- `migrations/` – Tracks database schema changes (managed with Flask-Migrate)
- `main.py` - Initializes and connects to the database


### Database migrations

To track and apply schema changes, run the following commands from the backend directory:

`flask --app main.py db migrate -m "Migration message"`
`flask --app main.py db upgrade`

**Run migrations only when changes are made to the database structure (models).** 

1. To update the database schema in your **local** database to the current version use `upgrade`.

2. When modifying the structure, make sure to `upgrade` to the cloud database too (not just your local database) for consistency.


### Testing database connection (can be removed later)

If you run the flask server on http://localhost:<port> go to: http://localhost:<port>/test-db

This route will test the connection to the database and show whether it was successful.