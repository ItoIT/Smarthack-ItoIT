from itoit import app, db, bcrypt
from flask_login import login_user, current_user
from itoit.Models import models
from flask import request, render_template, flash, redirect


@app.route('/register', methods=['POST'])
def register():
    data = request.form.to_dict()
    user = models.Users.query.filter_by(email=data["email"]).first()

    if user:
        flash("Account with given email already exists!")
        return redirect('/')

    if data["password"] != data["confirmPassword"]:
        flash("Passwords do not match!")
        return redirect('/')

    register(data)
    return redirect('/')


def register(form):
    hashed_password = bcrypt.generate_password_hash(
        form["password"]).decode("utf-8")
    user = models.Users(email=form["email"], password=hashed_password)
    db.session.add(user)
    db.session.commit()
