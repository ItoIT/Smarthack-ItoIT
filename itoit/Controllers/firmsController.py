from itoit import app, db
from flask_login import login_user, current_user
from itoit.Models import models
import flask

@app.route('/firms', methods=['GET'])
def firms():
    firms = models.Firm.query.filter(models.Firm.user_id == current_user.id).all()
    ret = []
    for firm in firms:
        ret.append({
            "id": firm.id,
            "bank_documents_url": flask.url_for("firmbankdocuments", firm.id),
            "bank_documents_approved": firm.bank_documents_approved,
            "register_documents_url": flask.url_for("firmregisterdocuments", firm.id),
            "register_documents_approved": firmn.register_documents_approved,
            "factura_capital_url": flask.url_for("firmfacturacapital", firm.id),
            "factura_capital_approved": firm.factura_capital_approved
        })
    return flask.jsonify(ret)

@app.route('/firmbankdocuments/<int:id>')
def firm_bank_documents(id):
    firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.bank_documents, mimetype='application/pdf')

@app.route('/firmregisterdocuments/<int:id>')
def firm_register_documents(id):
    firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.register_documents, mimetype='application/pdf')

@app.route('/firmfacturacapital/<int:id>')
def firm_factura_capital(id):
    firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.factura_capital, mimetype='application/pdf')
