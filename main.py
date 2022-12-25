from flask import Flask, render_template


app = Flask(__name__, template_folder="", static_folder="")

@app.route("/")
def index():
    return render_template("index.html.", title="Главная")

@app.route("/horse_module")
def hourse_module():
    return render_template("module.html", folder="horse", width="850", height="650", title="horse")

@app.route("/huffman_module")
def huffman_module():
    return render_template("module.html", folder="huffman", width="900", height="650", title="huffman")

@app.route("/kruskal_module")
def kruskal_module():
    return render_template("module.html", folder="kruskal", width="910", height="620", title="kruskal")

# @app.route("/dijkstra_module")
# def dijkstra_module():
#     return render_template("index.html", folder="dijkstra", width="850", height="750", title="dijkstra")


if __name__ == "__main__":
    app.run()