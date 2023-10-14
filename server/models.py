from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime
from uuid import uuid4
  
db = SQLAlchemy()
ma = Marshmallow()

def get_uuid():
    return uuid4().hex
  
class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.String(55), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(150), unique=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
  
class Notes(db.Model):
    __tablename__ = "notes_table"
    note_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(45))
    description = db.Column(db.String())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, user_id, title, description):
        self.user_id = user_id
        self.title = title
        self.description = description


class NoteSchema(ma.Schema):
    class Meta:
        fields = ('note_id', 'user_id', 'title', 'description', 'date')