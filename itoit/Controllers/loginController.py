from itoit import app, db, bcrypt
from flask_login import login_user, current_user
from itoit.Models import models
from flask import request, render_template, flash, redirect


@app.route('/login', methods=['POST'])
def login():
    data = request.form.to_dict()

    user = models.Users.query.filter_by(email=data["email"]).first()

    if not user and not bcrypt.check_password_hash(user.password, data["password"]):
        flash("Email or password is invalid!")
        return redirect("index.jinja", user=curent_user)
    
    login(user)
    return render_template('index.jinja', user=current_user)


def login(user):
    login_user(user)
