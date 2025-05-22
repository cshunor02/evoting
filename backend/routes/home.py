import json
from flask import Blueprint, jsonify
from models import *
from flask import request
from datetime import datetime

blueprint = Blueprint('home', __name__)

@blueprint.route('/')
def home():
    return "Hello EVoting!"

# Helper function
def candidate_to_dict(candidate):
    return {
        'id': candidate.candidateId,
        'name': candidate.candidateName,
    }

# Results.jsx
@blueprint.route('/votes')
def votes():
    candidates = Candidate.query.all()
    res = []
    for candidate in candidates:
        votes = Vote.query.filter(Vote.candidateId == candidate.candidateId)
        res.append({'name': candidate.name, 'votes': votes.count()})

    return jsonify(res)

@blueprint.route('/allpoll', methods=['GET'])
def get_all_polls():
    polls = Election.query.all()
    polls_list = []
    for poll in polls:
        candidates = Candidate.query.filter_by(electionId=poll.electionId).all()
        candidates_list = [candidate_to_dict(c) for c in candidates]
        polls_list.append({
            "id": poll.electionId,
            "title": poll.electionTitle,
            "start_date": poll.startDate,
            "end_date": poll.endDate,
            "poll_type": poll.pollType,
            "anonymity": poll.isAnonymous,
            "candidates": candidates_list
        })

    return jsonify(polls_list), 200

# Election.jsx, EditElection.jsx
@blueprint.route('/getpoll/<string:id>', methods=['GET'])
def get_poll(id):
    poll = Election.query.get(id)
    if not poll:
        return jsonify({"error": "Poll not found"}), 404

    candidates = Candidate.query.filter_by(electionId=id).all()
    candidates_list = [candidate_to_dict(c) for c in candidates]

    return jsonify({
        "id": poll.electionId,
        "title": poll.electionTitle,
        "start_date": poll.startDate,
        "end_date": poll.endDate,
        "poll_type": poll.pollType,
        "anonymity": poll.isAnonymous,
        "candidates": candidates_list
    }), 200


# CreateElection.jsx, EditElection.jsx
@blueprint.route('/polls/', methods=['POST'])
def create_poll():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Missing title'}), 400
    
    if 'start_date' not in data or 'end_date' not in data or 'poll_type' not in data or 'anonymity' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_poll = Election()
    new_poll.electionTitle = data['title']
    new_poll.startDate = data['start_date']
    new_poll.endDate = data['end_date']
    new_poll.pollType = data['poll_type']
    new_poll.isAnonymous = data['anonymity']
    new_poll.status = "undefined"
    
    db.session.add(new_poll)
    db.session.commit()

    options = data['options']

    for option in options:
        candidate = Candidate()
        candidate.candidateId = str(uuid.uuid4())
        candidate.electionId = new_poll.electionId
        candidate.candidateName = option
        db.session.add(candidate)
        db.session.commit()

    return jsonify({
        "id": new_poll.electionId,
        "title": new_poll.electionTitle
    }), 200