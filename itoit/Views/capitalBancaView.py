from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/capitalbanca", methods=['GET'])
def capitalbanca():
    return render_template("capitalbanca.jinja")
