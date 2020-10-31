from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app, db, bcrypt

from itoit.Models import models


@app.route("/registerbanca", methods=['GET'])
def registerbanca_get():
    # TODO: make sure current_user is admin
    return render_template("registerbanca.jinja", user=current_user)


@app.route("/registerbanca", methods=['POST'])
def registerbanca_post():
    # TODO: make sure current_user is admin
    if request.form['email'] and request.form['psw'] and request.form['name']:
        hashed_password = bcrypt.generate_password_hash(request.form["psw"]).decode('utf-8')
        bank = models.Bank(email=request.form["email"], password=hashed_password,
                           name=request.form['name'], documents=request.files['documents'].read())
        db.session.add(bank)
        db.session.commit()
    else:
        print("Incomplete form data")
    return redirect(url_for("registerbanca_get"))
