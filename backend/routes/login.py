from flask import Blueprint, request, jsonify

blueprint = Blueprint('login', __name__)

@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return {'a': True} # DO LOGIN
    else:
        return {'b' : False} # SHOW LOGIN PAGE