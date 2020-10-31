from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app, db, bcrypt

from itoit.Models import models


@app.route("/registerregister", methods=['GET'])
def registerregister_get():
    # TODO: make sure current_user is admin
    return render_template("registerregister.jinja", user=current_user)


@app.route("/registerregister", methods=['POST'])
def registerregister_post():
    # TODO: make sure current_user is admin
    if request.form['email'] and request.form['psw'] and request.form['name']:
        hashed_password = bcrypt.generate_password_hash(request.form["psw"]).decode('utf-8')
        trade_register = models.TradeRegister(email=request.form["email"], password=hashed_password,
                           name=request.form['name'], documents=request.files['documents'].read())
        db.session.add(trade_register)
        db.session.commit()
    else:
        print("Incomplete form data")
    return redirect(url_for("registerregister_get"))

