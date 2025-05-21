import json
from flask import Blueprint, jsonify
from models import *
from flask import request

blueprint = Blueprint('home', __name__)

@blueprint.route('/')
def home():
    return "Hello EVoting!"

# Helper function
def candidate_to_dict(candidate):
    return {
        'id': candidate.id,
        'name': candidate.name,
    }

# Results.jsx
@blueprint.route('/votes')
def votes():
    candidates = Candidate.query.all()
    res = []
    for candidate in candidates:
        votes = Vote.query.filter(Vote.candidate_id == candidate.id)
        res.append({'name': candidate.name, 'votes': votes.count()})

    return jsonify(res)

# Election.jsx, EditElection.jsx
@blueprint.route('/getpoll/<int:id>', methods=['GET'])
def get_poll(id):
    poll = Election.query.get(id)
    if not poll:
        return jsonify({"error": "Poll not found"}), 404

    candidates = Candidate.query.filter_by(electionId=id).all()
    candidates_list = [candidate_to_dict(c) for c in candidates]

    return jsonify({
        "id": poll.id,
        "title": poll.electionTitle,
        "description": poll.description,
        "start_date": poll.start_date,
        "end_date": poll.end_date,
        "poll_type": poll.poll_type,
        "anonymity": poll.anonymity,
        "status": poll.status,
        "candidates": candidates_list
    }), 200


# CreateElection.jsx, EditElection.jsx
@blueprint.route('/polls/', methods=['POST'])
def create_poll():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Missing title'}), 400
    
    if 'description' not in data or 'start_date' not in data or 'end_date' not in data or 'poll_type' not in data or 'anonymity' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    new_poll = Election()
    new_poll.electionTitle = data['title']
    new_poll.description = data['description']
    new_poll.start_date = data['start_date']
    new_poll.end_date = data['end_date']
    new_poll.poll_type = data['poll_type']
    new_poll.anonymity = data['anonymity']

    time_now = datetime.utcnow()
    if new_poll.start_date > time_now:
        new_poll.status = 'upcoming'
    elif new_poll.start_date <= time_now <= new_poll.end_date:
        new_poll.status = 'active'
    else:
        new_poll.status = 'ended'
    
    db.session.add(new_poll)
    db.session.commit()

    options = data.get('options', [])

    for option in options:
        candidate = Candidate()
        candidate.electionId = new_poll.id
        candidate.candidateName = option
        db.session.add(candidate)
        db.session.commit()

    return jsonify({
        "id": new_poll.id,
        "title": new_poll.title
    }), 200