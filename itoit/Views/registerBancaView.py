from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/registerbanca", methods=['GET'])
def registerbanca():
    # TODO: make sure current_user is admin
    return render_template("registerbanca.jinja")
