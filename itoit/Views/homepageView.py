import random
import string

from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required
from itoit.Models import forms, models
from itoit import app

@app.route("/", methods=['GET'])
@app.route("/index", methods=['GET'])
def home():
    register_form = forms.RegisterForm()

    if not current_user.is_authenticated:
        if register_form.submit.data and register_form.validate_on_submit():
            register(register_form)
    
    return render_template("index.jinja", user=current_user, registerForm=register_form)


def rand_string(length=32):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(length))


def register(form):
    hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
    user = models.Users(email=form.email.data, password=hashed_password)
    db.session.add(user)
    db.session.commit()

