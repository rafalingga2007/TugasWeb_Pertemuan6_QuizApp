IchibanKawaii — Editable Quiz Project
=====================================

Project files:
- index.html      Main page structure
- style.css       All visual styling
- windows.js      EDIT THIS FILE to change the two floating cards
- questions.js    EDIT THIS FILE to add/change Vocaloid quiz questions
- app.js          Quiz behavior, music player, score and LocalStorage
- bg1.mp4          Background video (put it beside index.html)
- mg1.mp3          Background music (put it beside index.html)

Question bank:
- 50 questions from the supplied markdown are included.
- Easy = questions 1–10 (Starter)
- Medium = questions 11–20 (Iconic Songs)
- Hard = questions 21–50 (Character/Lore/Fandom, Meme/Brainrot, Final Boss)
- Randomize picks one difficulty at random.
- Each question has question, options, correct (zero-based answer index), difficulty, topic, explanation.

To edit the floating cards:
Open windows.js. The Vocaloid and Coming Soon cards are defined there as separate HTML template sections.
Keep IDs such as difficulty, startQuiz, and quizMessage if you want existing JavaScript to continue working.

To edit/add questions:
Open questions.js and edit window.VOCALOID_QUESTIONS. correct: 0 means A, 1 means B, 2 means C, 3 means D.

Media:
Put bg1.mp4 and mg1.mp3 in the same root folder as index.html. No asset folder is needed.
If their extensions differ, update the src paths in index.html.

Run:
Open index.html in a browser. If your browser restricts local media/scripts, use VS Code Live Server.
