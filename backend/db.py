import sqlite3
import json
from datetime import datetime

DB_PATH = "strategist_vault.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS selections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME,
            venue TEXT,
            pitch TEXT,
            weather TEXT,
            toss TEXT,
            opponent TEXT,
            team_data TEXT,
            feedback_score INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

def save_selection(params, team_data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO selections (timestamp, venue, pitch, weather, toss, opponent, team_data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.now().isoformat(),
        params['venue'],
        params['pitch'],
        params['weather'],
        params['toss'],
        params['opponent'],
        json.dumps(team_data)
    ))
    conn.commit()
    conn.close()

def get_history():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM selections ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    conn.close()
    
    history = []
    for row in rows:
        history.append({
            "id": row[0],
            "timestamp": row[1],
            "params": {
                "venue": row[2],
                "pitch": row[3],
                "weather": row[4],
                "toss": row[5],
                "opponent": row[6]
            },
            "team_data": json.loads(row[7]),
            "feedback": row[8]
        })
    return history

def update_feedback(selection_id, score):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('UPDATE selections SET feedback_score = ? WHERE id = ?', (score, selection_id))
    conn.commit()
    conn.close()
