import sys

from flask import *
from flask_sqlalchemy import *

# Instantiate the application and define settings.
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "YOUR_KEY_HERE"  # RNG str >16 B should suffice.
BADGER_AUTHORIZATION_TOKEN = "ANOTHER_SECRET_KEY_HERE"

# Load the database.
db = SQLAlchemy(app)
from model import *
with app.app_context():
	db.create_all()
	# If there is no admin account, make a default one.
	if Account.query.filter_by(name="admin", type=1).first() == None:
		admin = Account(1, "password", None, "admin", None, None)
		db.session.add(admin)
		db.session.commit()

from security import *
from route import *
from api import *
