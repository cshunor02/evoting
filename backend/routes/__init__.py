import os
import importlib
from flask import Blueprint

def register_blueprints(app):
    route_files = [
        f[:-3] for f in os.listdir(os.path.dirname(__file__))
        if f.endswith(".py") and f != "__init__.py"
    ]

    for module_name in route_files:
        module = importlib.import_module(f"routes.{module_name}")
        if hasattr(module, "blueprint"):
            app.register_blueprint(module.blueprint)
