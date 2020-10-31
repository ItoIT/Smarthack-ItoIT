from itoit import app, db, bcrypt
from flask_login import login_user, current_user
from itoit.Models import models
from flask import request, render_template, flash


@app.route('/register', methods=['POST'])
def register():
    data = request.form.to_dict()
    if data["password"] != data["confirmPassword"]:
        flash("Passwords do not match!")
        return render_template('index.jinja')
    register(data)
    return render_template('index.jinja', user=current_user)


def register(form):
    hashed_password = bcrypt.generate_password_hash(
        form["password"]).decode('utf-8')
    user = models.Users(email=form["email"], password=hashed_password)
    db.session.add(user)
    db.session.commit()
