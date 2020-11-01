from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required
from itoit.Models import models
from itoit import app

@app.route("/dosar", methods=['GET'])
def dosar():
    return render_template("dosar.html", user=current_user)
