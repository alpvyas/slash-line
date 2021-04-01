# from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
import random
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    if not User.query.filter_by(first_name="Demo").all():
        demo = User(first_name='Demo', last_name='User', username='Demo',
                    email='demo@demo.com',
                    password='password', )
        db.session.add(demo)
        db.session.commit()

    x = 10

    while x >= 0:
        name = fake.first_name()
        email = fake.email()
        email = email.split("@")
        email[0] = email[0] + f'{random.randint(0, 9999)}@'
        email = ''.join(email)
        u = User(first_name=name,
                 last_name=fake.last_name(),
                 username=f'{name}{random.randint(0,9999)}',
                 email=email,
                 password='password')
        db.session.add(u)
        db.session.commit()
        x -= 1


# Adds a demo user, you can add other users here if you want
# def seed_users():

#     demo = User(username='Demo', email='demo@aa.io',
#                 password='password')

#     db.session.add(demo)

#     db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
