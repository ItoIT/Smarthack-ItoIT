from flask import render_template
from itoit import db, login_manager, app
from flask_login import UserMixin
from sqlalchemy.orm import relationship

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)


class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    admin = db.Column(db.Boolean, default=False)


class TradeRegister(db.Model, UserMixin):
    __tablename__ = 'trade_register'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    documents = db.Column(db.LargeBinary, nullable=False)

class Bank(db.Model, UserMixin):
    __tablename__ = 'bank'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    documents = db.Column(db.LargeBinary, nullable=True)

class Firm(db.Model):
    __tablename__ = 'firm'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bank_documents = db.Column(db.LargeBinary, nullable=True)
    register_documents = db.Column(db.LargeBinary, nullable=True)
    factura_capital = db.Column(db.LargeBinary, nullable=True)

    user = relationship("Users", backref="users", foreign_keys=[user_id])
