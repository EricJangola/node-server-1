CREATE SEQUENCE musicas_id_seq; 
CREATE TABLE musicas ( 
    id int4 NOT NULL DEFAULT nextval('musicas_id_seq'), 
    nome varchar(200) NOT NULL,
    autor varchar(200) NOT NULL, 
    CONSTRAINT musicas_pk PRIMARY KEY (id) 
); 
CREATE UNIQUE INDEX musicas_id_idx ON public.musicas USING btree (id); 

INSERT INTO musicas (nome, autor) 
    VALUES('Fade to black', 'Metallica' ); 

INSERT INTO musicas (nome, autor) 
    VALUES('Iron Maiden', 'Iron Maiden'); 