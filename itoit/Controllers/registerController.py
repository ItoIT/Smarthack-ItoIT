from itoit import app, db
from flask_login import login_user
from itoit.Models import models
import flask

@app.route('/register', methods=['POST'])
def register():
    if flask.request.method == 'POST':
        data = request.json

        user = models.Users(email=data["email"], password=data["password"])
        db.session.add(user)
        db.session.commit()
        return flask.render_template('index.jinja', user=user)