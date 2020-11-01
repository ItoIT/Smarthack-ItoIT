from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app, db
from itoit.Models import models


@app.route("/acte", methods=['GET'])
def acte_get():
    if current_user.bank_id is not None:
        return render_template("actebanca.jinja", user=current_user)
    elif current_user.trade_register_id is not None:
        return render_template("acteregister.jinja", user=current_user)

    firm = models.Firm.query.filter(models.Firm.user_id == current_user.id).first()
    return render_template("acte.jinja", user=current_user, firm=firm)

@app.route("/acte", methods=['POST'])
def acte_post():
    if current_user.bank_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==request.form['firm']).filter(models.Firm.bank_id==current_user.bank_id).first()
        if request.form['approve'] is not None:
            if firm.bank_documents_approved == False:
                firm.bank_documents_approved = True
            else:
                firm.factura_capital_approved = True
        else:
            firm.feedback = request.form['feedback']
        db.session.add(firm)
        db.session.commit()
    elif current_user.trade_register_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==request.form['firm']).filter(models.Firm.trade_register_id==current_user.trade_register_id).first()
        if request.form['approve'] is not None:
            db.session.add(firm)
            db.session.commit()
        else:
            firm.feedback = request.form['feedback']
        db.session.add(firm)
        db.session.commit
    return redirect(url_for("acte_get"))
