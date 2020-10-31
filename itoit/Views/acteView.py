from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/acte", methods=['GET'])
def acte():
    if current_user.bank_id is not None:
        return render_template("actebanca.jinja", user=current_user)
    else if current_user.trade_register_id is not None:
        return render_template("acteregister.jinja", user=current_user)
    return render_template("acte.jinja", user=current_user)
