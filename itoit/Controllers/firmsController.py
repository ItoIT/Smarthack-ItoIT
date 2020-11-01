from itoit import app, db
from flask_login import login_user, current_user
from itoit.Models import models
import flask

@app.route('/firms', methods=['GET'])
def firms():
    if current_user.bank_id is not None:
        firms = models.Firm.query.filter(models.Firm.bank_id == current_user.bank_id).all()
    elif current_user.trade_register_id is not None:
        firms = models.Firm.query.filter(models.Firm.trade_register_id == current_user.trade_register_id).all()
    else:
        firms = models.Firm.query.filter(models.Firm.user_id == current_user.id).all()
    ret = []
    for firm in firms:
        ret.append({
            "id": firm.id,
            "name": firm.name,
            "iban": firm.iban,
            "bank_name": firm.bank.name if firm.bank else 'None',
            "trade_register_name": firm.trade_register.name if firm.trade_register else 'None',
            "bank_documents_url": flask.url_for("firm_bank_documents", id=firm.id),
            "bank_documents_approved": firm.bank_documents_approved,
            "register_documents_url": flask.url_for("firm_register_documents", id=firm.id),
            "register_documents_approved": firm.register_documents_approved,
            "factura_capital_url": flask.url_for("firm_factura_capital", id=firm.id),
            "factura_capital_approved": firm.factura_capital_approved,
            "acte_complete_url": flask.url_for("firm_complete_documents", id=firm.id),
            "feedback": firm.feedback
        })
    return flask.jsonify(ret)


@app.route('/firmbankdocuments/<int:id>')
def firm_bank_documents(id):
    if current_user.bank_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.bank_id == current_user.bank_id).first()
    elif current_user.trade_register_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.trade_register_id == current_user.trade_register_id).first()
    else:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.bank_documents, mimetype='application/pdf')

@app.route('/firmregisterdocuments/<int:id>')
def firm_register_documents(id):
    if current_user.bank_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.bank_id == current_user.bank_id).first()
    elif current_user.trade_register_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.trade_register_id == current_user.trade_register_id).first()
    else:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.register_documents, mimetype='application/pdf')

@app.route('/firmfacturacapital/<int:id>')
def firm_factura_capital(id):
    if current_user.bank_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.bank_id == current_user.bank_id).first()
    elif current_user.trade_register_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.trade_register_id == current_user.trade_register_id).first()
    else:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.factura_capital, mimetype='application/pdf')

@app.route('/firmcompletedocuments/<int:id>')
def firm_complete_documents(id):
    if current_user.bank_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.bank_id == current_user.bank_id).first()
    elif current_user.trade_register_id is not None:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.trade_register_id == current_user.trade_register_id).first()
    else:
        firm = models.Firm.query.filter(models.Firm.id==id).filter(models.Firm.user_id==current_user.id).first()
    return app.response_class(firm.complete_documents, mimetype='application/pdf')
