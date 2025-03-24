from flask import Flask, request
import sys
from routes import register_blueprints
from config import SQLALCHEMY_DATABASE_URI
from models import *
from db import db, init_db
from dotenv import load_dotenv
from flask_migrate import Migrate
from sqlalchemy import text

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
init_db(app)
seed(app)
migrate = Migrate(app, db)

register_blueprints(app)

# Endpoint to check if the database connection is working  
@app.route("/test-db")
def test_db_connection():
    try:
        # Try to query the database to check if it's working
        db.session.execute(text("SELECT 1"))
        return "Database connected successfully!"
    except Exception as e:
        return f"Database connection failed: {e}"

# Start the server
if __name__ == "__main__":
    # Check for command-line arguments
    if len(sys.argv) != 3:
        print("Usage: python main.py <host> <port>")
        sys.exit(1)

    host = sys.argv[1]
    port = int(sys.argv[2])

    app.run(host=host, port=port)
