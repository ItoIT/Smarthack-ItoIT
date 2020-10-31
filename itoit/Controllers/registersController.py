from itoit import app, db
from flask_login import login_user
from itoit.Models import models
import flask

@app.route('/registers', methods=['GET'])
def registers():
    registers = models.TradeRegister.query.all()
    ret = []
    for register in registers:
        ret.append({
            "id": register.id,
            "name": register.name,
            "url": flask.url_for("registerdocuments", id=register.id)
        })
    return flask.jsonify(ret)

@app.route('/registerdocuments/<int:id>')
def registerdocuments(id):
    register = models.TradeRegister.query.filter(models.TradeRegister.id==id).first()
    return app.response_class(register.documents, mimetype='application/pdf')
