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
            "url": flask.url_for("bankdocuments", id=bank.id)
        })
    return flask.jsonify(ret)

@app.route('/bankdocuments/<int:id>')
def bankdocuments(id):
    bank = models.Bank.query.filter(models.Bank.id==id).first()
    return app.response_class(bank.documents, mimetype='application/pdf')
