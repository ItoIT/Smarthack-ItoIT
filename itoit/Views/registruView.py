from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/registru", methods=['GET'])
def registru():
    return render_template("registru.jinja", user=current_user)
