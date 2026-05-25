from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'esports.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/colocacoes', methods=['GET'])
def get_colocacoes():
    conn = get_db()
    cursor = conn.cursor()
    mes = request.args.get('mes')
    search = request.args.get('search')
    sql = "SELECT * FROM colocacoes WHERE 1=1"
    params = []
    if mes:
        sql += " AND Mes = ?"
        params.append(mes)
    if search:
        sql += " AND (Time LIKE ? OR Mes LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])
    sql += " ORDER BY Mes DESC, Dia DESC, Q1_Pos ASC"
    cursor.execute(sql, params)
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(rows)

@app.route('/api/colocacoes', methods=['POST'])
def create_colocacao():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (data['Mes'], data['Dia'], data['Time'], data['Q1_Pos'], data['Q2_Pos'], data['Q3_Pos']))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({"id": new_id, **data}), 201

@app.route('/api/colocacoes/<int:id>', methods=['PUT'])
def update_colocacao(id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE colocacoes SET Mes=?, Dia=?, Time=?, Q1_Pos=?, Q2_Pos=?, Q3_Pos=?
        WHERE id=?
    """, (data['Mes'], data['Dia'], data['Time'], data['Q1_Pos'], data['Q2_Pos'], data['Q3_Pos'], id))
    conn.commit()
    conn.close()
    return jsonify({"id": id, **data})

@app.route('/api/colocacoes/<int:id>', methods=['DELETE'])
def delete_colocacao(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM colocacoes WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Colocação excluída"})

@app.route('/api/jogadores', methods=['GET'])
def get_jogadores():
    conn = get_db()
    cursor = conn.cursor()
    mes = request.args.get('mes')
    time = request.args.get('time')
    search = request.args.get('search')
    sql = "SELECT * FROM jogadores WHERE 1=1"
    params = []
    if mes:
        sql += " AND Mes = ?"
        params.append(mes)
    if time:
        sql += " AND Time = ?"
        params.append(time)
    if search:
        sql += " AND (Jogador LIKE ? OR Time LIKE ? OR Mes LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%", f"%{search}%"])
    sql += " ORDER BY Mes DESC, Dia DESC"
    cursor.execute(sql, params)
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(rows)

@app.route('/api/jogadores', methods=['POST'])
def create_jogador():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (data['Mes'], data['Dia'], data['Time'], data['Jogador'], data['Q1_Kills'], data['Q2_Kills'], data['Q3_Kills']))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({"id": new_id, **data}), 201

@app.route('/api/jogadores/<int:id>', methods=['PUT'])
def update_jogador(id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE jogadores SET Mes=?, Dia=?, Time=?, Jogador=?, Q1_Kills=?, Q2_Kills=?, Q3_Kills=?
        WHERE id=?
    """, (data['Mes'], data['Dia'], data['Time'], data['Jogador'], data['Q1_Kills'], data['Q2_Kills'], data['Q3_Kills'], id))
    conn.commit()
    conn.close()
    return jsonify({"id": id, **data})

@app.route('/api/jogadores/<int:id>', methods=['DELETE'])
def delete_jogador(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM jogadores WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Jogador excluído"})

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(DISTINCT Time) as total_times FROM (SELECT Time FROM colocacoes UNION SELECT Time FROM jogadores)")
    total_times = cursor.fetchone()['total_times']
    cursor.execute("SELECT COUNT(*) as total_jogadores FROM jogadores")
    total_jogadores = cursor.fetchone()['total_jogadores']
    cursor.execute("SELECT COUNT(DISTINCT Mes || '-' || Dia) as total_partidas FROM colocacoes")
    total_partidas = cursor.fetchone()['total_partidas']
    cursor.execute("SELECT SUM(Q1_Kills + Q2_Kills + Q3_Kills) as total_kills FROM jogadores")
    total_kills = cursor.fetchone()['total_kills'] or 0
    conn.close()
    return jsonify({
        "total_times": total_times,
        "total_jogadores": total_jogadores,
        "total_partidas": total_partidas,
        "total_kills": total_kills
    })

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    conn = get_db()
    cursor = conn.cursor()

    # Kills por time
    cursor.execute("""
        SELECT Time, SUM(Q1_Kills + Q2_Kills + Q3_Kills) as total 
        FROM jogadores GROUP BY Time ORDER BY total DESC LIMIT 10
    """)
    kills_por_time = [dict(row) for row in cursor.fetchall()]

    # Top jogadores
    cursor.execute("""
        SELECT Jogador, SUM(Q1_Kills + Q2_Kills + Q3_Kills) as total 
        FROM jogadores GROUP BY Jogador ORDER BY total DESC LIMIT 10
    """)
    top_jogadores = [dict(row) for row in cursor.fetchall()]

    # Distribuição Q1
    cursor.execute("SELECT Q1_Pos as posicao, COUNT(*) as quantidade FROM colocacoes GROUP BY Q1_Pos")
    distribuicao_q1 = [dict(row) for row in cursor.fetchall()]

    # Kills por quartil
    cursor.execute("""
        SELECT 
            SUM(Q1_Kills) as q1_total,
            SUM(Q2_Kills) as q2_total,
            SUM(Q3_Kills) as q3_total
        FROM jogadores
    """)
    kills_quartis = dict(cursor.fetchone())

    conn.close()
    return jsonify({
        "kills_por_time": kills_por_time,
        "top_jogadores": top_jogadores,
        "distribuicao_q1": distribuicao_q1,
        "kills_quartis": kills_quartis
    })

@app.route('/api/export/sql', methods=['GET'])
def export_sql():
    conn = get_db()
    cursor = conn.cursor()
    sql = ["-- eSports Database Export", "PRAGMA foreign_keys=OFF;", "BEGIN TRANSACTION;"]

    cursor.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name IN ('colocacoes', 'jogadores')")
    for row in cursor.fetchall():
        sql.append(row[0] + ";")

    cursor.execute("SELECT * FROM colocacoes")
    for row in cursor.fetchall():
        vals = ", ".join([f"'{str(v).replace(chr(39), chr(39)+chr(39))}'" if isinstance(v, str) else str(v) for v in row])
        sql.append(f"INSERT INTO colocacoes VALUES ({vals});")

    cursor.execute("SELECT * FROM jogadores")
    for row in cursor.fetchall():
        vals = ", ".join([f"'{str(v).replace(chr(39), chr(39)+chr(39))}'" if isinstance(v, str) else str(v) for v in row])
        sql.append(f"INSERT INTO jogadores VALUES ({vals});")

    sql.append("COMMIT;")
    conn.close()
    return "\n".join(sql), 200, {"Content-Type": "text/plain"}

@app.route('/api/export/csv', methods=['GET'])
def export_csv():
    conn = get_db()
    cursor = conn.cursor()
    csv = ["Tipo;Mes;Dia;Time;Jogador;Q1;Q2;Q3"]

    cursor.execute("SELECT * FROM colocacoes")
    for row in cursor.fetchall():
        csv.append(f"Colocacao;{row['Mes']};{row['Dia']};{row['Time']};;{row['Q1_Pos']};{row['Q2_Pos']};{row['Q3_Pos']}")

    cursor.execute("SELECT * FROM jogadores")
    for row in cursor.fetchall():
        csv.append(f"Jogador;{row['Mes']};{row['Dia']};{row['Time']};{row['Jogador']};{row['Q1_Kills']};{row['Q2_Kills']};{row['Q3_Kills']}")

    conn.close()
    return "\n".join(csv), 200, {"Content-Type": "text/csv", "Content-Disposition": "attachment; filename=esports.csv"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
