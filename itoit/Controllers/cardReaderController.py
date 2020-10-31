from itoit import app, db
from flask_login import login_user, current_user
from itoit.Models import models
from flask import jsonify, request, render_template

import base64

import requests


@app.route("/readIdCard", methods=["POST"])
def readIdCard():
    url = "https://accurascan.com/api/v4/ocr"

    image_bytes = request.files["image"].read()
    base64Image = base64.b64encode(image_bytes)

    headers = {
        "Api-Key": "1604168001EBhvM9bqrlHuKYrc77rBCSpkANId5WJyc0MnIgKx"
    }

    data = {
        "country_code": "ROU",
        "card_code": "RONID",
        "scan_image_base64": base64Image
    }

    response = requests.post(url, headers=headers, data=data, timeout=None)

    print(response.json())

    return render_template("cardReader.jinja", user=current_user, form=response.json())


@app.route("/incarca-documente", methods=["POST"])
def incarcaDocumente():
    data = request.form

    current_user.cnp = data["cnp"]
    current_user.name = data["name"]
    current_user.serie = data["serie"]
    current_user.domiciliu = data["domiciliu"]
    current_user.adresa_sediu = data["adresa-sediu"]

    db.session.add(current_user)
    db.session.commit()

    return render_template("cardReader.jinja", user=current_user, form=None)
