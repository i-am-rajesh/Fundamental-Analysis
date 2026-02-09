/* =========================
   SECTOR
========================= */

let selectedSector = null;

// Called on dropdown change
function onSectorChange(selectEl) {
  selectedSector = selectEl.value;   // "1", "2", ...
  console.log("Selected Sector:", selectedSector);

  // Optional: reset previous scores/colors
  resetAllMetrics();
}

function resetAllMetrics() {
  document.querySelectorAll(".metric-card").forEach(card => {
    card.classList.remove("green", "yellow", "red");
  });
}


/* =========================
   CORE HELPERS
========================= */

function setCard(id, color) {
  const c = document.getElementById(id);
  c.classList.remove("green", "yellow", "red");
  c.classList.add(color);
  updateScore();
}

function clearCard(id) {
  const c = document.getElementById(id);
  c.classList.remove("green", "yellow", "red");
  updateScore();
}

/* =========================
   1. MARKET CAP
========================= */
function checkMCAP(el) {
  const v = el.value;
  if (v === "") { clearCard("mcap"); return; }

  if (v > 5000) setCard("mcap", "green");
  else if (v >= 1000) setCard("mcap", "yellow");
  else setCard("mcap", "red");
}

/* =========================
   2–3. PE vs INDUSTRY PE
========================= */
function checkPE() {

  const peVal = document.querySelector("#pe input").value;
  const indpe = document.querySelector("#indpe input").value;

  if (!selectedSector || peVal === "") {
    clearCard("pe");
    return;
  }

  const pe = Number(peVal);
  const indv = Number(indpe);

  // 🧠 1️⃣ IT / Software
  if (selectedSector == 1) {
    if (pe < 25) setCard("pe", "green");
    else if (pe <= 35) setCard("pe", "yellow");
    else setCard("pe", "red");
  }

  // 🏗️ 3️⃣ Infra / EPC
  else if (selectedSector == 3) {
    if (pe < 20) setCard("pe", "green");
    else if (pe <= 25) setCard("pe", "yellow");
    else setCard("pe", "red");
  }

  // 🏭 4️⃣ Manufacturing
  else if (selectedSector == 4) {
    if (pe < 25) setCard("pe", "green");
    else if (pe <= 35) setCard("pe", "yellow");
    else setCard("pe", "red");
  }

  // 🛒 6️⃣ FMCG (Premium acceptable → neutral)
  else if (selectedSector == 6) {
    setCard("pe", "yellow");
  }

  // 🏦 2️⃣ Banks, 🧪 5️⃣ Pharma, ⚡ 7️⃣ Metals
  else if (selectedSector == 2 || selectedSector == 5 || selectedSector == 7) {
    // DEFAULT PE RULE
    if (pe < 20) setCard("pe", "green");
    else if (pe <= 30) setCard("pe", "yellow");
    else setCard("pe", "red");
  }

  // 🔹 Safety fallback
  else {
    clearCard("pe");
  }
  

  if (pe <= indv) setCard("pe", "green");
  else if (pe  <= indv * 1.3) setCard("pe", "yellow");
  else setCard("pe", "red");
}

/* =========================
   4. PEG RATIO
========================= */
function checkPEG(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("peg");
    return;
  }

  const peg = Number(v);

  // 🧠 1️⃣ IT / Software (sector-specific PEG)
  if (selectedSector == 1) {
    if (peg < 1.2) setCard("peg", "green");
    else if (peg <= 1.8) setCard("peg", "yellow");
    else setCard("peg", "red");
  }

  // 🔹 DEFAULT PEG (all other sectors)
  else {
    if (peg < 1.0) setCard("peg", "green");
    else if (peg <= 1.5) setCard("peg", "yellow");
    else setCard("peg", "red");
  }
}


/* =========================
   5. ROCE
========================= */
function checkROCE(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("roce");
    return;
  }

  const roce = Number(v);

  // 🧠 1️⃣ IT / Software
  if (selectedSector == 1) {
    if (roce > 30) setCard("roce", "green");
    else if (roce >= 20) setCard("roce", "yellow");
    else setCard("roce", "red");
  }

  // 🏗️ 3️⃣ Infra / EPC
  else if (selectedSector == 3) {
    if (roce > 20) setCard("roce", "green");
    else if (roce >= 15) setCard("roce", "yellow");
    else setCard("roce", "red");
  }

  // 🏭 4️⃣ Manufacturing
  else if (selectedSector == 4) {
    if (roce > 22) setCard("roce", "green");
    else if (roce >= 18) setCard("roce", "yellow");
    else setCard("roce", "red");
  }

  // 🧪 5️⃣ Pharma & Healthcare
  else if (selectedSector == 5) {
    if (roce > 25) setCard("roce", "green");
    else if (roce >= 18) setCard("roce", "yellow");
    else setCard("roce", "red");
  }

  // 🛒 6️⃣ FMCG / Consumer Staples
  else if (selectedSector == 6) {
    if (roce > 40) setCard("roce", "green");
    else if (roce >= 30) setCard("roce", "yellow");
    else setCard("roce", "red");
  }

  // ⚡ 7️⃣ Metals & Commodities
  else if (selectedSector == 7) {
    if (roce > 25) setCard("roce", "green");
    else if (roce >= 15) setCard("roce", "yellow");
    else setCard("roce", "red");
  }

  // 🔹 DEFAULT ROCE RULE (fallback)
  else {
    if (roce > 20) setCard("roce", "green");
    else if (roce >= 15) setCard("roce", "yellow");
    else setCard("roce", "red");
  }
}


/* =========================
   6. ROE
========================= */
function checkROE(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("roe");
    return;
  }

  const roe = Number(v);

  // 🧠 1️⃣ IT / Software
  if (selectedSector == 1) {
    if (roe > 25) setCard("roe", "green");
    else if (roe >= 18) setCard("roe", "yellow");
    else setCard("roe", "red");
  }

  // 🏦 2️⃣ Banking & NBFC
  else if (selectedSector == 2) {
    if (roe > 15) setCard("roe", "green");
    else if (roe >= 12) setCard("roe", "yellow");
    else setCard("roe", "red");
  }

  // 🏗️ 3️⃣ Infra / EPC
  else if (selectedSector == 3) {
    if (roe > 18) setCard("roe", "green");
    else if (roe >= 14) setCard("roe", "yellow");
    else setCard("roe", "red");
  }

  // 🏭 4️⃣ Manufacturing
  else if (selectedSector == 4) {
    if (roe > 20) setCard("roe", "green");
    else if (roe >= 15) setCard("roe", "yellow");
    else setCard("roe", "red");
  }

  // 🧪 5️⃣ Pharma & Healthcare
  else if (selectedSector == 5) {
    if (roe > 22) setCard("roe", "green");
    else if (roe >= 16) setCard("roe", "yellow");
    else setCard("roe", "red");
  }

  // 🛒 6️⃣ FMCG / Consumer Staples
  else if (selectedSector == 6) {
    if (roe > 30) setCard("roe", "green");
    else if (roe >= 20) setCard("roe", "yellow");
    else setCard("roe", "red");
  }

  // 🔹 DEFAULT ROE RULE (fallback)
  else {
    if (roe > 20) setCard("roe", "green");
    else if (roe >= 15) setCard("roe", "yellow");
    else setCard("roe", "red");
  }
}


/* =========================
   7. PROFIT GROWTH
========================= */
function checkProfitGrowth(el) {
  const v = el.value;
  if (v === "") { clearCard("profit"); return; }

  if (v > 15) setCard("profit", "green");
  else if (v >= 10) setCard("profit", "yellow");
  else setCard("profit", "red");

  checkIntrinsic(); // growth affects IV
}

/* =========================
   8. SALES GROWTH
========================= */
function checkSalesGrowth(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("sales");
    return;
  }

  const sales = Number(v);

  // 🧠 1️⃣ IT / Software
  if (selectedSector == 1) {
    if (sales > 10) setCard("sales", "green");
    else if (sales >= 6) setCard("sales", "yellow");
    else setCard("sales", "red");
  }

  // 🏗️ 3️⃣ Infra / EPC
  else if (selectedSector == 3) {
    if (sales > 12) setCard("sales", "green");
    else if (sales >= 8) setCard("sales", "yellow");
    else setCard("sales", "red");
  }

  // 🏭 4️⃣ Manufacturing, 5️⃣ Pharma & Healthcare, 6️⃣ FMCG / Consumer Staples
  else if (selectedSector == 4 || selectedSector == 5 || selectedSector == 6) {
    if (sales > 10) setCard("sales", "green");
    else if (sales >= 7) setCard("sales", "yellow");
    else setCard("sales", "red");
  }

  // 🔹 DEFAULT SALES GROWTH RULE
  else {
    if (sales > 12) setCard("sales", "green");
    else if (sales >= 8) setCard("sales", "yellow");
    else setCard("sales", "red");
  }
}


/* =========================
   9. OPERATING MARGIN
========================= */
function checkOPM(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("opm");
    return;
  }

  const opm = Number(v);

  // 🧠 1️⃣ IT / Software
  if (selectedSector == 1) {
    if (opm > 20) setCard("opm", "green");
    else if (opm >= 15) setCard("opm", "yellow");
    else setCard("opm", "red");
  }

  // 🏗️ 3️⃣ Infra / EPC
  else if (selectedSector == 3) {
    if (opm > 10) setCard("opm", "green");
    else if (opm >= 7) setCard("opm", "yellow");
    else setCard("opm", "red");
  }

  // 🏭 4️⃣ Manufacturing
  else if (selectedSector == 4) {
    if (opm > 15) setCard("opm", "green");
    else if (opm >= 10) setCard("opm", "yellow");
    else setCard("opm", "red");
  }

  // 🧪 5️⃣ Pharma
  else if (selectedSector == 5) {
    if (opm > 20) setCard("opm", "green");
    else if (opm >= 15) setCard("opm", "yellow");
    else setCard("opm", "red");
  }

  // 🛒 6️⃣ FMCG
  else if (selectedSector == 6) {
    if (opm > 18) setCard("opm", "green");
    else if (opm >= 12) setCard("opm", "yellow");
    else setCard("opm", "red");
  }

  // 🔹 DEFAULT OPERATING MARGIN RULE
  else {
    if (opm > 20) setCard("opm", "green");
    else if (opm >= 12) setCard("opm", "yellow");
    else setCard("opm", "red");
  }
}

/* =========================
   10. DEBT TREND
========================= */
function checkDebtTrend(el) {
  if (el.value === "") { clearCard("debttrend"); return; }

  if (el.value === "low") setCard("debttrend", "green");
  else if (el.value === "moderate") setCard("debttrend", "yellow");
  else if (el.value === "high") setCard("debttrend", "red");
}

/* =========================
   11. DEBT TO EQUITY
========================= */
function checkDebtEquity(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("de");
    return;
  }

  const de = Number(v);

  // 🧠 1️⃣ IT / Software
  // 🛒 6️⃣ FMCG (Zero debt preferred)
  if (selectedSector == 1 || selectedSector == 6) {
    if (de === 0) setCard("de", "green");
    else if (de < 0.3) setCard("de", "yellow");
    else setCard("de", "red");
  }

  // 🏗️ 3️⃣ Infra / EPC
  else if (selectedSector == 3) {
    if (de < 0.7) setCard("de", "green");
    else if (de <= 1.0) setCard("de", "yellow");
    else setCard("de", "red");
  }

  // 🏭 4️⃣ Manufacturing
  // ⚡ 7️⃣ Metals
  else if (selectedSector == 4 || selectedSector == 7) {
    if (de < 0.5) setCard("de", "green");
    else if (de <= 1.0) setCard("de", "yellow");
    else setCard("de", "red");
  }

  // 🧪 5️⃣ Pharma & Healthcare
  else if (selectedSector == 5) {
    if (de < 0.3) setCard("de", "green");
    else if (de <= 0.6) setCard("de", "yellow");
    else setCard("de", "red");
  }

  // 🔹 DEFAULT DEBT / EQUITY RULE
  else {
    if (de < 0.5) setCard("de", "green");
    else if (de <= 1.0) setCard("de", "yellow");
    else setCard("de", "red");
  }
}


/* =========================
   12. INTEREST COVERAGE
========================= */
function checkICR(el) {

  const v = el.value;

  if (!selectedSector || v === "") {
    clearCard("icr");
    return;
  }

  const icr = Number(v);

  // 🏗️ 3️⃣ Infra / EPC
  if (selectedSector == 3) {
    if (icr > 4) setCard("icr", "green");
    else if (icr >= 3) setCard("icr", "yellow");
    else setCard("icr", "red");
  }

  // ⚡ 7️⃣ Metals & Commodities
  else if (selectedSector == 7) {
    if (icr > 5) setCard("icr", "green");
    else if (icr >= 3) setCard("icr", "yellow");
    else setCard("icr", "red");
  }

  // 🔹 DEFAULT INTEREST COVERAGE RULE
  else {
    if (icr > 5) setCard("icr", "green");
    else if (icr >= 3) setCard("icr", "yellow");
    else setCard("icr", "red");
  }
}


/* =========================
   13–15. INTRINSIC VALUE
========================= */
function checkIntrinsic() {
  const eps = document.querySelector("#eps input").value;
  const g = document.querySelector("#profit input").value;
  const p = document.querySelector("#price input").value;

  if (eps === "" || g === "") {
    document.querySelector("#iv input").value = "";
    clearCard("iv");
    return;
  }

  const growth = Math.min(Number(g), 20);
  const iv = Number(eps) * (8 + growth);
  document.querySelector("#iv input").value = iv.toFixed(2);

  if (p === "") { clearCard("iv"); return; }

  const price = Number(p);
  if (price < iv * 0.8) setCard("iv", "green");
  else if (price <= iv * 1.2) setCard("iv", "yellow");
  else setCard("iv", "red");
}

/* =========================
   16. P/B RATIO
========================= */
function checkPB(el) {
  const v = el.value;
  if (v === "") { clearCard("pb"); return; }

  if (v < 2) setCard("pb", "green");
  else if (v <= 4) setCard("pb", "yellow");
  else setCard("pb", "red");
}

/* =========================
   17. PROMOTER HOLDING
========================= */
function checkPromoterHolding(el) {
  const v = el.value;
  if (v === "") { clearCard("ph"); return; }

  if (v > 50) setCard("ph", "green");
  else if (v >= 40) setCard("ph", "yellow");
  else setCard("ph", "red");
}

/* =========================
   18. PROMOTER PLEDGE
========================= */
function checkPromoterPledge(el) {
  const v = el.value;
  if (v === "") { clearCard("pp"); return; }

  if (v <= 5) setCard("pp", "green");
  else if (v <= 20) setCard("pp", "yellow");
  else setCard("pp", "red");
}

/* =========================
   OVERALL SCORE
========================= */
function updateScore() {
  let score = 0, max = 0, evaluated = 0;

  document.querySelectorAll(".metric-card").forEach(c => {
    if (c.classList.contains("green")) {
      score += 2; max += 2; evaluated++;
    }
    else if (c.classList.contains("yellow")) {
      score += 1; max += 2; evaluated++;
    }
    else if (c.classList.contains("red")) {
      max += 2; evaluated++;
    }
  });

  const header = document.getElementById("overall");

  // 🚨 NOTHING ENTERED
  if (evaluated === 0) {
    header.className = "overall-score neutral";
    header.innerText = "ENTER DATA TO ANALYZE";
    return;
  }

  const pct = Math.round((score / max) * 100);

  if (pct >= 70) {
    header.className = "overall-score green";
    header.innerText = `🟢 STRONG STOCK (${pct}%)`;
  }
  else if (pct >= 50) {
    header.className = "overall-score yellow";
    header.innerText = `🟡 AVERAGE STOCK (${pct}%)`;
  }
  else {
    header.className = "overall-score red";
    header.innerText = `🔴 WEAK STOCK (${pct}%)`;
  }
}
