# Väderapp i NextJS

En väderapp skapad i **NextJS** och med **Typescript**. Målet är att hämta väderdata från ett externt api, sedan ge förslag på vilka ytterkläder som är lämpliga för dagen.
Detta projekt är skapat i utbildningssyfte för att fördjupa mig i NextJS och TypeScript.

## Innehållsförteckning

- 📖 [Om projektet](#om-projektet)
- ✨ [Funktioner](#funktioner)
- 💡 [Kommande funktioner](#kommande-funktioner)
- 🛠️ [Teknologier](#teknologier)
- ⚙️ [Installation](#installation)
- 👩‍💻 [Användning](#användning)
- 🗂️ [Projektstruktur](#projektstruktur)
- 🙋‍♀️ [Bidra](#bidra)
- 🧾 [Licens](#licens)

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
- [] Lägga till egna kläder
- [] Lägga till storlek på kläderna
- [] Detaljsida för att editera klädesplagg eller se mer information

---

## 🛠️ Teknologier

- [Next.js 15 App Router](https://nextjs.org/)
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
git clone <https://github.com/Discokatten/weather>

# Gå in i projektmappen
cd <weather>

# Installera beroenden
npm -i

# Starta utvecklingsserver
npm run dev

```

## 👩‍💻 Anvädning

Enkel dashboard där vänstra sidan visar väderinformation och högra sidan visar information om föreslagna kläder.

## 🗂️ Projektstruktur

```
|-- app/
    |-- @clothes/
        |-- page.tsx          # Dashboard kläder
        |-- _components/      # Återanvändbara komponenter, kläder
    |-- @weather/
        |-- page.tsx          # Dashboard väder
        |-- _components/      # Återanvändbara komponenter, väder
    |-- components/           # Återanvändbara komponenter, hela sidan
    |-- data/                 # Datahantering, fetch och json
    |-- lib/                  # Utility och Interfaces

```

## 🙋‍♀️ Bidra

Vill du bidra?

1. Forka projektet
2. Skapa en feature branch(`git switch -c <feature-name>`)
3. Commit and push
4. Send a pull-request

---

## 🧾 Licens

Detta projekt är utvecklat i utbildningssyfte och är inte avsett för produktion
