from itoit import app, db
from flask_login import login_user
from itoit.Models import models
from flask import request, render_template


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    register(data)
    return render_template('index.jinja', user=user)


def register(form):
    hashed_password = bcrypt.generate_password_hash(form["password"]).decode('utf-8')
    user = models.Users(email=form["email"], password=hashed_password)
    db.session.add(user)
    db.session.commit()
