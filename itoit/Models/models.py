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
    bank_id = db.Column(db.Integer, db.ForeignKey('bank.id'))
    trade_register_id = db.Column(db.Integer, db.ForeignKey('trade_register.id'))

    bank = relationship(
        "Bank", backref="bank", foreign_keys=[bank_id]
    )
    trade_register = relationship(
        "TradeRegister", backref="trade_register", foreign_keys=[trade_register_id]
    )


class TradeRegister(db.Model, UserMixin):
    __tablename__ = 'trade_register'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    documents = db.Column(db.LargeBinary, nullable=False)

class Bank(db.Model, UserMixin):
    __tablename__ = 'bank'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    documents = db.Column(db.LargeBinary, nullable=True)

class Firm(db.Model):
    __tablename__ = 'firm'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bank_documents = db.Column(db.LargeBinary, nullable=True)
    bank_documents_approved = db.Column(db.Boolean)
    register_documents = db.Column(db.LargeBinary, nullable=True)
    register_documents_approved = db.Column(db.Boolean)
    factura_capital = db.Column(db.LargeBinary, nullable=True)
    factura_capital_approved = db.Column(db.Boolean)

    user = relationship("Users", backref="users", foreign_keys=[user_id])
