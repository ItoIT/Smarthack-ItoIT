from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from itoit.Helpers import settings

app = Flask(__name__)
app.config['SECRET_KEY'] = settings.api_secret_key
app.config['SQLALCHEMY_DATABASE_URI'] = settings.sqlalchemy_database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.sqlalchemy_track_modifications
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
Bootstrap(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
login_manager.init_app(app)

from .Controllers import registerController
from .Controllers import loginController
from .Controllers import banciController
from .Controllers import registersController
from .Controllers import firmsController

from .Views import homepageView
from .Views import acteView
from .Views import alegeBancaView
from .Views import capitalBancaView
from .Views import registruView
from .Views import registerBancaView
from .Views import registerRegisterView
