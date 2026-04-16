from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import psutil
import os
import subprocess

app = Flask(__name__)
CORS(app)

# ===============================
# GET PROCESSES
# ===============================
@app.route("/processes")
def processes():
    result = []

    for p in psutil.process_iter(['pid', 'name', 'status']):
        try:
            result.append({
                "pid": p.info['pid'],
                "name": p.info['name'],
                "cpu": p.cpu_percent(interval=0.1),
                "memory": round(p.memory_info().rss / 1024 / 1024, 2),
                "status": p.info['status'],
                "zombie": p.info['status'] == "zombie"
            })
        except:
            continue

    return jsonify(result)


# ===============================
# KILL PROCESS
# ===============================
@app.route("/kill", methods=["POST"])
def kill():
    pid = request.json.get("pid")
    try:
        os.kill(pid, 9)
        return jsonify({"message": "Process killed"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===============================
# CHANGE PRIORITY
# ===============================
@app.route("/priority", methods=["POST"])
def priority():
    pid = request.json.get("pid")
    pr = request.json.get("priority")

    try:
        os.system(f"renice {pr} -p {pid}")
        return jsonify({"message": "Priority changed"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===============================
# TERMINAL
# ===============================
@app.route("/ssh", methods=["POST"])
def ssh():
    command = request.json.get("command")

    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True
        )
        output = result.stdout + result.stderr
    except Exception as e:
        output = str(e)

    return jsonify({"output": output})


# ===============================
# DOWNLOAD DATABASE
# ===============================
@app.route("/backup")
def backup():
    os.system("mysqldump -u root -p process_manager > backup.sql")
    return send_file("backup.sql", as_attachment=True)


# ===============================
# RUN SERVER (IP DINAMIS)
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
