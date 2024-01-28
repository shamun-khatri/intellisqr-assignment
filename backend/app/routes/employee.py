from flask import Blueprint, request, jsonify
from app.models.employee_model import Employee
from app.extensions import db

bp = Blueprint("employee", __name__, url_prefix="/api/v1/")

@bp.route("/")
def print_hello():
    return __name__ + " Hello World!"

@bp.route("/addemployee", methods=["POST"])
def add_employee():
    try:
        data = request.json 

        required_fields = ["name", "position", "salary"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        new_employee = Employee(
            name=data["name"],
            position=data["position"],
            salary=data["salary"]
        )

        # Add the new employee to the database
        db.session.add(new_employee)
        db.session.commit()
        last_employee = Employee.query.order_by(Employee.id.desc()).first()
        last_employee_dict = {
        "id": last_employee.id,
        "name": last_employee.name,  # Replace with actual fields in your Employee model
        "position": last_employee.position,
        "salary": last_employee.salary
        }
        return jsonify(last_employee_dict), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@bp.route("/getallemployee", methods=["GET"])
def get_all_employee():
    try:
        employees = Employee.query.all()
        employee_list = [{"id": employee.id, "name": employee.name, "position": employee.position, "salary": employee.salary} for employee in employees]
        return jsonify(employee_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@bp.route("/updateemployee/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
    try:
        employee = Employee.query.get(employee_id)
        if not employee:
            return jsonify({"error": f"Employee with ID {employee_id} not found"}), 404

        data = request.json 

        if "name" in data:
            employee.name = data["name"]
        if "position" in data:
            employee.position = data["position"]
        if "salary" in data:
            employee.salary = data["salary"]

        db.session.commit()

        return jsonify({"message": f"Employee with ID {employee_id} updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@bp.route("/deleteemployee/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    try:
        employee = Employee.query.get(employee_id)
        if not employee:
            return jsonify({"error": f"Employee with ID {employee_id} not found"}), 404

        db.session.delete(employee)
        db.session.commit()

        return jsonify({"message": f"Employee with ID {employee_id} deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500