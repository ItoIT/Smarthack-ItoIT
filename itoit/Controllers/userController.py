from itoit import app, db
from flask_login import current_user
from itoit.Models import models
import flask

@app.route('/user', methods=['GET'])
def user():
    return {
        "name": current_user.name,
        "email": current_user.email,
        "cnp": current_user.cnp,
        "serie": current_user.serie,
        "domiciliu": current_user.domiciliu,
        "adresa_sediu": current_user.adresa_sediu
    }