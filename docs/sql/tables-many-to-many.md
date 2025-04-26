# TABLES Many To Many

```js
CREATE TABLE Eleve (
    id_eleve SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL
);

CREATE TABLE Cours (
    id_cours SERIAL PRIMARY KEY,
    nom_cours VARCHAR(100) NOT NULL
);

CREATE TABLE Eleve_Cours (
    id_eleve INT NOT NULL,
    id_cours INT NOT NULL,
    date_inscription DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id_eleve, id_cours),
    FOREIGN KEY (id_eleve) REFERENCES Eleve(id_eleve) ON DELETE CASCADE,
    FOREIGN KEY (id_cours) REFERENCES Cours(id_cours) ON DELETE CASCADE
);
```
