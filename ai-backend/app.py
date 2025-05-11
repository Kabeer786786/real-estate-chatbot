from flask import Flask, request, jsonify

app = Flask(__name__)

# Root route
@app.route('/')
def home():
    return 'Welcome to the Flask backend!'

# Example POST route
@app.route('/data', methods=['POST'])
def handle_data():
    data = request.get_json()
    return jsonify({
        'message': 'Data received successfully',
        'data': data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)   #Backend Live at http://localhost:5000
