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
  }
];
