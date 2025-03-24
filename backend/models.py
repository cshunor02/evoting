from dataclasses import dataclass
from db import db


@dataclass
class User(db.Model):
    id: int
    username: str
    email: str

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"


@dataclass
class Candidate(db.Model):
    id: int
    name: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), unique=True, nullable=False)


@dataclass
class Vote(db.Model):
    id: int
    #user_id = int
    candidate_id: int

    id = db.Column(db.Integer, primary_key=True)
    #user_id = db.Column(db.Integer, nullable=False)
    candidate_id = db.Column(db.Integer, nullable=False)



def seed(app):
    with app.app_context():
        if User.query.first() is None:
            print("User empty, seeding")
            users = [
                User(username='john', email='john@voter.org')
            ]
            db.session.bulk_save_objects(users)
            db.session.commit()

        if Candidate.query.first() is None:
            print("Candidate empty, seeding")
            candidates = [
                Candidate(name='John Wick'),
                Candidate(name='Jane Doe'),
                Candidate(name='Kis Istvan')
            ]
            db.session.bulk_save_objects(candidates)
            db.session.commit()

        if Vote.query.first() is None:
            print("Votes are empty, seeding")
            votes = []
            candidates = Candidate.query.all()
            for candidate in candidates:
                for i in range(random.randint(5, 100)):
                    votes.append(Vote(candidate_id=candidate.id))
            db.session.bulk_save_objects(votes)
            db.session.commit()
