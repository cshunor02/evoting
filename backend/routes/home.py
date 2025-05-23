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
        'id': candidate.candidateId,
        'name': candidate.candidateName,
    }

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

@blueprint.route('/deletepoll/', methods=['POST'])
def delete_poll():
    data = request.get_json()
    if not data or 'id' not in data:
        return jsonify({'error': 'Missing id'}), 400

    poll = Election.query.get(data['id'])
    if not poll:
        return jsonify({'error': 'Poll not found'}), 404

    candidates = Candidate.query.filter_by(electionId=data['id']).all()
    for candidate in candidates:
        votes = Vote.query.filter_by(candidateId=candidate.candidateId).all()
        for vote in votes:
            db.session.delete(vote)
            db.session.commit() 
        db.session.delete(candidate)
        db.session.commit()

    db.session.delete(poll)
    db.session.commit()

    return jsonify({'message': 'Poll deleted successfully'}), 200

@blueprint.route('/updatepoll/', methods=['POST'])
def update_poll():
    data = request.get_json()
    if not data or 'id' not in data:
        return jsonify({'error': 'Missing id'}), 400

    poll = Election.query.get(data['id'])
    if not poll:
        return jsonify({'error': 'Poll not found'}), 404

    candidates = Candidate.query.filter_by(electionId=data['id']).all()
    for candidate in candidates:
        votes = Vote.query.filter_by(candidateId=candidate.candidateId).all()
        for vote in votes:
            db.session.delete(vote)
        db.session.delete(candidate)
    
    db.session.delete(poll)
    db.session.commit()

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

@blueprint.route('/vote/', methods=['POST'])
def cast_vote():
    data = request.get_json()
    if not data or 'poll_id' not in data:
        return jsonify({'error': 'Missing poll_id'}), 400

    poll = Election.query.get(data['poll_id'])
    if not poll:
        return jsonify({'error': 'Poll not found'}), 404

    # Support both single and multiple candidate IDs
    if 'candidate_ids' in data:
        candidate_ids = data['candidate_ids']
    elif 'candidate_id' in data:
        candidate_ids = [data['candidate_id']]
    else:
        return jsonify({'error': 'Missing candidate_id(s)'}), 400

    # Iterate through all provided candidate IDs
    for candidate_id in candidate_ids:
        candidate = Candidate.query.filter_by(candidateId=candidate_id, electionId=data['poll_id']).first()
        if not candidate:
            return jsonify({'error': f'Candidate {candidate_id} not found'}), 404

        new_vote = Vote(
            electionId=data['poll_id'],
            candidateId=candidate_id
        )
        db.session.add(new_vote)

    db.session.commit()
    return jsonify({'message': 'Vote(s) cast successfully'}), 200



@blueprint.route('/result/<string:id>', methods=['GET'])
def get_results(id):
    poll = Election.query.get(id)
    if not poll:
        return jsonify({'error': 'Poll not found'}), 404

    candidates = Candidate.query.filter_by(electionId=id).all()
    results = []
    for candidate in candidates:
        votes_count = Vote.query.filter_by(candidateId=candidate.candidateId, electionId=id).count()
        results.append({
            'candidate_id': candidate.candidateId,
            'candidate_name': candidate.candidateName,
            'votes_count': votes_count
        })

    return jsonify(results), 200