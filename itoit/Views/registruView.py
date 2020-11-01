from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app, db
from itoit.Models import models


@app.route("/registru", methods=['GET'])
def registru_get():
    return render_template("registru.jinja", user=current_user)

@app.route("/registru", methods=['POST'])
def registru_post():
    firm = models.Firm.query.filter(models.Firm.user_id==current_user.id).first()
    parts = request.form['judete'].split('/')
    firm.register_documents = request.files['completatebanca'].read()
    firm.trade_register_id = parts[2]
    firm.feedback = None
    db.session.add(firm)
    db.session.commit()
    return redirect(url_for("acte_get"))
