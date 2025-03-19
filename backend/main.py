from flask import Flask, request
import sys
from routes import register_blueprints

app = Flask(__name__)
register_blueprints(app)
    
# Start the server
if __name__ == "__main__":
    # Check for command-line arguments
    if len(sys.argv) != 3:
        print("Usage: python main.py <host> <port>")
        sys.exit(1)

    host = sys.argv[1]
    port = int(sys.argv[2])

    app.run(host=host, port=port)