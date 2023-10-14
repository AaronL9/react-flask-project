import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt

from dotenv import load_dotenv
import os

from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from models import db, ma, Notes, NoteSchema, User

app = Flask(__name__)
CORS(app)

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
SERVER_PASSWORD = os.getenv('SERVER_PASSWORD')
app.config['SECRET_KEY'] = SECRET_KEY

# Databse configuration                                  Username:password@hostname/databasename
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:{}@localhost/flaskreact'.format(
    SERVER_PASSWORD)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)
db.init_app(app)
ma.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/login', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"message": "Email doesn't exist"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Incorrect password"}), 401

    id = str(user).split(' ')[1]
    user_id = id[:(len(id) - 1)]
    access_token = create_access_token(identity=user_id)

    return jsonify({
        "email": email,
        "token": access_token,
    })


@app.route("/signup", methods=["POST"])
def signup():
    name = request.json['name']
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name, email=email,
                    password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    user_id = new_user.user_id

    access_token = create_access_token(identity=user_id)

    return jsonify({
        "email": new_user.email,
        "token": access_token
    })


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)


@app.route('/notes', methods=['GET'])
@jwt_required()
def list_notes():
    user_id = get_jwt_identity()
    all_notes = Notes.query.filter_by(user_id=user_id).all()
    results = notes_schema.dump(all_notes)
    return jsonify(results)


@app.route('/notes/<id>', methods=['GET'])
@jwt_required()
def note(id):
    note = Notes.query.get(id)
    return note_schema.jsonify(note)


@app.route('/notes/<id>', methods=['PUT'])
@jwt_required()
def update_note(id):
    note = Notes.query.get(id)

    title = request.json['title']
    description = request.json['description']

    note.title = title
    note.description = description

    db.session.commit()
    return note_schema.jsonify(note)


@app.route('/notes/<id>', methods=['DELETE'])
@jwt_required()
def delete_note(id):
    note = Notes.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return note_schema.jsonify(note)


@app.route('/addnotes', methods=['POST'])
@jwt_required()
def add_note():
    title = request.json['title']
    description = request.json['description']
    user_id = get_jwt_identity()

    notes = Notes(user_id, title, description)
    db.session.add(notes)
    db.session.commit()
    return note_schema.jsonify(notes)


if __name__ == '__main__':
    app.run(debug=True)
