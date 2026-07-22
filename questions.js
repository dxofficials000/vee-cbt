const questionBank = [
  // --- MATHEMATICS ---
  {
    id: 1,
    subject: "JAMB Mathematics",
    question: "If 3x - 5 = 10, find the value of 2x + 1.",
    options: ["A) 5", "B) 9", "C) 11", "D) 15"],
    answerIndex: 2, // C is correct (x = 5, so 2(5)+1 = 11)
    m1: "<b>⚡ Speed Elimination Trick:</b> First solve for x: 3x = 15 ➔ x = 5. Now plug 5 into (2x + 1) to get 11!",
    m2: "<b>Plain-English Logic:</b> Three times a mystery number minus 5 gives 10. Add 5 back to get 15. If 3 times the number is 15, the number is 5. Now double 5 (which is 10) and add 1 to get 11.",
    m3: "<b>Standard Steps:</b><br>3x - 5 = 10<br>3x = 15 ➔ x = 5<br>Substitute x = 5 into 2x + 1:<br>2(5) + 1 = 10 + 1 = <b>11</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) 5:</b> This is just the value of x, not (2x + 1).<br>• <b>B) 9:</b> Calculation error from subtracting 1 instead of adding.<br>• <b>D) 15:</b> This is the value of 3x, not (2x + 1)."
  },
  
  // --- PHYSICS ---
  {
    id: 2,
    subject: "JAMB Physics",
    question: "Calculate the work done when a force of 20 N moves an object through a distance of 5 m in the direction of the force.",
    options: ["A) 4 J", "B) 25 J", "C) 100 J", "D) 400 J"],
    answerIndex: 2, // C is correct (20 * 5 = 100 J)
    m1: "<b>⚡ Speed Elimination Trick:</b> Work = Force × Distance. Simply multiply the two given numbers directly: 20 × 5 = 100 J!",
    m2: "<b>Plain-English Logic:</b> Work is done when you push something across a distance. Multiply how hard you push (20 N) by how far it moved (5 meters) to get total work done (100 Joules).",
    m3: "<b>Standard Steps:</b><br>Work Done (W) = Force (F) × Distance (d)<br>W = 20 N × 5 m = <b>100 Joules (J)</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) 4 J:</b> Result of dividing force by distance (20 ÷ 5).<br>• <b>B) 25 J:</b> Result of adding force and distance (20 + 5).<br>• <b>D) 400 J:</b> Result of multiplying force by distance squared."
  },

  // --- CHEMISTRY ---
  {
    id: 3,
    subject: "JAMB Chemistry",
    question: "Which of the following elements has the highest electronegativity?",
    options: ["A) Sodium", "B) Chlorine", "C) Fluorine", "D) Oxygen"],
    answerIndex: 2, // C is correct
    m1: "<b>⚡ Speed Elimination Trick:</b> Fluorine is located at the top right of the periodic table (excluding noble gases). It is universally the most electronegative element!",
    m2: "<b>Plain-English Logic:</b> Electronegativity is an atom's hunger for pulling electrons toward itself. Fluorine is the ultimate electron-stealer in chemistry.",
    m3: "<b>Periodic Trend:</b> Electronegativity increases across a period (left to right) and decreases down a group (top to bottom). Fluorine sitting at Group 7, Period 2 holds the maximum value of 4.0 on the Pauling scale.",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) Sodium:</b> Metals have very low electronegativity (they prefer to give away electrons).<br>• <b>B) Chlorine:</b> High, but lower than Fluorine because it is farther down Group 7.<br>• <b>D) Oxygen:</b> Second highest electronegative element, but Fluorine beats it."
  },   // --- BATCH 2: EXPANDED MULTI-EXAM BANK ---

  // --- MATHEMATICS ---
  {
    id: 8,
    subject: "JAMB Mathematics",
    question: "Evaluate sin 30° + cos 60°.",
    options: ["A) 0", "B) 1/2", "C) 1", "D) √3"],
    answerIndex: 2,
    m1: "<b>⚡ Speed Elimination Trick:</b> Sin 30° is 1/2 and Cos 60° is 1/2. Adding half plus half equals 1 instantly!",
    m2: "<b>Plain-English Logic:</b> Complementary angles (angles adding to 90°) share values: sin(30°) = cos(60°) = 0.5. 0.5 + 0.5 = 1.",
    m3: "<b>Standard Steps:</b><br>sin 30° = 1/2<br>cos 60° = 1/2<br>1/2 + 1/2 = <b>1</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) 0:</b> Result if you subtracted cos 60° from sin 30°.<br>• <b>B) 1/2:</b> Value of a single trig function, not their sum.<br>• <b>D) √3:</b> Result of sin 60° + cos 30°."
  },
  {
    id: 9,
    subject: "WAEC Mathematics",
    question: "Simplify the surd: √72.",
    options: ["A) 6√2", "B) 2√6", "C) 36√2", "D) 4√3"],
    answerIndex: 0,
    m1: "<b>⚡ Speed Elimination Trick:</b> Split 72 into a perfect square × another number. 72 = 36 × 2. Square root of 36 is 6, so answer is 6√2!",
    m2: "<b>Plain-English Logic:</b> Find the largest square number that divides 72 evenly. That's 36. Take 36 out of the square root as 6, leaving 2 inside.",
    m3: "<b>Standard Steps:</b><br>√72 = √(36 × 2)<br>= √36 × √2<br>= <b>6√2</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>B) 2√6:</b> Equals √24, not √72.<br>• <b>C) 36√2:</b> Forgot to take the square root of 36.<br>• <b>D) 4√3:</b> Equals √48, not √72."
  },

  // --- PHYSICS ---
  {
    id: 10,
    subject: "JAMB Physics",
    question: "An object is dropped from a height of 20 m. Calculate the time taken to reach the ground. (g = 10 m/s²)",
    options: ["A) 1 s", "B) 2 s", "C) 4 s", "D) 10 s"],
    answerIndex: 1,
    m1: "<b>⚡ Speed Elimination Trick:</b> Use h = ½gt². h = 5t² (when g=10). 20 = 5t² ➔ t² = 4 ➔ t = 2 seconds!",
    m2: "<b>Plain-English Logic:</b> Gravity pulls down faster every second. In 1 second it drops 5 m, in 2 seconds it drops a total of 20 m.",
    m3: "<b>Standard Steps:</b><br>s = ut + ½gt² (u = 0)<br>20 = 0 + ½(10)t²<br>20 = 5t²<br>t² = 4 ➔ <b>t = 2 s</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) 1 s:</b> Object only falls 5 m in 1 s.<br>• <b>C) 4 s:</b> Forgot to take the square root of t².<br>• <b>D) 10 s:</b> Divided height by gravity without using kinetic equations."
  },
  {
    id: 11,
    subject: "NECO Physics",
    question: "Which of the following electromagnetic waves has the highest frequency?",
    options: ["A) Radio waves", "B) Infrared rays", "C) Gamma rays", "D) Ultraviolet rays"],
    answerIndex: 2,
    m1: "<b>⚡ Speed Elimination Trick:</b> Gamma rays sit at the extreme end of the EM spectrum—highest frequency, highest energy, shortest wavelength!",
    m2: "<b>Plain-English Logic:</b> Frequency means energy. Gamma rays are dangerous high-energy radiation, far surpassing radio or UV rays.",
    m3: "<b>EM Spectrum Order (Increasing Frequency):</b><br>Radio ➔ Microwave ➔ Infrared ➔ Visible ➔ UV ➔ X-Ray ➔ <b>Gamma Rays</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) Radio waves:</b> Lowest frequency, longest wavelength.<br>• <b>B) Infrared rays:</b> Lower frequency than visible light.<br>• <b>D) Ultraviolet rays:</b> High frequency, but Gamma rays are much higher."
  },

  // --- CHEMISTRY ---
  {
    id: 12,
    subject: "JAMB Chemistry",
    question: "What is the pH of a neutral solution at 25 °C?",
    options: ["A) 0", "B) 1", "C) 7", "D) 14"],
    answerIndex: 2,
    m1: "<b>⚡ Speed Elimination Trick:</b> On a 0 to 14 scale, 7 is dead center = neutral (like pure water)!",
    m2: "<b>Plain-English Logic:</b> pH values below 7 are acidic, values above 7 are basic/alkaline. Right in the middle at 7 is completely neutral.",
    m3: "<b>Standard Concept:</b><br>Pure water dissociates: [H⁺] = [OH⁻] = 10⁻⁷ M.<br>pH = -log[H⁺] = -log(10⁻⁷) = <b>7</b>",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) 0:</b> Extremely strong acid.<br>• <b>B) 1:</b> Strong acid (e.g., stomach acid).<br>• <b>D) 14:</b> Extremely strong base (e.g., concentrated NaOH)."
  },
  {
    id: 13,
    subject: "IGCSE Chemistry",
    question: "Which particle in an atom has no electrical charge?",
    options: ["A) Proton", "B) Neutron", "C) Electron", "D) Ion"],
    answerIndex: 1,
    m1: "<b>⚡ Speed Elimination Trick:</b> Remember the word association: <b>NEU</b>tron = <b>NEU</b>tral (Zero charge)!",
    m2: "<b>Plain-English Logic:</b> Protons are positive (+), Electrons are negative (-), and Neutrons carry no electric charge at all.",
    m3: "<b>Subatomic Particles Summary:</b><br>• Proton: Charge +1, Mass 1<br>• Neutron: Charge 0, Mass 1<br>• Electron: Charge -1, Mass ~0",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) Proton:</b> Positively charged particle (+1).<br>• <b>C) Electron:</b> Negatively charged particle (-1).<br>• <b>D) Ion:</b> An atom or molecule with a net electric charge."
  },

  // --- ENGLISH LANGUAGE ---
  {
    id: 14,
    subject: "JAMB English",
    question: "Select the option nearest in meaning to the underlined word: The manager's decisions were <u>ephemeral</u>.",
    options: ["A) Permanent", "B) Short-lived", "C) Cruel", "D) Wise"],
    answerIndex: 1,
    m1: "<b>⚡ Speed Elimination Trick:</b> 'Ephemeral' comes from Greek roots meaning lasting for a single day = short-lived!",
    m2: "<b>Plain-English Logic:</b> Something ephemeral passes away quickly, like a fleeting moment or a temporary rule.",
    m3: "<b>Vocabulary Context:</b> Ephemeral means lasting for a very short time. Synonym = short-lived, transient, fleeting.",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) Permanent:</b> Direct opposite (Antonym) of ephemeral.<br>• <b>C) Cruel:</b> Unrelated to duration or time.<br>• <b>D) Wise:</b> Unrelated to how long something lasts."
  },

  // --- BIOLOGY ---
  {
    id: 15,
    subject: "WAEC Biology",
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["A) Nucleus", "B) Ribosome", "C) Mitochondrion", "D) Chloroplast"],
    answerIndex: 2,
    m1: "<b>⚡ Speed Elimination Trick:</b> Powerhouse = ATP energy production = Mitochondria!",
    m2: "<b>Plain-English Logic:</b> The mitochondrion breaks down food molecules to produce cellular energy (ATP) needed for all life functions.",
    m3: "<b>Organelle Functions:</b><br>Mitochondrion is the site of aerobic respiration where glucose is converted into ATP energy.",
    wrongBreakdown: "<b>❌ Why Other Options Are Wrong:</b><br>• <b>A) Nucleus:</b> Controls cell activities and holds DNA.<br>• <b>B) Ribosome:</b> Site of protein synthesis.<br>• <b>D) Chloroplast:</b> Site of photosynthesis in plant cells."
  }
];
