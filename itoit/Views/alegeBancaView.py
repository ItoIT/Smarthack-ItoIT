from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app, db
from itoit.Models import models


@app.route("/alegebanca", methods=['GET'])
def alegebanca_get():
    return render_template("alegebanca.jinja", user=current_user)


@app.route("/alegebanca", methods=['POST'])
def alegebanca_post():
    firm = models.Firm.query.filter(models.Firm.user_id==current_user.id).first()
    if firm is None:
        firm = models.Firm(user_id=current_user.id)
    firm.name = request.form["name"]
    firm.bank_id = request.form["banca"]
    firm.bank_documents = request.files['completatebanca'].read()
    firm.feedback = None
    db.session.add(firm)
    db.session.commit()
    return redirect(url_for("acte_get"))
