-- Banco de Dados eSports - Colocações e Jogadores
-- Gerado em 2026-05-25

CREATE TABLE IF NOT EXISTS colocacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Mes TEXT,
    Dia INTEGER,
    Time TEXT,
    Q1_Pos INTEGER,
    Q2_Pos INTEGER,
    Q3_Pos INTEGER
);

CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Mes TEXT,
    Dia INTEGER,
    Time TEXT,
    Jogador TEXT,
    Q1_Kills INTEGER,
    Q2_Kills INTEGER,
    Q3_Kills INTEGER
);

-- Dados: Colocações
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'UGD Threat', 1, 4, 1);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'RED', 2, 7, 4);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'RED Magic BR', 3, 1, 7);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'LMF', 4, 6, 5);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'KOV', 5, 5, 3);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'CMF', 7, 3, 2);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 19, 'Eternity', 6, 2, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 21, 'UGD Threat', 1, 3, 4);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 21, 'Time I', 2, 6, 3);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 21, 'CMF', 3, 4, 1);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 21, 'RED', 4, 2, 2);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 21, 'KOV', 5, 1, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 21, 'Time E', 6, 5, 5);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'UGD Threat', 1, 1, 1);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'CMF', 2, 4, 5);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'INF', 3, 6, 4);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'LMF', 4, 2, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'Misturado', 5, 6, 3);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'Eternity', 6, 3, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Maio', 7, 'RED', 6, 5, 2);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'UGD Threat', 1, 1, 3);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'FURY', 2, 6, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'RED', 3, 6, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'UGD Royal', 4, 5, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'Λつつ', 5, 2, 2);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'ODS', 6, 6, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'INF', 6, 4, 6);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'CMF', 6, 3, 4);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'Eternity', 6, 6, 1);
INSERT INTO colocacoes (Mes, Dia, Time, Q1_Pos, Q2_Pos, Q3_Pos) VALUES ('Abril', 30, 'LMF', 6, 6, 5);

-- Dados: Jogadores
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'UGD Threat', 'UGD Treon', 11, 12, 13);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'UGD Threat', 'UGD cool7', 8, 10, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'UGD Threat', 'UGD Kaze', 13, 1, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'UGD Threat', 'UGD ARISE', 8, 8, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED', 'RED snow777', 3, 0, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED', 'RED APENAS', 7, 0, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED', 'CF ALMEIDA', 0, 0, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED', 'LMF Boss', 5, 0, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED Magic BR', 'RED LANGO', 4, 7, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED Magic BR', 'RED KENNZY', 6, 6, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED Magic BR', 'MOL ADRIAN', 2, 1, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'RED Magic BR', 'LXELTINHO', 1, 5, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'LMF', 'LMF LACERDA', 2, 0, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'LMF', 'LMF CALOP12', 1, 0, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'LMF', 'LMF mtfacil', 1, 0, 5);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'LMF', 'LMF XIT', 1, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'KOV', 'KOV FushyX', 5, 2, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'KOV', 'KOV ADAN', 7, 5, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'KOV', 'TTKKAIKE', 5, 2, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'KOV', 'KOV ALONE', 0, 1, 5);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'CMF', 'CMF Syx', 0, 7, 7);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'CMF', 'CMF Lyx7', 0, 7, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'CMF', 'CMF MOIZO', 0, 4, 5);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'CMF', 'CMF Stygian', 0, 3, 7);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'Eternity', 'RED REZE', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'Eternity', 'Muggle', 0, 6, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 19, 'Eternity', 'Shxrk', 0, 4, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'UGD Threat', 'UGD Kaze', 5, 4, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'UGD Threat', 'UGD cool7', 7, 7, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'UGD Threat', 'UGD Treon', 14, 4, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'UGD Threat', 'UGD ARISE', 9, 9, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time I', 'hcky', 4, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time I', 'ASTRO', 8, 0, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time I', 'GzmAkaza', 2, 0, 9);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time I', 'AimColor', 2, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time I', 'iDiaasz', 0, 0, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time I', 'Jtpe', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'CMF', 'CMF Leo', 8, 7, 11);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'CMF', 'CMF Stygian', 5, 6, 5);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'CMF', 'CMF Syx', 14, 10, 9);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'CMF', 'CMF MOIZO', 2, 3, 7);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'RED', 'RED APENAS', 7, 8, 7);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'RED', 'RED- REZE', 1, 5, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'RED', 'RED-MOREIRA', 0, 2, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'RED', 'RED-Alemão', 2, 3, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'KOV', 'KOV FushyX', 1, 5, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'KOV', 'KOV ADAN', 0, 7, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'KOV', 'YoSurper', 7, 3, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'KOV', 'AET Jentexz', 1, 11, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time E', 'PAIN SWAN', 0, 0, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time E', 'Poindexter', 0, 0, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time E', 'ONE-Javi', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 21, 'Time E', 'morqesb', 0, 0, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'UGD Threat', 'UGD Ares', 9, 16, 14);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'UGD Threat', 'UGD Kaze', 11, 15, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'UGD Threat', 'UGD ARISE', 5, 10, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'UGD Threat', 'UGD Treon', 9, 12, 12);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'CMF', 'CMF Stygian', 7, 2, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'CMF', 'CMF Lyx7', 12, 4, 7);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'CMF', 'CMF Leo', 9, 6, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'CMF', 'CMF Syx', 7, 4, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'INF', 'INF Noxz7', 6, 0, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'INF', 'INF GOAT', 5, 0, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'INF', 'INF BARONI', 5, 0, 5);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'INF', 'INF RINNEGA', 4, 0, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'LMF', 'LMF_LACERDA', 4, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'LMF', 'LMF_RICHIMO', 3, 1, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'LMF', 'LMF_mtfacil', 9, 2, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'LMF', 'LMF_XIT', 4, 3, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'LMF', 'LMF_Boss', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Misturado', 'REVERSE_', 0, 0, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Misturado', 'INF RONY', 3, 0, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Misturado', 'INF BADBOY', 2, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Misturado', 'TOP FreeKill', 0, 0, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Eternity', 'Nofear', 0, 2, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Eternity', 'Damøn.TTK', 0, 5, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Eternity', 'Muggle', 0, 4, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'Eternity', 'Kennedy', 0, 6, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'RED', 'RED APENAS', 0, 5, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'RED', 'ASTRO', 0, 6, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'RED', 'REÐ snow777', 0, 2, 5);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Maio', 7, 'RED', 'REÐ Sunraku', 0, 3, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Threat', 'UGD Ares', 7, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Threat', 'UGD Kaze', 6, 2, 6);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Threat', 'UGD Treon', 5, 12, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Threat', 'UGD ARISE', 6, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Threat', 'UGD Neo', 0, 5, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Threat', 'Rivers AR', 0, 5, 9);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'FURY', 'VN'' FURY', 4, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'FURY', 'Creedz FURY', 4, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'FURY', 'perfection z', 3, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'FURY', 'Diana FURY', 5, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'RED', 'REÐ LANGØ', 9, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'RED', 'REÐ Zadock', 2, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'RED', 'REÐ M4RTINA', 8, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'RED', 'REÐ APENAS', 3, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Royal', 'UGD Z', 9, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Royal', 'Dexz', 3, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Royal', 'UGD Weenot', 8, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Royal', 'OFFz', 0, 16, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Royal', 'MayaZ', 0, 8, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Royal', 'WenoTz', 0, 5, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Light', 'DEATH', 3, 3, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Light', 'UGD Psycho', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Light', 'I miss her', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'UGD Light', 'UGD Kyz', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'Λつつ_$CAVEIRA', 3, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'Λつつ Aninha', 4, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'ØNE ???', 1, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'Λつつ Unknown', 1, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'Striker71', 0, 2, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', '『PsS-KINN-ボ', 0, 2, 1);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'Striker81', 0, 3, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Λつつ', 'ΛΞT Jentexz', 0, 8, 9);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'ODS', '[ODS].STROG', 3, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'ODS', '[ODS] vantex', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'ODS', 'Az Aamon', 0, 0, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'INF', '「INF」Noxz7''', 0, 3, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'INF', '「INF」RINNEGA', 0, 4, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'INF', '「INF」BLAZE', 0, 2, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'INF', '「INF」GOAT', 0, 6, 0);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'CMF', 'CMF Lyx7', 0, 3, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'CMF', 'CMF Leo', 0, 2, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'CMF', 'CMF Stygian', 0, 3, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'CMF', 'CMF Syx', 0, 5, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Eternity', 'Muggle 永', 0, 0, 3);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Eternity', 'DamønTTK 永', 0, 0, 8);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Eternity', 'Black 永', 0, 0, 7);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'Eternity', 'Givas''xX 永', 0, 0, 4);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'LMF', 'LMF_mtfacil', 0, 0, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'LMF', 'LMF_XIT', 0, 0, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'LMF', 'LMF_Boss', 0, 0, 2);
INSERT INTO jogadores (Mes, Dia, Time, Jogador, Q1_Kills, Q2_Kills, Q3_Kills) VALUES ('Abril', 30, 'LMF', 'LMF_RICHIMO', 0, 0, 4);