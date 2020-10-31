from itoit import app, db
from flask_login import login_user
from itoit.Models import models
import flask

@app.route('/banci', methods=['GET'])
def banci():
    banks = models.Bank.query.all()
    ret = []
    for bank in banks:
        ret.append({
            "id": bank.id,
            "name": bank.name,
            "url": "ikolergjgioeri8g9oreio"
        })
    return flask.jsonify(ret)
