from flask import render_template
from itoit import db, login_manager, app
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    admin = db.Column(db.Boolean, default=False)


class TradeRegister(db.Model):
    __tablename__ = 'trade_register'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    documents = db.Column(db.LargeBinary, nullable=False)

class Bank(Users):
    __tablename__ = 'bank'
    name = db.Column(db.String(100), nullable=True)
    documents = db.Column(db.LargeBinary, nullable=True)
