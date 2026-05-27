from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel, Field
from typing import List, Optional
import os

# ─── Config ──────────────────────────────────────────────────────────
DB_PATH = os.path.join(os.path.dirname(__file__), "esports.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ─── Models ──────────────────────────────────────────────────────────
class Colocacao(Base):
    __tablename__ = "colocacoes"
    id = Column(Integer, primary_key=True, index=True)
    Mes = Column(String, nullable=False)
    Dia = Column(Integer, nullable=False)
    Time = Column(String, nullable=False)
    Q1_Pos = Column(Integer, nullable=False)
    Q2_Pos = Column(Integer, nullable=False)
    Q3_Pos = Column(Integer, nullable=False)

class Jogador(Base):
    __tablename__ = "jogadores"
    id = Column(Integer, primary_key=True, index=True)
    Mes = Column(String, nullable=False)
    Dia = Column(Integer, nullable=False)
    Time = Column(String, nullable=False)
    Jogador = Column(String, nullable=False)
    Q1_Kills = Column(Integer, nullable=False)
    Q2_Kills = Column(Integer, nullable=False)
    Q3_Kills = Column(Integer, nullable=False)

# ─── Schemas (Pydantic) ──────────────────────────────────────────────
class ColocacaoCreate(BaseModel):
    Mes: str = Field(..., min_length=1, max_length=20)
    Dia: int = Field(..., ge=1, le=31)
    Time: str = Field(..., min_length=1, max_length=100)
    Q1_Pos: int = Field(..., ge=1, le=20)
    Q2_Pos: int = Field(..., ge=1, le=20)
    Q3_Pos: int = Field(..., ge=1, le=20)

class ColocacaoOut(ColocacaoCreate):
    id: int
    class Config:
        from_attributes = True

class JogadorCreate(BaseModel):
    Mes: str = Field(..., min_length=1, max_length=20)
    Dia: int = Field(..., ge=1, le=31)
    Time: str = Field(..., min_length=1, max_length=100)
    Jogador: str = Field(..., min_length=1, max_length=100)
    Q1_Kills: int = Field(..., ge=0)
    Q2_Kills: int = Field(..., ge=0)
    Q3_Kills: int = Field(..., ge=0)

class JogadorOut(JogadorCreate):
    id: int
    class Config:
        from_attributes = True

class StatsOut(BaseModel):
    total_times: int
    total_jogadores: int
    total_partidas: int
    total_kills: int

class DashboardOut(BaseModel):
    kills_por_time: List[dict]
    top_jogadores: List[dict]
    distribuicao_q1: List[dict]
    kills_quartis: dict

# ─── Dependency ──────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ─── App ─────────────────────────────────────────────────────────────
app = FastAPI(
    title="eSports Manager API",
    description="API REST para gerenciamento de estatísticas de eSports",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# ─── Colocações ──────────────────────────────────────────────────────
@app.get("/api/colocacoes", response_model=List[ColocacaoOut], tags=["Colocações"])
def get_colocacoes(
    db: Session = Depends(get_db),
    mes: Optional[str] = Query(None, description="Filtrar por mês"),
    search: Optional[str] = Query(None, description="Buscar por time ou mês"),
):
    query = db.query(Colocacao)
    if mes:
        query = query.filter(Colocacao.Mes == mes)
    if search:
        query = query.filter(
            (Colocacao.Time.ilike(f"%{search}%")) |
            (Colocacao.Mes.ilike(f"%{search}%"))
        )
    return query.order_by(Colocacao.Mes.desc(), Colocacao.Dia.desc(), Colocacao.Q1_Pos).all()

@app.post("/api/colocacoes", response_model=ColocacaoOut, status_code=201, tags=["Colocações"])
def create_colocacao(data: ColocacaoCreate, db: Session = Depends(get_db)):
    db_item = Colocacao(**data.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/api/colocacoes/{id}", response_model=ColocacaoOut, tags=["Colocações"])
def update_colocacao(id: int, data: ColocacaoCreate, db: Session = Depends(get_db)):
    db_item = db.query(Colocacao).filter(Colocacao.id == id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Colocação não encontrada")
    for key, value in data.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/api/colocacoes/{id}", tags=["Colocações"])
def delete_colocacao(id: int, db: Session = Depends(get_db)):
    db_item = db.query(Colocacao).filter(Colocacao.id == id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Colocação não encontrada")
    db.delete(db_item)
    db.commit()
    return {"message": "Colocação excluída"}

# ─── Jogadores ───────────────────────────────────────────────────────
@app.get("/api/jogadores", response_model=List[JogadorOut], tags=["Jogadores"])
def get_jogadores(
    db: Session = Depends(get_db),
    mes: Optional[str] = Query(None, description="Filtrar por mês"),
    time: Optional[str] = Query(None, description="Filtrar por time"),
    search: Optional[str] = Query(None, description="Buscar por jogador, time ou mês"),
):
    query = db.query(Jogador)
    if mes:
        query = query.filter(Jogador.Mes == mes)
    if time:
        query = query.filter(Jogador.Time == time)
    if search:
        query = query.filter(
            (Jogador.Jogador.ilike(f"%{search}%")) |
            (Jogador.Time.ilike(f"%{search}%")) |
            (Jogador.Mes.ilike(f"%{search}%"))
        )
    return query.order_by(Jogador.Mes.desc(), Jogador.Dia.desc()).all()

@app.post("/api/jogadores", response_model=JogadorOut, status_code=201, tags=["Jogadores"])
def create_jogador(data: JogadorCreate, db: Session = Depends(get_db)):
    db_item = Jogador(**data.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/api/jogadores/{id}", response_model=JogadorOut, tags=["Jogadores"])
def update_jogador(id: int, data: JogadorCreate, db: Session = Depends(get_db)):
    db_item = db.query(Jogador).filter(Jogador.id == id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Jogador não encontrado")
    for key, value in data.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/api/jogadores/{id}", tags=["Jogadores"])
def delete_jogador(id: int, db: Session = Depends(get_db)):
    db_item = db.query(Jogador).filter(Jogador.id == id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Jogador não encontrado")
    db.delete(db_item)
    db.commit()
    return {"message": "Jogador excluído"}

# ─── Stats ───────────────────────────────────────────────────────────
@app.get("/api/stats", response_model=StatsOut, tags=["Dashboard"])
def get_stats(db: Session = Depends(get_db)):
    total_times = db.execute(text("""
        SELECT COUNT(DISTINCT Time) as total FROM (
            SELECT Time FROM colocacoes UNION SELECT Time FROM jogadores
        )
    """)).scalar() or 0

    total_jogadores = db.query(Jogador).count()
    total_partidas = db.execute(text("SELECT COUNT(DISTINCT Mes || '-' || Dia) FROM colocacoes")).scalar() or 0
    total_kills = db.execute(text("SELECT SUM(Q1_Kills + Q2_Kills + Q3_Kills) FROM jogadores")).scalar() or 0

    return StatsOut(
        total_times=total_times,
        total_jogadores=total_jogadores,
        total_partidas=total_partidas,
        total_kills=total_kills
    )

# ─── Dashboard ───────────────────────────────────────────────────────
@app.get("/api/dashboard", response_model=DashboardOut, tags=["Dashboard"])
def get_dashboard(db: Session = Depends(get_db)):
    # Kills por time (top 10)
    kills_por_time = db.execute(text("""
        SELECT Time, SUM(Q1_Kills + Q2_Kills + Q3_Kills) as total 
        FROM jogadores GROUP BY Time ORDER BY total DESC LIMIT 10
    """)).mappings().all()

    # Top jogadores
    top_jogadores = db.execute(text("""
        SELECT Jogador, SUM(Q1_Kills + Q2_Kills + Q3_Kills) as total 
        FROM jogadores GROUP BY Jogador ORDER BY total DESC LIMIT 10
    """)).mappings().all()

    # Distribuição Q1
    distribuicao_q1 = db.execute(text("""
        SELECT Q1_Pos as posicao, COUNT(*) as quantidade 
        FROM colocacoes GROUP BY Q1_Pos
    """)).mappings().all()

    # Kills por quartil
    kills_quartis = db.execute(text("""
        SELECT 
            SUM(Q1_Kills) as q1_total,
            SUM(Q2_Kills) as q2_total,
            SUM(Q3_Kills) as q3_total
        FROM jogadores
    """)).mappings().first()

    return DashboardOut(
        kills_por_time=[dict(row) for row in kills_por_time],
        top_jogadores=[dict(row) for row in top_jogadores],
        distribuicao_q1=[dict(row) for row in distribuicao_q1],
        kills_quartis=dict(kills_quartis) if kills_quartis else {"q1_total": 0, "q2_total": 0, "q3_total": 0}
    )

# ─── Export ──────────────────────────────────────────────────────────
@app.get("/api/export/sql", tags=["Export"])
def export_sql():
    import sqlite3
    conn = sqlite3.connect(DB_PATH)
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
    return "\n".join(sql)

@app.get("/api/export/csv", tags=["Export"])
def export_csv():
    import sqlite3
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    csv = ["Tipo;Mes;Dia;Time;Jogador;Q1;Q2;Q3"]

    cursor.execute("SELECT * FROM colocacoes")
    for row in cursor.fetchall():
        csv.append(f"Colocacao;{row['Mes']};{row['Dia']};{row['Time']};;{row['Q1_Pos']};{row['Q2_Pos']};{row['Q3_Pos']}")

    cursor.execute("SELECT * FROM jogadores")
    for row in cursor.fetchall():
        csv.append(f"Jogador;{row['Mes']};{row['Dia']};{row['Time']};{row['Jogador']};{row['Q1_Kills']};{row['Q2_Kills']};{row['Q3_Kills']}")

    conn.close()
    return "\n".join(csv)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
