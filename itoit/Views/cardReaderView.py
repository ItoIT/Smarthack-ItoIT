from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/cardReader", methods=['GET'])
def cardReader():
    return render_template("cardReader.jinja", user=current_user)
