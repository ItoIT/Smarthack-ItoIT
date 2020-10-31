from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/acte", methods=['GET'])
def acte():
    return render_template("acte.jinja", user=current_user)
