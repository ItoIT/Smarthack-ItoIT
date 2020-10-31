from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app, db
from itoit.Models import models


@app.route("/capitalbanca", methods=['GET'])
def capitalbanca_get():
    return render_template("capitalbanca.jinja", user=current_user)

@app.route("/capitalbanca", methods=['POST'])
def capitalbanca_post():
    firm = models.Firm.query.filter(models.Firm.user_id==current_user.id).first()
    firm.factura_capital = request.files['completatebanca'].read()
    firm.feedback = None
    db.session.add(firm)
    db.session.commit()
    return redirect(url_for("capitalbanca_get"))
