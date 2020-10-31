from itoit import app, db, bcrypt
from flask_login import login_user, current_user, logout_user
from itoit.Models import models
from flask import request, render_template, flash, redirect, url_for


@app.route('/login', methods=['POST'])
def login():
    data = request.form.to_dict()
    print(data)

    user = models.Users.query.filter_by(email=data["email"]).first()

    if not user:
        user = models.Bank.query.filter_by(email=data["email"]).first()
    
    if not user:
        user = models.TradeRegister.query.filter_by(email=data["email"]).first()

    if not user:
        flash("Email or password is invalid!")
        return redirect("/")

    if not bcrypt.check_password_hash(user.password, data["password"]):
        flash("Email or password is invalid!")
        return redirect("/")
    
    login(user)
    return redirect('/')


def login(user):
    login_user(user)

@app.route("/logout")
def logout():
    logout_user()
    return redirect('/')
