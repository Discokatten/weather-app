# Väderapp i NextJS

En väderapp skapad i **NextJS** och med **Typescript**. Målet är att hämta väderdata från ett externt api, sedan ge förslag på vilka ytterkläder som är lämpliga för dagen.
Detta projekt är skapat i utbildningssyfte för att fördjupa mig i NextJS, TypeScript, Python, Machine Learning och DevSec.

## Innehållsförteckning

- 📖 [Om projektet](#om-projektet)
- ✨ [Funktioner](#funktioner)
- 💡 [Kommande funktioner](#kommande-funktioner)
- 🛠️ [Teknologier](#teknologier)
- ⚙️ [Installation](#installation)
- ⚙️ [API-testning](#api-testning)

---

## 📖 Om projektet

Detta är ett projekt där målet var att bygga upp en minimalistisk väderapp för att få förslag på vilka ytterkläder som passar bäst under dagen.
Sidan hämtar väderdata från ett externt api.
Med hjälp av väderdatan och ett poängsystem för att kategorisera kläderna så ska sidan föreslå vilka kläder som är lämpliga för dagen, baserat på temperatur och förväntad nederbörd.

Syftet är att träna på att

- Hämta data från api
- Sätta upp hämta data från lokal json-fil
- Bryta ner krav och sprintplanera

Projektet är tänkt att byggas ut med mer funktionalitet.

---

## ✨ Funktioner

- [x] Dashboard med paralella routes
- [x] En **väder-widget** med animation som visar **vädret** i Stockholm **just nu**
- [x] En mer detaljerad överblick över vädret, som vind och luftfuktighet
- [x] Överblick över hur resterande dagen ser ut, med 3h intervall
- [x] Vädret för **kommande vecka**
- [x] **Förslag på kläder** från en lokal json-fil baserat på väderdatan
- [x] Poängsystem för att kategorisera kläder efter värme
- [x] Logik för att avgöra vad som räknas som nederbörd
- [x] Detaljerad information kring nederbörd samt en animation för övergripande väder under dagen.

### 💡 Kommande funktioner:

- [] Möjlighet att ändra location
- [x] Lägga till egna kläder
- [x] Lägga till storlek på kläderna
- [x] Detaljsida för att editera klädesplagg eller se mer information

---

## 🛠️ Teknologier

- [Next.js 15 App Router](https://nextjs.org/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/stable/)
- [Scikit](https://scikit-learn.org/)
- [SQLite3](https://sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Wave](https://wave.webaim.org/)
- [OpenMeteo](https://open-meteo.com/)
- [Meteocons](https://bas.dev/work/meteocons)
- [Lucide](https://lucide.dev/)

---

## ⚙️ Installation

```bash

# Klona repo
git clone <https://github.com/Discokatten/weather-app>

# Gå in i projektmappen
cd <weather-app>

# Installera beroenden
npm -i

# Skapa och aktivera venv
**Mac/Linux:**
python -m venv venv
source venv/bin/activate

**Windows:**
python -m venv venv
venv\Scripts\activate

# Installera beroenden
pip install -r requirements.txt

# Skapa och seeda databasen
npm run seed

# Starta utvecklingsserver
npm run dev
npm run server

```

## API-testning

Importera `tests/weather.postman_collection.json` i Postman för att testa endpoints.

## 👩‍💻 Anvädning

Enkel dashboard där vänstra sidan visar väderinformation och högra sidan visar information om föreslagna kläder.
Meny för att se alla kläder samt lägga till nya
