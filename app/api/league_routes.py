from flask import Blueprint, jsonify, json, request
from app.models import db, League

league_routes = Blueprint("league_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         League Operation Functions
# ------------------------------------------------------------------------------


# def get_one_notebook(notebook_id):
#     notebook = Notebook.query.filter_by(id=notebook_id).first()
#     return notebook


# def get_all_notebooks(user_id):
#     notebooks = Notebook.query.filter_by(user_id=user_id).all()
#     return jsonify({"notebooks": [notebook.to_dict() for notebook in
# notebooks]})


def add_league():
    league_data = json.loads(request.data.decode("utf-8"))

    league = League(name=league_data["name"],
                    type=league_data["type"],
                    permissions=league_data["permissions"],
                    draft=league_data["draft"],
                    draft_date=league_data["draft_date"],
                    draft_time=league_data["draft_time"],
                    user_id=league_data["user_id"])

    db.session.add(league)
    db.session.commit()
    return json.dumps(league.to_dict(), default=str)


# def delete_notebook(notebook_id):
#     # notes = Note.query.filter_by(notebook_id = notebook_id).all()
#     # for note in notes:
#     #     db.delete(note)
#     #     db.session.commit()

#     notebook = Notebook.query.filter_by(id=notebook_id)

#     db.session.delete(notebook)
#     db.session.commit()
#     return jsonify({"message": "Notebook successfully deleted"})


# def edit_notebook(notebook_id):
#     edit_notebook_data = json.loads(request.data.decode("utf-8"))
#     notebook = get_one_notebook(notebook_id)

#     if notebook.name is not edit_notebook_data["name"]:
#         notebook.name = edit_notebook_data["name"]
#     if notebook.user_id is not edit_notebook_data["user_id"]:
#         notebook.user_id = edit_notebook_data["user_id"]

#     db.session.commit()
#     return jsonify(notebook.to_dict())

# ------------------------------------------------------------------------------
#                    RESTful Routes -- Leagues
# ------------------------------------------------------------------------------

# get_all
# add_league


@league_routes.route("", methods=['GET', 'POST'])
def get_or_add_leagues():
    if request.method == 'GET':
        return "hello"  # get_all_leagues(user_id)
    elif request.method == 'POST':
        return add_league()

# delete


# @notebook_routes.route("/notebooks/<int:notebook_id>", methods=['DELETE'])
# def delete_user_note(user_id, notebook_id):
#     return delete_notebook(notebook_id)

# # edit


# @notebook_routes.route("/notebooks/<int:notebook_id>", methods=['PUT'])
# def edit_user_notebook(user_id, notebook_id):
#     return edit_notebook(notebook_id)
