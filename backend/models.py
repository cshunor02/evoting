from db import db
import uuid
from datetime import datetime
from dataclasses import dataclass
from db import db
import random


def generate_uuid():
    return str(uuid.uuid4())

@dataclass
class Election(db.Model):
    __tablename__ = 'elections'

    electionId : str
    electionTitle : str
    startDate : str
    endDate : str
    pollType : str
    status : str
    isAnonymous : bool

    electionId = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    electionTitle = db.Column(db.String(100), nullable=False)
    startDate = db.Column(db.String(100), nullable=False)
    endDate = db.Column(db.String(100), nullable=False)
    pollType = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    isAnonymous = db.Column(db.Boolean, nullable=False)

    votes = db.relationship('Vote', backref='election', lazy=True)
    candidates = db.relationship('Candidate', backref='election', lazy=True)

@dataclass
class Vote(db.Model):
    __tablename__ = 'votes'

    voteId : str
    electionId : str
    timestamp : datetime
    encryptedData : str
    candidateId : str

    voteId = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    electionId = db.Column(db.String(36), db.ForeignKey('elections.electionId'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    encryptedData = db.Column(db.Text, nullable=False)
    candidateId = db.Column(db.String(36), db.ForeignKey('candidates.candidateId'), nullable=True)

@dataclass
class Candidate(db.Model):
    __tablename__ = 'candidates'

    candidateId : str
    electionId : str
    candidateName : str

    candidateId = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    electionId = db.Column(db.String(36), db.ForeignKey('elections.electionId'), nullable=False)
    candidateName = db.Column(db.String(100), nullable=False)
