from flask import Flask, render_template


app = Flask(__name__, template_folder="", static_folder="")

@app.route("/")
def index():
    return "Тут будет главная страница, если успеем"

@app.route("/hourse_module")
def hourse_module():
    return render_template("index.html", folder="hourse")

@app.route("/huffman_module")
def huffman_module():
    return render_template("index.html", folder="huffman")

@app.route("/kruskal_module")
def kruskal_module():
    return render_template("index.html", folder="kruskal")

# @app.route("/")
# def index():
#     return render_template("index.html")


if __name__ == "__main__":
    app.run()