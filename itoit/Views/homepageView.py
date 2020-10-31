import random
import string

from flask import render_template, url_for, redirect, request
from flask_login import login_user, current_user, logout_user, login_required
from itoit.Models import models
from itoit import app

@app.route("/", methods=['GET'])
@app.route("/index", methods=['GET'])
def home():
    return render_template("index.jinja", user=current_user)
