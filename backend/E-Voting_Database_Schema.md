
# E-Voting System – Database Schema

This document outlines the core database structure for the backend of our e-voting application. The system is built with SQLAlchemy and follows an anonymous voting design using a containerized MariaDB environment.

---

## Overview

The following tables are defined:

- [`Election`](#election)
- [`Vote`](#vote)
- [`VotingPolicy`](#votingpolicy)
- [`Candidate`](#candidate)

Each table uses UUIDs for primary keys and includes relationships to ensure data integrity.

---

## Table Descriptions

### Election

Stores information about each election event.

| Column        | Type         | Description                         |
|---------------|--------------|-------------------------------------|
| electionId    | String (UUID) | Primary key, generated automatically |
| electionTitle | String(100)  | Title of the election               |
| startDate     | DateTime     | Start time of voting                |
| endDate       | DateTime     | End time of voting                  |
| status        | String(20)   | Status of the election (e.g., ongoing, ended) |
| isAnonymous   | Boolean      | Indicates if the election is anonymous |

**Relationships:**
- One-to-many with `Vote`, `VotingPolicy`, and `Candidate`

---

### Vote

Represents an individual vote submitted by a user.

| Column        | Type         | Description                         |
|---------------|--------------|-------------------------------------|
| voteId        | String (UUID) | Primary key                         |
| electionId    | String (UUID) | Foreign key to `Election`           |
| timestamp     | DateTime     | Automatically set on submission     |
| encryptedData | Text         | Encrypted content of the vote       |
| candidateId   | String (UUID) | Foreign key to `Candidate` (nullable) |

---

### VotingPolicy

Defines the rules and restrictions for each election.

| Column        | Type         | Description                         |
|---------------|--------------|-------------------------------------|
| policyId      | String (UUID) | Primary key                         |
| electionId    | String (UUID) | Foreign key to `Election`           |
| allowRevoting | Boolean      | If revoting is allowed              |
| authMethod    | String(50)   | Authentication method (e.g., token, email) |
| isAnonymous   | Boolean      | Indicates if votes should be anonymous |

---

### Candidate

Stores information about election candidates.

| Column         | Type         | Description                         |
|----------------|--------------|-------------------------------------|
| candidateId    | String (UUID) | Primary key                         |
| electionId     | String (UUID) | Foreign key to `Election`           |
| candidateName  | String(100)  | Full name of the candidate          |
| candidateDetails | Text       | Optional details or bio             |

---

## Notes

- All models are defined in `models.py` using SQLAlchemy.
- The project runs inside Docker using MariaDB, with tables created automatically at startup.
- User login/registration tables are intentionally excluded to maintain **anonymous voting**.

---
