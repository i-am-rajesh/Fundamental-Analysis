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
  const pe = document.querySelector("#pe input").value;
  const ind = document.querySelector("#indpe input").value;

  if (pe === "" || ind === "") {
    clearCard("pe");
    return;
  }

  const pev = Number(pe);
  const indv = Number(ind);

  if (pev <= indv) setCard("pe", "green");
  else if (pev <= indv * 1.3) setCard("pe", "yellow");
  else setCard("pe", "red");
}

/* =========================
   4. PEG RATIO
========================= */
function checkPEG(el) {
  const v = el.value;
  if (v === "") { clearCard("peg"); return; }

  const val = Number(v);
  if (val < 1) setCard("peg", "green");
  else if (val <= 1.5) setCard("peg", "yellow");
  else setCard("peg", "red");
}

/* =========================
   5. ROCE
========================= */
function checkROCE(el) {
  const v = el.value;
  if (v === "") { clearCard("roce"); return; }

  if (v > 20) setCard("roce", "green");
  else if (v >= 15) setCard("roce", "yellow");
  else setCard("roce", "red");
}

/* =========================
   6. ROE
========================= */
function checkROE(el) {
  const v = el.value;
  if (v === "") { clearCard("roe"); return; }

  if (v > 20) setCard("roe", "green");
  else if (v >= 15) setCard("roe", "yellow");
  else setCard("roe", "red");
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
  if (v === "") { clearCard("sales"); return; }

  if (v > 12) setCard("sales", "green");
  else if (v >= 8) setCard("sales", "yellow");
  else setCard("sales", "red");
}

/* =========================
   9. OPERATING MARGIN
========================= */
function checkOPM(el) {
  const v = el.value;
  if (v === "") { clearCard("opm"); return; }

  if (v > 20) setCard("opm", "green");
  else if (v >= 12) setCard("opm", "yellow");
  else setCard("opm", "red");
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
  if (v === "") { clearCard("de"); return; }

  if (v < 0.5) setCard("de", "green");
  else if (v <= 1) setCard("de", "yellow");
  else setCard("de", "red");
}

/* =========================
   12. INTEREST COVERAGE
========================= */
function checkICR(el) {
  const v = el.value;
  if (v === "") { clearCard("icr"); return; }

  if (v > 5) setCard("icr", "green");
  else if (v >= 3) setCard("icr", "yellow");
  else setCard("icr", "red");
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
