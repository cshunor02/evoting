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


# GET all candidates
@blueprint.route('/candidates', methods=['GET'])
def candidates():
    all_candidates = Candidate.query.all()
    return jsonify([candidate_to_dict(c) for c in all_candidates])


# GET specific candidate
@blueprint.route('/candidates/<int:id>', methods=['GET'])
def get_candidate(id):
    candidate = Candidate.query.get(id)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404
    return jsonify({
        "id": candidate.id,
        "name": candidate.name
    })


# CREATE new candidate
@blueprint.route('/candidates', methods=['POST'])
def create_candidate():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'error': 'Missing name'}), 400

    new_candidate = Candidate(name=data['name'])
    db.session.add(new_candidate)
    db.session.commit()
    return jsonify(candidate_to_dict(new_candidate)), 201


# UPDATE candidate
@blueprint.route('/candidates/<int:id>', methods=['PUT'])
def update_candidate(id):
    candidate = Candidate.query.get_or_404(id)
    data = request.get_json()

    if 'name' in data:
        candidate.name = data['name']

    db.session.commit()
    return jsonify(candidate_to_dict(candidate))


# DELETE candidate
@blueprint.route('/candidates/<int:id>', methods=['DELETE'])
def delete_candidate(id):
    candidate = Candidate.query.get_or_404(id)
    db.session.delete(candidate)
    db.session.commit()
    return jsonify({'message': 'Candidate deleted'}), 200


@blueprint.route('/votes')
def votes():
    candidates = Candidate.query.all()
    res = []
    for candidate in candidates:
        votes = Vote.query.filter(Vote.candidate_id == candidate.id)
        res.append({'name': candidate.name, 'votes': votes.count()})

    return jsonify(res)
