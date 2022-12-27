#!/usr/bin/env python3
from flask import Flask, render_template


app = Flask(__name__, static_folder="")


@app.route("/")
def index():
    return render_template("index.html", title="Главная")

@app.route("/translated_tasks")
def translated_tasks():
    return render_template("translated_tasks.html", title="Модули")

@app.route("/horse_module")
def hourse_module():
    return render_template("module.html", folder="./horse", width="850", height="650", title="Ход конём")

@app.route("/huffman_module")
def huffman_module():
    return render_template("module.html", folder="./huffman", width="900", height="650", title="Алгоритм Хаффмана")

@app.route("/kruskal_module")
def kruskal_module():
    return render_template("module.html", folder="./kruskal", width="910", height="620", title="Алгоритм Краскала")

@app.route("/dijkstra_module")
def dijkstra_module():
    return render_template("module.html", folder="./dijkstra", width="850", height="750", title="Алкгоритм Дейкстры")


if __name__ == "__main__":
    app.run()