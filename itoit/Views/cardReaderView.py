from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required

from itoit import app


@app.route("/cardReader", methods=['GET', "POST"])
def cardReader():
    form = None
    if request.method == "GET":
        return render_template("cardReader.jinja", user=current_user, form=form)
    else:
        form = True
        return render_template("cardReader.jinja", user=current_user, form=form)
