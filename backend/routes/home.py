import json
from flask import Blueprint, jsonify
from models import *


blueprint = Blueprint('home', __name__)

@blueprint.route('/')
def home():
    return "Hello EVoting!"


@blueprint.route('/candidates')
def candidates():
    return jsonify(Candidate.query.all())


@blueprint.route('/votes')
def votes():
    candidates = Candidate.query.all()
    res = []
    for candidate in candidates:
        votes = Vote.query.filter(Vote.candidate_id == candidate.id)
        res.append({'name': candidate.name, 'votes': votes.count()})

    return jsonify(res)
