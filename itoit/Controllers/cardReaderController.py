from itoit import app, db
from flask_login import login_user, current_user
from itoit.Models import models
from flask import jsonify, request

import requests

@app.route("/readIdCard", methods=["POST"])
def readIdCard():

    print(request.files)
    url = "https://accurascan.com/api/v4/ocr"

    headers = {
        "Api-Key": "1604168001EBhvM9bqrlHuKYrc77rBCSpkANId5WJyc0MnIgKx"
    }



    data = {
        "country_code": "ROU",
        "card_code": "RONID",
        "scan_image": request.files["image"].read()
    }

    print(request.files["image"].read())

    response = requests.post(url, headers=headers, data=data, timeout=None)

    print(response.json())

    return jsonify(response.json())