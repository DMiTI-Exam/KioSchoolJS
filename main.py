#!/usr/bin/env python3
from flask import Flask, render_template


app = Flask(__name__, static_folder="")
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 3600


@app.route("/")
def index():
    return render_template("index.html", title="Главная")

@app.route("/translated_tasks")
def translated_tasks():
    return render_template("translated_tasks.html", title="Модули")

@app.route("/horse_module")
def hourse_module():
    return render_template("module.html", module_name="horse", width="850", height="650", title="Ход конём")

@app.route("/huffman_module")
def huffman_module():
    return render_template("module.html", module_name="huffman", width="900", height="650", title="Алгоритм Хаффмана")

@app.route("/kruskal_module")
def kruskal_module():
    return render_template("module.html", module_name="kruskal", width="910", height="620", title="Алгоритм Краскала")

@app.route("/dijkstra_module")
def dijkstra_module():
    return render_template("module.html", module_name="dijkstra", width="850", height="750", title="Алгоритм Дейкстры")

@app.route("/euler_module")
def euler_module():
    return render_template("module.html", module_name="euler", width="900", height="600", title="Алгоритм Эйлера")

@app.route("/matching_module")
def matching_module():
    return render_template("module.html", module_name="matching",
                           width="900", height="600", title="Алгоритм построения максимального паросочетания")

@app.after_request
def add_cache_control_header(response):
    response.cache_control.max_age = 3600
    response.cache_control.public = True
    return response


if __name__ == "__main__":
    app.run(host = '0.0.0.0')
