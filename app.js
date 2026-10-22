
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="বাংলাদেশের জেলা, উপজেলা ও দর্শনীয় স্থান খুঁজুন।">
  <title>আমার এলাকা | বাংলাদেশের দর্শনীয় স্থান</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header class="hero">
    <nav class="navbar">
      <a class="logo" href="#">🌿 আমার এলাকা</a>
      <span>বাংলাদেশকে জানুন</span>
    </nav>

    <div class="hero-content">
      <p class="eyebrow">EXPLORE BANGLADESH</p>
      <h1>আপনার এলাকার <span>দর্শনীয় স্থান</span> খুঁজুন</h1>
      <p class="subtitle">
        জেলা, উপজেলা, ইউনিয়ন কিংবা গ্রামের নাম লিখে খুঁজুন।
      </p>

      <form id="searchForm" class="search-box">
        <input
          id="searchInput"
          type="search"
          placeholder="যেমন: চট্টগ্রাম, রাউজান, কক্সবাজার..."
          autocomplete="off"
        >
        <button type="submit">খুঁজুন 🔍</button>
      </form>

      <div class="quick-search">
        <span>জনপ্রিয়:</span>
        <button type="button" data-query="চট্টগ্রাম">চট্টগ্রাম</button>
        <button type="button" data-query="ঢাকা">ঢাকা</button>
        <button type="button" data-query="কক্সবাজার">কক্সবাজার</button>
      </div>
    </div>
  </header>

  <main class="container">
    <section class="section-heading">
      <div>
        <p class="eyebrow dark">DISCOVER YOUR AREA</p>
        <h2 id="resultsHeading">এলাকা ও দর্শনীয় স্থান</h2>
      </div>
      <span id="resultCount"></span>
    </section>

    <p id="status" class="status">তথ্য লোড হচ্ছে...</p>
    <section id="results" class="results"></section>

    <section class="info-box">
      <h3>আপনার এলাকার তথ্য খুঁজে পাচ্ছেন না?</h3>
      <p>
        নতুন দর্শনীয় স্থানের তথ্য areas.json ফাইলে যোগ করতে হবে।
        যাচাই করা তথ্য যোগ হলে সেটি সার্চে দেখাবে।
      </p>
    </section>
  </main>

  <footer>
    <p>© <span id="year"></span> আমার এলাকা</p>
    <p>বাংলাদেশের সৌন্দর্য, আপনার হাতের মুঠোয় 🇧🇩</p>
  </footer>

  <script src="app.js"></script>
</body>
</html>

@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');

:root {
  --green: #176b50;
  --dark: #0b3028;
  --mint: #e5f3eb;
  --text: #18372e;
  --muted: #718078;
  --background: #f6faf7;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Hind Siliguri', sans-serif;
  background: var(--background);
  color: var(--text);
}

.hero {
  color: white;
  padding: 22px max(18px, calc((100% - 1120px) / 2)) 60px;
  background:
    radial-gradient(ellipse at 85% 15%, #328365, transparent 38%),
    linear-gradient(125deg, #092c24, #176b50);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 23px;
  font-weight: 700;
}

.navbar span {
  color: #d4e9df;
  font-size: 14px;
}

.hero-content {
  max-width: 760px;
  margin: 55px auto 0;
  text-align: center;
}

.eyebrow {
  color: #a6dfc0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.hero h1 {
  font-size: clamp(30px, 5vw, 49px);
  line-height: 1.3;
  margin: 10px 0;
}

.hero h1 span {
  color: #a6e6c2;
}

.subtitle {
  color: #d3e7dd;
  margin-bottom: 25px;
}

.search-box {
  display: flex;
  gap: 8px;
  padding: 7px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 12px 35px #001b1433;
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  padding: 12px;
  font-family: inherit;
  font-size: 15px;
  color: var(--text);
}

.search-box button {
  border: 0;
  border-radius: 10px;
  padding: 10px 22px;
  background: var(--green);
  color: white;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.quick-search {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: 18px;
  color: #d3e7dd;
  font-size: 13px;
}

.quick-search button {
  background: #ffffff14;
  color: white;
  border: 1px solid #ffffff55;
  border-radius: 25px;
  padding: 5px 12px;
  font-family: inherit;
  cursor: pointer;
}

.container {
  max-width: 1120px;
  margin: auto;
  padding: 35px 20px 55px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 5px 0;
  font-size: 27px;
}

.dark {
  color: var(--green);
  margin-bottom: 0;
}

#resultCount {
  color: var(--muted);
  font-size: 14px;
}

.status {
  padding: 13px 16px;
  border-radius: 10px;
  background: var(--mint);
  color: var(--green);
}

.results {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.place-card {
  padding: 20px;
  background: white;
  border: 1px solid #e1ebe5;
  border-radius: 16px;
  box-shadow: 0 5px 18px #17352d08;
  transition: transform 0.2s, box-shadow 0.2s;
}

.place-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 26px #17352d12;
}

.card-title {
  display: flex;
  gap: 12px;
  align-items: center;
}

.place-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  background: var(--mint);
  border-radius: 12px;
  font-size: 23px;
}

.place-card h3 {
  margin: 0;
  font-size: 19px;
}

.location {
  color: var(--muted);
  font-size: 12px;
  margin-top: 4px;
}

.description {
  color: #53665d;
  font-size: 14px;
  line-height: 1.8;
  margin: 16px 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  color: #32644f;
  background: #edf6f0;
  padding: 4px 9px;
  border-radius: 20px;
  font-size: 12px;
}

.empty {
  grid-column: 1 / -1;
  padding: 30px 18px;
  text-align: center;
  border: 1px dashed #cbdcd2;
  background: white;
  border-radius: 15px;
}

.empty h3 {
  margin-top: 0;
}

.info-box {
  margin-top: 35px;
  padding: 20px;
  background: #eaf4ee;
  border-radius: 14px;
  line-height: 1.8;
}

.info-box h3,
.info-box p {
  margin-top: 0;
}

footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 18px max(20px, calc((100% - 1120px) / 2));
  border-top: 1px solid #e1ebe5;
  color: var(--muted);
  font-size: 13px;
}

@media (max-width: 800px) {
  .results {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 550px) {
  .results {
    grid-template-columns: 1fr;
  }

  .hero-content {
    margin-top: 38px;
  }

  .search-box button {
    padding: 9px 13px;
  }

  .section-heading h2 {
    font-size: 22px;
  }

  .container {
    padding-left: 15px;
    padding-right: 15px;
  }

  footer {
    flex-direction: column;
  }
}
