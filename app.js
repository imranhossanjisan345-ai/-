const GEO_URL =
  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

const $ = (id) => document.getElementById(id);

const divisionGrid = $("divisionGrid");
const districtGrid = $("districtGrid");
const divisionFilter = $("divisionFilter");
const districtHeading = $("districtHeading");
const emptyState = $("emptyState");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const areaDialog = $("areaDialog");
const dialogContent = $("dialogContent");
const dialogClose = $("dialogClose");

let divisions = [];
let allDistricts = [];
let allUpazilas = [];
let activeDivision = "";
let activeDistrict = "";



const AREA_INFO = {
  "কক্সবাজার": {
    type: "জেলা",
    intro:
      "কক্সবাজার বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলে বঙ্গোপসাগরের তীরে অবস্থিত চট্টগ্রাম বিভাগের একটি উপকূলীয় জেলা। দীর্ঘ প্রাকৃতিক সমুদ্রসৈকত, উপকূলীয় পরিবেশ, মৎস্যসম্পদ ও পর্যটনের জন্য জেলাটি পরিচিত।",
    history:
      "কক্সবাজারের নাম ব্রিটিশ আমলের কর্মকর্তা ক্যাপ্টেন হিরাম কক্সের নামের সঙ্গে যুক্ত। তিনি আঠারো শতকের শেষ দিকে এ অঞ্চলে কাজ করেন। তাঁর স্মৃতির সঙ্গে এলাকার নামের ইতিহাস সম্পর্কিত।",
    places: [
      "কক্সবাজার সমুদ্রসৈকত",
      "হিমছড়ি",
      "ইনানী সমুদ্রসৈকত",
      "মহেশখালী",
      "রামু"
    ],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ, সামুদ্রিক বাণিজ্য, স্থানীয় খাবার এবং বিভিন্ন সম্প্রদায়ের ঐতিহ্য এ জেলার সংস্কৃতির অংশ।",
    people:
      "ক্যাপ্টেন হিরাম কক্স জেলার নামের ইতিহাসের সঙ্গে বিশেষভাবে যুক্ত। অন্য ব্যক্তিত্বের জীবনী প্রকাশের আগে নির্ভরযোগ্য জীবনীমূলক সূত্র যাচাই করা উচিত।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "চট্টগ্রাম": {
    type: "জেলা",
    intro:
      "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা। কর্ণফুলী নদী, সমুদ্রবন্দর, পাহাড় ও উপকূলীয় ভূপ্রকৃতি এই অঞ্চলের ভৌগোলিক ও অর্থনৈতিক পরিচয়ের অংশ।",
    history:
      "চট্টগ্রাম দীর্ঘকাল ধরে সমুদ্রবাণিজ্য ও আঞ্চলিক যোগাযোগের গুরুত্বপূর্ণ কেন্দ্র। বিভিন্ন সময়ে আরব বণিক, পর্তুগিজ বণিক ও অন্যান্য আঞ্চলিক শক্তির সঙ্গে এ অঞ্চলের যোগাযোগ ছিল। ব্রিটিশ আমলেও বন্দর ও বাণিজ্যের গুরুত্ব বৃদ্ধি পায়।",
    places: [
      "পতেঙ্গা সমুদ্রসৈকত",
      "ফয়েজ লেক",
      "সীতাকুণ্ড",
      "চন্দ্রনাথ পাহাড়",
      "কর্ণফুলী নদী"
    ],
    culture:
      "চট্টগ্রামের আঞ্চলিক ভাষা, মেজবান, সামুদ্রিক খাবার, বাণিজ্যিক ঐতিহ্য ও বহুমাত্রিক সাংস্কৃতিক জীবন এ জেলার পরিচয়ের অংশ।",
    people:
      "চট্টগ্রাম বহু ঐতিহাসিক ও সাংস্কৃতিক ব্যক্তিত্বের জন্মস্থান বা কর্মক্ষেত্র। প্রত্যেক ব্যক্তির নাম, অবদান ও সময়কাল প্রকাশের আগে নির্ভরযোগ্য জীবনী দিয়ে যাচাই করা দরকার।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "রাঙ্গামাটি": {
    type: "জেলা",
    intro:
      "রাঙ্গামাটি বাংলাদেশের পার্বত্য চট্টগ্রামের একটি জেলা। পাহাড়, কাপ্তাই হ্রদ ও বিভিন্ন ক্ষুদ্র নৃগোষ্ঠীর সংস্কৃতির জন্য অঞ্চলটি পরিচিত।",
    history:
      "পার্বত্য চট্টগ্রামের ইতিহাসে বিভিন্ন পাহাড়ি জনগোষ্ঠীর সমাজ, ঐতিহ্য, প্রশাসনিক পরিবর্তন ও কাপ্তাই বাঁধ নির্মাণের গুরুত্বপূর্ণ প্রভাব রয়েছে।",
    places: ["কাপ্তাই হ্রদ", "ঝুলন্ত সেতু", "শুভলং জলপ্রপাত"],
    culture:
      "চাকমা, মারমা ও অন্যান্য জনগোষ্ঠীর ভাষা, পোশাক, হস্তশিল্প ও উৎসব এ অঞ্চলের সাংস্কৃতিক বৈচিত্র্য তুলে ধরে।",
    source: "https://rangamati.gov.bd/",
    sourceLabel: "রাঙ্গামাটি জেলা প্রশাসন"
  },

  "বান্দরবান": {
    type: "জেলা",
    intro:
      "বান্দরবান পার্বত্য চট্টগ্রামের একটি পাহাড়ি জেলা। পাহাড়, বন, নদী এবং বিভিন্ন জাতিগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার পরিচিত বৈশিষ্ট্য।",
    history:
      "বান্দরবানের ইতিহাস পার্বত্য অঞ্চলের বিভিন্ন জনগোষ্ঠীর বসতি, সামাজিক ঐতিহ্য এবং প্রশাসনিক বিবর্তনের সঙ্গে সম্পর্কিত।",
    places: ["নীলাচল", "মেঘলা পর্যটন এলাকা", "সাঙ্গু নদী"],
    culture:
      "মারমা, ম্রো, ত্রিপুরা ও অন্যান্য জনগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার বৈচিত্র্যের গুরুত্বপূর্ণ অংশ।",
    source: "https://bandarban.gov.bd/",
    sourceLabel: "বান্দরবান জেলা প্রশাসন"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    intro: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    history:
      "রাউজানের পূর্ণাঙ্গ স্থানীয় ইতিহাস, নামের উৎপত্তি ও ঐতিহাসিক ঘটনাবলির বিবরণ প্রকাশের আগে সরকারি ও প্রামাণ্য স্থানীয় সূত্র যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "স্থানীয় ঐতিহ্য, শিক্ষা, সামাজিক প্রতিষ্ঠান ও সংস্কৃতি সম্পর্কে নির্ভরযোগ্য তথ্য সংগ্রহ করে এখানে যোগ করা যাবে।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "চকরিয়া": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro: "চকরিয়া কক্সবাজার জেলার একটি উপজেলা।",
    history:
      "চকরিয়ার স্থানীয় ইতিহাস ও প্রশাসনিক বিবর্তনের বিস্তারিত বিবরণ প্রকাশের আগে সরকারি উপজেলা ও জেলা প্রশাসনের তথ্য যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "চকরিয়ার স্থানীয় জীবনযাত্রা, কৃষি, বাণিজ্য ও সংস্কৃতি সম্পর্কে যাচাইকৃত তথ্য এখানে যোগ করা যাবে।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "টেকনাফ": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "টেকনাফ কক্সবাজার জেলার দক্ষিণ প্রান্তের একটি উপকূলীয় উপজেলা, যা নাফ নদী ও মিয়ানমার সীমান্তবর্তী ভৌগোলিক অবস্থানের জন্য পরিচিত।",
    history:
      "টেকনাফের ইতিহাস উপকূলীয় বসতি, নাফ নদীকেন্দ্রিক যোগাযোগ, মৎস্যসম্পদ ও সীমান্তবর্তী জনজীবনের সঙ্গে সম্পর্কিত।",
    places: ["নাফ নদীর মোহনা", "শাহপরীর দ্বীপের উপকূল"],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ এবং স্থানীয় জনগোষ্ঠীর ঐতিহ্য এখানকার জীবনযাত্রার অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "মহেশখালী": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "মহেশখালী কক্সবাজার জেলার একটি দ্বীপ উপজেলা। উপকূলীয় প্রকৃতি, পাহাড় ও স্থানীয় ধর্মীয়-সাংস্কৃতিক ঐতিহ্যের জন্য এটি পরিচিত।",
    history:
      "মহেশখালীর ইতিহাস দ্বীপভিত্তিক জনবসতি, উপকূলীয় বাণিজ্য এবং স্থানীয় ধর্মীয় ও সামাজিক ঐতিহ্যের সঙ্গে সম্পর্কিত।",
    places: ["আদিনাথ মন্দির", "মহেশখালীর উপকূল"],
    culture:
      "দ্বীপের স্থানীয় জীবনযাত্রা, মাছ ধরা, লবণ উৎপাদন এবং ধর্মীয় ঐতিহ্য এখানকার সংস্কৃতির অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  }
};

/* ---------------------------------
   সাধারণ সহায়ক ফাংশন
---------------------------------- */

function getName(item) {
  return item?.bn_name || item?.name || "";
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("bn")
    .replace(/\s+/g, " ");
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

function showStatus(message) {
  districtGrid.replaceChildren();
  districtGrid.appendChild(
    makeElement("div", "empty-state", message)
  );
}

function getInfo(name) {
  if (AREA_INFO[name]) return AREA_INFO[name];

  const normalized = normalizeText(name);
  const key = Object.keys(AREA_INFO).find(
    (item) => normalizeText(item) === normalized
  );

  return key ? AREA_INFO[key] : null;
}

/* ---------------------------------
   বিস্তারিত তথ্য দেখানো
---------------------------------- */

function openDetails(title, lines, sourceUrl, sourceLabel) {
  dialogContent.replaceChildren();

  dialogContent.appendChild(
    makeElement("h2", "", title)
  );

  lines.filter(Boolean).forEach((line) => {
    dialogContent.appendChild(
      makeElement("p", "", line)
    );
  });

  if (sourceUrl) {
    const link = makeElement(
      "a",
      "button-primary",
      sourceLabel || "তথ্যের উৎস দেখুন"
    );

    link.href = sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    dialogContent.appendChild(link);
  }

  if (typeof areaDialog.showModal === "function") {
    areaDialog.showModal();
  } else {
    alert(title + "\n\n" + lines.filter(Boolean).join("\n\n"));
  }
}

function showAreaDetails(item, type) {
  const info = getInfo(item.areaName);

  if (!info) {
    openDetails(
      item.areaName,
      [
        "ধরন: " + type,
        item.districtName ? "জেলা: " + item.districtName : "",
        item.divisionName ? "বিভাগ: " + item.divisionName : "",
        "এই এলাকার বিস্তারিত ইতিহাস, দর্শনীয় স্থান ও গুরুত্বপূর্ণ ব্যক্তিত্বের তথ্য এখনো এই ওয়েবসাইটে যোগ করা হয়নি।",
        "সঠিক তথ্য প্রকাশের জন্য সরকারি নথি ও নির্ভরযোগ্য ঐতিহাসিক সূত্র যাচাই করা হবে।"
      ],
      item.divisionName === "চট্টগ্রাম"
        ? "https://chittagongdiv.gov.bd/"
        : "https://bangladesh.gov.bd/",
      "সরকারি তথ্যসূত্র"
    );
    return;
  }

  const lines = [
    "ধরন: " + (info.type || type),
    info.district ? "জেলা: " + info.district : "",
    item.divisionName ? "বিভাগ: " + item.divisionName : "",
    "",
    "পরিচিতি",
    info.intro || "",
    "",
    "ইতিহাস",
    info.history || "",
    "",
    "দর্শনীয় স্থান",
    info.places?.length
      ? info.places.join(" • ")
      : "দর্শনীয় স্থানের যাচাইকৃত তালিকা এখনো যোগ করা হয়নি।",
    "",
    "সংস্কৃতি ও ঐতিহ্য",
    info.culture || "",
    info.people ? "\nঐতিহাসিক ব্যক্তিত্ব\n" + info.people : ""
  ];

  openDetails(
    item.areaName,
    lines,
    info.source,
    info.sourceLabel
  );
}

/* ---------------------------------
   কার্ড তৈরি
---------------------------------- */

function makeCard(title, subtitle, description, icon, action, secondLabel, secondAction) {
  const card = makeElement("article", "place-card");
  const heading = makeElement("div", "card-title");
  const symbol = makeElement("div", "place-icon", icon);
  const textBox = document.createElement("div");

  textBox.appendChild(makeElement("h3", "", title));
  textBox.appendChild(makeElement("p", "location", subtitle));

  heading.append(symbol, textBox);

  card.appendChild(heading);
  card.appendChild(
    makeElement("p", "description", description)
  );

  const primary = makeElement(
    "button",
    "button-secondary",
    "বিস্তারিত পড়ুন"
  );
  primary.type = "button";
  primary.addEventListener("click", action);
  card.appendChild(primary);

  if (secondLabel && secondAction) {
    const secondary = makeElement(
      "button",
      "button-secondary",
      secondLabel
    );
    secondary.type = "button";
    secondary.style.marginTop = "8px";
    secondary.addEventListener("click", secondAction);
    card.appendChild(secondary);
  }

  return card;
}

/* ---------------------------------
   API ডেটা প্রস্তুত করা
---------------------------------- */

function buildAreaData() {
  allDistricts = [];
  allUpazilas = [];

  divisions.forEach((division) => {
    const divisionName = getName(division);

    (division.districts || []).forEach((district) => {
      const districtName = getName(district);

      allDistricts.push({
        ...district,
        areaName: districtName,
        divisionName
      });

      (district.upazilas || []).forEach((upazila) => {
        allUpazilas.push({
          ...upazila,
          areaName: getName(upazila),
          districtName,
          divisionName
        });
      });
    });
  });
}

/* ---------------------------------
   বিভাগ দেখানো
---------------------------------- */

function renderDivisions() {
  divisionGrid.replaceChildren();
  divisionFilter.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "সব বিভাগ";
  divisionFilter.appendChild(defaultOption);

  divisions.forEach((division, index) => {
    const name = getName(division);
    const option = document.createElement("option");

    option.value = name;
    option.textContent = name;
    divisionFilter.appendChild(option);

    const districtCount = (division.districts || []).length;

    const card = makeCard(
      name,
      "বাংলাদেশ",
      `${districtCount}টি জেলা`,
      ["🗺️", "🌿", "🏞️", "🌊"][index % 4],
      () => {
        activeDivision = name;
        activeDistrict = "";
        searchInput.value = "";
        divisionFilter.value = name;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    divisionGrid.appendChild(card);
  });
}

/* ---------------------------------
   জেলা ও উপজেলা দেখানো
---------------------------------- */

function renderAreas(query = "") {
  districtGrid.replaceChildren();

  const term = normalizeText(query);
  let results = [];

  if (term) {
    const matchingDistricts = allDistricts
      .filter((item) =>
        normalizeText(
          item.areaName + " " + item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "জেলা" }));

    const matchingUpazilas = allUpazilas
      .filter((item) =>
        normalizeText(
          item.areaName + " " +
          item.districtName + " " +
          item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "উপজেলা" }));

    results = [...matchingDistricts, ...matchingUpazilas];

  } else if (activeDistrict) {
    results = allUpazilas
      .filter((item) => item.districtName === activeDistrict)
      .map((item) => ({ ...item, type: "উপজেলা" }));

  } else {
    results = allDistricts
      .filter((item) =>
        !activeDivision || item.divisionName === activeDivision
      )
      .map((item) => ({ ...item, type: "জেলা" }));
  }

  districtHeading.textContent = term
    ? "সার্চের ফলাফল"
    : activeDistrict
      ? activeDistrict + " উপজেলার তালিকা"
      : activeDivision
        ? activeDivision + " বিভাগের জেলাগুলো"
        : "বাংলাদেশের জেলাগুলো";

  emptyState.hidden = results.length > 0;

  if (!results.length) {
    districtGrid.appendChild(
      makeElement(
        "div",
        "empty",
        "কোনো এলাকা পাওয়া যায়নি। নামের বানান পরীক্ষা করুন।"
      )
    );
    return;
  }

  results.forEach((item, index) => {
    const isUpazila = item.type === "উপজেলা";
    const info = getInfo(item.areaName);

    const subtitle = isUpazila
      ? `${item.districtName} জেলা • ${item.divisionName} বিভাগ`
      : `${item.divisionName} বিভাগ`;

    const description = info?.intro ||
      `${item.areaName} ${item.type}। বিস্তারিত পরিচিতি ও ইতিহাস পর্যায়ক্রমে যোগ করা হবে।`;

    const card = makeCard(
      item.areaName,
      subtitle,
      description,
      ["📍", "🏛️", "🌿", "🌊"][index % 4],
      () => showAreaDetails(item, item.type),
      isUpazila ? null : "উপজেলা দেখুন",
      isUpazila ? null : () => {
        activeDistrict = item.areaName;
        activeDivision = item.divisionName;
        searchInput.value = "";
        divisionFilter.value = activeDivision;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    districtGrid.appendChild(card);
  });
}

/* ---------------------------------
   সার্চ ও নিয়ন্ত্রণ
---------------------------------- */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  activeDivision = "";
  activeDistrict = "";
  divisionFilter.value = "";

  renderAreas(searchInput.value);

  $("explore").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeDivision = "";
    activeDistrict = "";
    divisionFilter.value = "";
    renderAreas();
  }
});

divisionFilter.addEventListener("change", () => {
  activeDivision = divisionFilter.value;
  activeDistrict = "";
  searchInput.value = "";
  renderAreas();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  divisionFilter.value = "";
  activeDivision = "";
  activeDistrict = "";
  renderAreas();
});

dialogClose.addEventListener("click", () => {
  areaDialog.close();
});

areaDialog.addEventListener("click", (event) => {
  if (event.target === areaDialog) {
    areaDialog.close();
  }
});

/* ---------------------------------
   ওয়েবসাইট চালু
---------------------------------- */

async function init() {
  $("year").textContent = new Date().getFullYear();

  showStatus("বাংলাদেশের এলাকার তথ্য লোড হচ্ছে...");

  try {
    const response = await fetch(GEO_URL);

    if (!response.ok) {
      throw new Error("API response: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("API-তে প্রত্যাশিত বিভাগ-জেলার ডেটা নেই");
    }

    divisions = data;
    buildAreaData();

    if (!allDistricts.length) {
      throw new Error("API-র ডেটার কাঠামো প্রত্যাশিত নয়");
    }

    renderDivisions();
    renderAreas();

  } catch (error) {
    console.error("আমার এলাকা:", error);

    showStatus(
      "এলাকার তালিকা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন। পরে আবার চেষ্টা করুন।"
    );
  }
}

init();/* ======================================================
   আমার এলাকা — Complete app.js
   বিভাগ, জেলা, উপজেলা, সার্চ ও এলাকার বিস্তারিত
   ====================================================== */

const GEO_URL =
  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

const $ = (id) => document.getElementById(id);

const divisionGrid = $("divisionGrid");
const districtGrid = $("districtGrid");
const divisionFilter = $("divisionFilter");
const districtHeading = $("districtHeading");
const emptyState = $("emptyState");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const areaDialog = $("areaDialog");
const dialogContent = $("dialogContent");
const dialogClose = $("dialogClose");

let divisions = [];
let allDistricts = [];
let allUpazilas = [];
let activeDivision = "";
let activeDistrict = "";

/* ---------------------------------
   যাচাইযোগ্য পরিচিতি যোগ করার ডেটা
   নামগুলো API-র বাংলা নামের সঙ্গে
   মিলিয়ে রাখা হয়েছে।
---------------------------------- */

const AREA_INFO = {
  "কক্সবাজার": {
    type: "জেলা",
    intro:
      "কক্সবাজার বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলে বঙ্গোপসাগরের তীরে অবস্থিত চট্টগ্রাম বিভাগের একটি উপকূলীয় জেলা। দীর্ঘ প্রাকৃতিক সমুদ্রসৈকত, উপকূলীয় পরিবেশ, মৎস্যসম্পদ ও পর্যটনের জন্য জেলাটি পরিচিত।",
    history:
      "কক্সবাজারের নাম ব্রিটিশ আমলের কর্মকর্তা ক্যাপ্টেন হিরাম কক্সের নামের সঙ্গে যুক্ত। তিনি আঠারো শতকের শেষ দিকে এ অঞ্চলে কাজ করেন। তাঁর স্মৃতির সঙ্গে এলাকার নামের ইতিহাস সম্পর্কিত।",
    places: [
      "কক্সবাজার সমুদ্রসৈকত",
      "হিমছড়ি",
      "ইনানী সমুদ্রসৈকত",
      "মহেশখালী",
      "রামু"
    ],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ, সামুদ্রিক বাণিজ্য, স্থানীয় খাবার এবং বিভিন্ন সম্প্রদায়ের ঐতিহ্য এ জেলার সংস্কৃতির অংশ।",
    people:
      "ক্যাপ্টেন হিরাম কক্স জেলার নামের ইতিহাসের সঙ্গে বিশেষভাবে যুক্ত। অন্য ব্যক্তিত্বের জীবনী প্রকাশের আগে নির্ভরযোগ্য জীবনীমূলক সূত্র যাচাই করা উচিত।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "চট্টগ্রাম": {
    type: "জেলা",
    intro:
      "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা। কর্ণফুলী নদী, সমুদ্রবন্দর, পাহাড় ও উপকূলীয় ভূপ্রকৃতি এই অঞ্চলের ভৌগোলিক ও অর্থনৈতিক পরিচয়ের অংশ।",
    history:
      "চট্টগ্রাম দীর্ঘকাল ধরে সমুদ্রবাণিজ্য ও আঞ্চলিক যোগাযোগের গুরুত্বপূর্ণ কেন্দ্র। বিভিন্ন সময়ে আরব বণিক, পর্তুগিজ বণিক ও অন্যান্য আঞ্চলিক শক্তির সঙ্গে এ অঞ্চলের যোগাযোগ ছিল। ব্রিটিশ আমলেও বন্দর ও বাণিজ্যের গুরুত্ব বৃদ্ধি পায়।",
    places: [
      "পতেঙ্গা সমুদ্রসৈকত",
      "ফয়েজ লেক",
      "সীতাকুণ্ড",
      "চন্দ্রনাথ পাহাড়",
      "কর্ণফুলী নদী"
    ],
    culture:
      "চট্টগ্রামের আঞ্চলিক ভাষা, মেজবান, সামুদ্রিক খাবার, বাণিজ্যিক ঐতিহ্য ও বহুমাত্রিক সাংস্কৃতিক জীবন এ জেলার পরিচয়ের অংশ।",
    people:
      "চট্টগ্রাম বহু ঐতিহাসিক ও সাংস্কৃতিক ব্যক্তিত্বের জন্মস্থান বা কর্মক্ষেত্র। প্রত্যেক ব্যক্তির নাম, অবদান ও সময়কাল প্রকাশের আগে নির্ভরযোগ্য জীবনী দিয়ে যাচাই করা দরকার।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "রাঙ্গামাটি": {
    type: "জেলা",
    intro:
      "রাঙ্গামাটি বাংলাদেশের পার্বত্য চট্টগ্রামের একটি জেলা। পাহাড়, কাপ্তাই হ্রদ ও বিভিন্ন ক্ষুদ্র নৃগোষ্ঠীর সংস্কৃতির জন্য অঞ্চলটি পরিচিত।",
    history:
      "পার্বত্য চট্টগ্রামের ইতিহাসে বিভিন্ন পাহাড়ি জনগোষ্ঠীর সমাজ, ঐতিহ্য, প্রশাসনিক পরিবর্তন ও কাপ্তাই বাঁধ নির্মাণের গুরুত্বপূর্ণ প্রভাব রয়েছে।",
    places: ["কাপ্তাই হ্রদ", "ঝুলন্ত সেতু", "শুভলং জলপ্রপাত"],
    culture:
      "চাকমা, মারমা ও অন্যান্য জনগোষ্ঠীর ভাষা, পোশাক, হস্তশিল্প ও উৎসব এ অঞ্চলের সাংস্কৃতিক বৈচিত্র্য তুলে ধরে।",
    source: "https://rangamati.gov.bd/",
    sourceLabel: "রাঙ্গামাটি জেলা প্রশাসন"
  },

  "বান্দরবান": {
    type: "জেলা",
    intro:
      "বান্দরবান পার্বত্য চট্টগ্রামের একটি পাহাড়ি জেলা। পাহাড়, বন, নদী এবং বিভিন্ন জাতিগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার পরিচিত বৈশিষ্ট্য।",
    history:
      "বান্দরবানের ইতিহাস পার্বত্য অঞ্চলের বিভিন্ন জনগোষ্ঠীর বসতি, সামাজিক ঐতিহ্য এবং প্রশাসনিক বিবর্তনের সঙ্গে সম্পর্কিত।",
    places: ["নীলাচল", "মেঘলা পর্যটন এলাকা", "সাঙ্গু নদী"],
    culture:
      "মারমা, ম্রো, ত্রিপুরা ও অন্যান্য জনগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার বৈচিত্র্যের গুরুত্বপূর্ণ অংশ।",
    source: "https://bandarban.gov.bd/",
    sourceLabel: "বান্দরবান জেলা প্রশাসন"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    intro: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    history:
      "রাউজানের পূর্ণাঙ্গ স্থানীয় ইতিহাস, নামের উৎপত্তি ও ঐতিহাসিক ঘটনাবলির বিবরণ প্রকাশের আগে সরকারি ও প্রামাণ্য স্থানীয় সূত্র যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "স্থানীয় ঐতিহ্য, শিক্ষা, সামাজিক প্রতিষ্ঠান ও সংস্কৃতি সম্পর্কে নির্ভরযোগ্য তথ্য সংগ্রহ করে এখানে যোগ করা যাবে।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "চকরিয়া": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro: "চকরিয়া কক্সবাজার জেলার একটি উপজেলা।",
    history:
      "চকরিয়ার স্থানীয় ইতিহাস ও প্রশাসনিক বিবর্তনের বিস্তারিত বিবরণ প্রকাশের আগে সরকারি উপজেলা ও জেলা প্রশাসনের তথ্য যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "চকরিয়ার স্থানীয় জীবনযাত্রা, কৃষি, বাণিজ্য ও সংস্কৃতি সম্পর্কে যাচাইকৃত তথ্য এখানে যোগ করা যাবে।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "টেকনাফ": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "টেকনাফ কক্সবাজার জেলার দক্ষিণ প্রান্তের একটি উপকূলীয় উপজেলা, যা নাফ নদী ও মিয়ানমার সীমান্তবর্তী ভৌগোলিক অবস্থানের জন্য পরিচিত।",
    history:
      "টেকনাফের ইতিহাস উপকূলীয় বসতি, নাফ নদীকেন্দ্রিক যোগাযোগ, মৎস্যসম্পদ ও সীমান্তবর্তী জনজীবনের সঙ্গে সম্পর্কিত।",
    places: ["নাফ নদীর মোহনা", "শাহপরীর দ্বীপের উপকূল"],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ এবং স্থানীয় জনগোষ্ঠীর ঐতিহ্য এখানকার জীবনযাত্রার অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "মহেশখালী": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "মহেশখালী কক্সবাজার জেলার একটি দ্বীপ উপজেলা। উপকূলীয় প্রকৃতি, পাহাড় ও স্থানীয় ধর্মীয়-সাংস্কৃতিক ঐতিহ্যের জন্য এটি পরিচিত।",
    history:
      "মহেশখালীর ইতিহাস দ্বীপভিত্তিক জনবসতি, উপকূলীয় বাণিজ্য এবং স্থানীয় ধর্মীয় ও সামাজিক ঐতিহ্যের সঙ্গে সম্পর্কিত।",
    places: ["আদিনাথ মন্দির", "মহেশখালীর উপকূল"],
    culture:
      "দ্বীপের স্থানীয় জীবনযাত্রা, মাছ ধরা, লবণ উৎপাদন এবং ধর্মীয় ঐতিহ্য এখানকার সংস্কৃতির অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  }
};

/* ---------------------------------
   সাধারণ সহায়ক ফাংশন
---------------------------------- */

function getName(item) {
  return item?.bn_name || item?.name || "";
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("bn")
    .replace(/\s+/g, " ");
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

function showStatus(message) {
  districtGrid.replaceChildren();
  districtGrid.appendChild(
    makeElement("div", "empty-state", message)
  );
}

function getInfo(name) {
  if (AREA_INFO[name]) return AREA_INFO[name];

  const normalized = normalizeText(name);
  const key = Object.keys(AREA_INFO).find(
    (item) => normalizeText(item) === normalized
  );

  return key ? AREA_INFO[key] : null;
}

/* ---------------------------------
   বিস্তারিত তথ্য দেখানো
---------------------------------- */

function openDetails(title, lines, sourceUrl, sourceLabel) {
  dialogContent.replaceChildren();

  dialogContent.appendChild(
    makeElement("h2", "", title)
  );

  lines.filter(Boolean).forEach((line) => {
    dialogContent.appendChild(
      makeElement("p", "", line)
    );
  });

  if (sourceUrl) {
    const link = makeElement(
      "a",
      "button-primary",
      sourceLabel || "তথ্যের উৎস দেখুন"
    );

    link.href = sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    dialogContent.appendChild(link);
  }

  if (typeof areaDialog.showModal === "function") {
    areaDialog.showModal();
  } else {
    alert(title + "\n\n" + lines.filter(Boolean).join("\n\n"));
  }
}

function showAreaDetails(item, type) {
  const info = getInfo(item.areaName);

  if (!info) {
    openDetails(
      item.areaName,
      [
        "ধরন: " + type,
        item.districtName ? "জেলা: " + item.districtName : "",
        item.divisionName ? "বিভাগ: " + item.divisionName : "",
        "এই এলাকার বিস্তারিত ইতিহাস, দর্শনীয় স্থান ও গুরুত্বপূর্ণ ব্যক্তিত্বের তথ্য এখনো এই ওয়েবসাইটে যোগ করা হয়নি।",
        "সঠিক তথ্য প্রকাশের জন্য সরকারি নথি ও নির্ভরযোগ্য ঐতিহাসিক সূত্র যাচাই করা হবে।"
      ],
      item.divisionName === "চট্টগ্রাম"
        ? "https://chittagongdiv.gov.bd/"
        : "https://bangladesh.gov.bd/",
      "সরকারি তথ্যসূত্র"
    );
    return;
  }

  const lines = [
    "ধরন: " + (info.type || type),
    info.district ? "জেলা: " + info.district : "",
    item.divisionName ? "বিভাগ: " + item.divisionName : "",
    "",
    "পরিচিতি",
    info.intro || "",
    "",
    "ইতিহাস",
    info.history || "",
    "",
    "দর্শনীয় স্থান",
    info.places?.length
      ? info.places.join(" • ")
      : "দর্শনীয় স্থানের যাচাইকৃত তালিকা এখনো যোগ করা হয়নি।",
    "",
    "সংস্কৃতি ও ঐতিহ্য",
    info.culture || "",
    info.people ? "\nঐতিহাসিক ব্যক্তিত্ব\n" + info.people : ""
  ];

  openDetails(
    item.areaName,
    lines,
    info.source,
    info.sourceLabel
  );
}

/* ---------------------------------
   কার্ড তৈরি
---------------------------------- */

function makeCard(title, subtitle, description, icon, action, secondLabel, secondAction) {
  const card = makeElement("article", "place-card");
  const heading = makeElement("div", "card-title");
  const symbol = makeElement("div", "place-icon", icon);
  const textBox = document.createElement("div");

  textBox.appendChild(makeElement("h3", "", title));
  textBox.appendChild(makeElement("p", "location", subtitle));

  heading.append(symbol, textBox);

  card.appendChild(heading);
  card.appendChild(
    makeElement("p", "description", description)
  );

  const primary = makeElement(
    "button",
    "button-secondary",
    "বিস্তারিত পড়ুন"
  );
  primary.type = "button";
  primary.addEventListener("click", action);
  card.appendChild(primary);

  if (secondLabel && secondAction) {
    const secondary = makeElement(
      "button",
      "button-secondary",
      secondLabel
    );
    secondary.type = "button";
    secondary.style.marginTop = "8px";
    secondary.addEventListener("click", secondAction);
    card.appendChild(secondary);
  }

  return card;
}

/* ---------------------------------
   API ডেটা প্রস্তুত করা
---------------------------------- */

function buildAreaData() {
  allDistricts = [];
  allUpazilas = [];

  divisions.forEach((division) => {
    const divisionName = getName(division);

    (division.districts || []).forEach((district) => {
      const districtName = getName(district);

      allDistricts.push({
        ...district,
        areaName: districtName,
        divisionName
      });

      (district.upazilas || []).forEach((upazila) => {
        allUpazilas.push({
          ...upazila,
          areaName: getName(upazila),
          districtName,
          divisionName
        });
      });
    });
  });
}

/* ---------------------------------
   বিভাগ দেখানো
---------------------------------- */

function renderDivisions() {
  divisionGrid.replaceChildren();
  divisionFilter.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "সব বিভাগ";
  divisionFilter.appendChild(defaultOption);

  divisions.forEach((division, index) => {
    const name = getName(division);
    const option = document.createElement("option");

    option.value = name;
    option.textContent = name;
    divisionFilter.appendChild(option);

    const districtCount = (division.districts || []).length;

    const card = makeCard(
      name,
      "বাংলাদেশ",
      `${districtCount}টি জেলা`,
      ["🗺️", "🌿", "🏞️", "🌊"][index % 4],
      () => {
        activeDivision = name;
        activeDistrict = "";
        searchInput.value = "";
        divisionFilter.value = name;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    divisionGrid.appendChild(card);
  });
}

/* ---------------------------------
   জেলা ও উপজেলা দেখানো
---------------------------------- */

function renderAreas(query = "") {
  districtGrid.replaceChildren();

  const term = normalizeText(query);
  let results = [];

  if (term) {
    const matchingDistricts = allDistricts
      .filter((item) =>
        normalizeText(
          item.areaName + " " + item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "জেলা" }));

    const matchingUpazilas = allUpazilas
      .filter((item) =>
        normalizeText(
          item.areaName + " " +
          item.districtName + " " +
          item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "উপজেলা" }));

    results = [...matchingDistricts, ...matchingUpazilas];

  } else if (activeDistrict) {
    results = allUpazilas
      .filter((item) => item.districtName === activeDistrict)
      .map((item) => ({ ...item, type: "উপজেলা" }));

  } else {
    results = allDistricts
      .filter((item) =>
        !activeDivision || item.divisionName === activeDivision
      )
      .map((item) => ({ ...item, type: "জেলা" }));
  }

  districtHeading.textContent = term
    ? "সার্চের ফলাফল"
    : activeDistrict
      ? activeDistrict + " উপজেলার তালিকা"
      : activeDivision
        ? activeDivision + " বিভাগের জেলাগুলো"
        : "বাংলাদেশের জেলাগুলো";

  emptyState.hidden = results.length > 0;

  if (!results.length) {
    districtGrid.appendChild(
      makeElement(
        "div",
        "empty",
        "কোনো এলাকা পাওয়া যায়নি। নামের বানান পরীক্ষা করুন।"
      )
    );
    return;
  }

  results.forEach((item, index) => {
    const isUpazila = item.type === "উপজেলা";
    const info = getInfo(item.areaName);

    const subtitle = isUpazila
      ? `${item.districtName} জেলা • ${item.divisionName} বিভাগ`
      : `${item.divisionName} বিভাগ`;

    const description = info?.intro ||
      `${item.areaName} ${item.type}। বিস্তারিত পরিচিতি ও ইতিহাস পর্যায়ক্রমে যোগ করা হবে।`;

    const card = makeCard(
      item.areaName,
      subtitle,
      description,
      ["📍", "🏛️", "🌿", "🌊"][index % 4],
      () => showAreaDetails(item, item.type),
      isUpazila ? null : "উপজেলা দেখুন",
      isUpazila ? null : () => {
        activeDistrict = item.areaName;
        activeDivision = item.divisionName;
        searchInput.value = "";
        divisionFilter.value = activeDivision;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    districtGrid.appendChild(card);
  });
}

/* ---------------------------------
   সার্চ ও নিয়ন্ত্রণ
---------------------------------- */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  activeDivision = "";
  activeDistrict = "";
  divisionFilter.value = "";

  renderAreas(searchInput.value);

  $("explore").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeDivision = "";
    activeDistrict = "";
    divisionFilter.value = "";
    renderAreas();
  }
});

divisionFilter.addEventListener("change", () => {
  activeDivision = divisionFilter.value;
  activeDistrict = "";
  searchInput.value = "";
  renderAreas();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  divisionFilter.value = "";
  activeDivision = "";
  activeDistrict = "";
  renderAreas();
});

dialogClose.addEventListener("click", () => {
  areaDialog.close();
});

areaDialog.addEventListener("click", (event) => {
  if (event.target === areaDialog) {
    areaDialog.close();
  }
});

/* ---------------------------------
   ওয়েবসাইট চালু
---------------------------------- */

async function init() {
  $("year").textContent = new Date().getFullYear();

  showStatus("বাংলাদেশের এলাকার তথ্য লোড হচ্ছে...");

  try {
    const response = await fetch(GEO_URL);

    if (!response.ok) {
      throw new Error("API response: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("API-তে প্রত্যাশিত বিভাগ-জেলার ডেটা নেই");
    }

    divisions = data;
    buildAreaData();

    if (!allDistricts.length) {
      throw new Error("API-র ডেটার কাঠামো প্রত্যাশিত নয়");
    }

    renderDivisions();
    renderAreas();

  } catch (error) {
    console.error("আমার এলাকা:", error);

    showStatus(
      "এলাকার তালিকা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন। পরে আবার চেষ্টা করুন।"
    );
  }
}

init();/* ======================================================
   আমার এলাকা — Complete app.js
   বিভাগ, জেলা, উপজেলা, সার্চ ও এলাকার বিস্তারিত
   ====================================================== */

const GEO_URL =
  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

const $ = (id) => document.getElementById(id);

const divisionGrid = $("divisionGrid");
const districtGrid = $("districtGrid");
const divisionFilter = $("divisionFilter");
const districtHeading = $("districtHeading");
const emptyState = $("emptyState");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const areaDialog = $("areaDialog");
const dialogContent = $("dialogContent");
const dialogClose = $("dialogClose");

let divisions = [];
let allDistricts = [];
let allUpazilas = [];
let activeDivision = "";
let activeDistrict = "";

/* ---------------------------------
   যাচাইযোগ্য পরিচিতি যোগ করার ডেটা
   নামগুলো API-র বাংলা নামের সঙ্গে
   মিলিয়ে রাখা হয়েছে।
---------------------------------- */

const AREA_INFO = {
  "কক্সবাজার": {
    type: "জেলা",
    intro:
      "কক্সবাজার বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলে বঙ্গোপসাগরের তীরে অবস্থিত চট্টগ্রাম বিভাগের একটি উপকূলীয় জেলা। দীর্ঘ প্রাকৃতিক সমুদ্রসৈকত, উপকূলীয় পরিবেশ, মৎস্যসম্পদ ও পর্যটনের জন্য জেলাটি পরিচিত।",
    history:
      "কক্সবাজারের নাম ব্রিটিশ আমলের কর্মকর্তা ক্যাপ্টেন হিরাম কক্সের নামের সঙ্গে যুক্ত। তিনি আঠারো শতকের শেষ দিকে এ অঞ্চলে কাজ করেন। তাঁর স্মৃতির সঙ্গে এলাকার নামের ইতিহাস সম্পর্কিত।",
    places: [
      "কক্সবাজার সমুদ্রসৈকত",
      "হিমছড়ি",
      "ইনানী সমুদ্রসৈকত",
      "মহেশখালী",
      "রামু"
    ],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ, সামুদ্রিক বাণিজ্য, স্থানীয় খাবার এবং বিভিন্ন সম্প্রদায়ের ঐতিহ্য এ জেলার সংস্কৃতির অংশ।",
    people:
      "ক্যাপ্টেন হিরাম কক্স জেলার নামের ইতিহাসের সঙ্গে বিশেষভাবে যুক্ত। অন্য ব্যক্তিত্বের জীবনী প্রকাশের আগে নির্ভরযোগ্য জীবনীমূলক সূত্র যাচাই করা উচিত।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "চট্টগ্রাম": {
    type: "জেলা",
    intro:
      "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা। কর্ণফুলী নদী, সমুদ্রবন্দর, পাহাড় ও উপকূলীয় ভূপ্রকৃতি এই অঞ্চলের ভৌগোলিক ও অর্থনৈতিক পরিচয়ের অংশ।",
    history:
      "চট্টগ্রাম দীর্ঘকাল ধরে সমুদ্রবাণিজ্য ও আঞ্চলিক যোগাযোগের গুরুত্বপূর্ণ কেন্দ্র। বিভিন্ন সময়ে আরব বণিক, পর্তুগিজ বণিক ও অন্যান্য আঞ্চলিক শক্তির সঙ্গে এ অঞ্চলের যোগাযোগ ছিল। ব্রিটিশ আমলেও বন্দর ও বাণিজ্যের গুরুত্ব বৃদ্ধি পায়।",
    places: [
      "পতেঙ্গা সমুদ্রসৈকত",
      "ফয়েজ লেক",
      "সীতাকুণ্ড",
      "চন্দ্রনাথ পাহাড়",
      "কর্ণফুলী নদী"
    ],
    culture:
      "চট্টগ্রামের আঞ্চলিক ভাষা, মেজবান, সামুদ্রিক খাবার, বাণিজ্যিক ঐতিহ্য ও বহুমাত্রিক সাংস্কৃতিক জীবন এ জেলার পরিচয়ের অংশ।",
    people:
      "চট্টগ্রাম বহু ঐতিহাসিক ও সাংস্কৃতিক ব্যক্তিত্বের জন্মস্থান বা কর্মক্ষেত্র। প্রত্যেক ব্যক্তির নাম, অবদান ও সময়কাল প্রকাশের আগে নির্ভরযোগ্য জীবনী দিয়ে যাচাই করা দরকার।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "রাঙ্গামাটি": {
    type: "জেলা",
    intro:
      "রাঙ্গামাটি বাংলাদেশের পার্বত্য চট্টগ্রামের একটি জেলা। পাহাড়, কাপ্তাই হ্রদ ও বিভিন্ন ক্ষুদ্র নৃগোষ্ঠীর সংস্কৃতির জন্য অঞ্চলটি পরিচিত।",
    history:
      "পার্বত্য চট্টগ্রামের ইতিহাসে বিভিন্ন পাহাড়ি জনগোষ্ঠীর সমাজ, ঐতিহ্য, প্রশাসনিক পরিবর্তন ও কাপ্তাই বাঁধ নির্মাণের গুরুত্বপূর্ণ প্রভাব রয়েছে।",
    places: ["কাপ্তাই হ্রদ", "ঝুলন্ত সেতু", "শুভলং জলপ্রপাত"],
    culture:
      "চাকমা, মারমা ও অন্যান্য জনগোষ্ঠীর ভাষা, পোশাক, হস্তশিল্প ও উৎসব এ অঞ্চলের সাংস্কৃতিক বৈচিত্র্য তুলে ধরে।",
    source: "https://rangamati.gov.bd/",
    sourceLabel: "রাঙ্গামাটি জেলা প্রশাসন"
  },

  "বান্দরবান": {
    type: "জেলা",
    intro:
      "বান্দরবান পার্বত্য চট্টগ্রামের একটি পাহাড়ি জেলা। পাহাড়, বন, নদী এবং বিভিন্ন জাতিগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার পরিচিত বৈশিষ্ট্য।",
    history:
      "বান্দরবানের ইতিহাস পার্বত্য অঞ্চলের বিভিন্ন জনগোষ্ঠীর বসতি, সামাজিক ঐতিহ্য এবং প্রশাসনিক বিবর্তনের সঙ্গে সম্পর্কিত।",
    places: ["নীলাচল", "মেঘলা পর্যটন এলাকা", "সাঙ্গু নদী"],
    culture:
      "মারমা, ম্রো, ত্রিপুরা ও অন্যান্য জনগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার বৈচিত্র্যের গুরুত্বপূর্ণ অংশ।",
    source: "https://bandarban.gov.bd/",
    sourceLabel: "বান্দরবান জেলা প্রশাসন"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    intro: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    history:
      "রাউজানের পূর্ণাঙ্গ স্থানীয় ইতিহাস, নামের উৎপত্তি ও ঐতিহাসিক ঘটনাবলির বিবরণ প্রকাশের আগে সরকারি ও প্রামাণ্য স্থানীয় সূত্র যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "স্থানীয় ঐতিহ্য, শিক্ষা, সামাজিক প্রতিষ্ঠান ও সংস্কৃতি সম্পর্কে নির্ভরযোগ্য তথ্য সংগ্রহ করে এখানে যোগ করা যাবে।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "চকরিয়া": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro: "চকরিয়া কক্সবাজার জেলার একটি উপজেলা।",
    history:
      "চকরিয়ার স্থানীয় ইতিহাস ও প্রশাসনিক বিবর্তনের বিস্তারিত বিবরণ প্রকাশের আগে সরকারি উপজেলা ও জেলা প্রশাসনের তথ্য যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "চকরিয়ার স্থানীয় জীবনযাত্রা, কৃষি, বাণিজ্য ও সংস্কৃতি সম্পর্কে যাচাইকৃত তথ্য এখানে যোগ করা যাবে।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "টেকনাফ": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "টেকনাফ কক্সবাজার জেলার দক্ষিণ প্রান্তের একটি উপকূলীয় উপজেলা, যা নাফ নদী ও মিয়ানমার সীমান্তবর্তী ভৌগোলিক অবস্থানের জন্য পরিচিত।",
    history:
      "টেকনাফের ইতিহাস উপকূলীয় বসতি, নাফ নদীকেন্দ্রিক যোগাযোগ, মৎস্যসম্পদ ও সীমান্তবর্তী জনজীবনের সঙ্গে সম্পর্কিত।",
    places: ["নাফ নদীর মোহনা", "শাহপরীর দ্বীপের উপকূল"],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ এবং স্থানীয় জনগোষ্ঠীর ঐতিহ্য এখানকার জীবনযাত্রার অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "মহেশখালী": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "মহেশখালী কক্সবাজার জেলার একটি দ্বীপ উপজেলা। উপকূলীয় প্রকৃতি, পাহাড় ও স্থানীয় ধর্মীয়-সাংস্কৃতিক ঐতিহ্যের জন্য এটি পরিচিত।",
    history:
      "মহেশখালীর ইতিহাস দ্বীপভিত্তিক জনবসতি, উপকূলীয় বাণিজ্য এবং স্থানীয় ধর্মীয় ও সামাজিক ঐতিহ্যের সঙ্গে সম্পর্কিত।",
    places: ["আদিনাথ মন্দির", "মহেশখালীর উপকূল"],
    culture:
      "দ্বীপের স্থানীয় জীবনযাত্রা, মাছ ধরা, লবণ উৎপাদন এবং ধর্মীয় ঐতিহ্য এখানকার সংস্কৃতির অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  }
};

/* ---------------------------------
   সাধারণ সহায়ক ফাংশন
---------------------------------- */

function getName(item) {
  return item?.bn_name || item?.name || "";
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("bn")
    .replace(/\s+/g, " ");
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

function showStatus(message) {
  districtGrid.replaceChildren();
  districtGrid.appendChild(
    makeElement("div", "empty-state", message)
  );
}

function getInfo(name) {
  if (AREA_INFO[name]) return AREA_INFO[name];

  const normalized = normalizeText(name);
  const key = Object.keys(AREA_INFO).find(
    (item) => normalizeText(item) === normalized
  );

  return key ? AREA_INFO[key] : null;
}

/* ---------------------------------
   বিস্তারিত তথ্য দেখানো
---------------------------------- */

function openDetails(title, lines, sourceUrl, sourceLabel) {
  dialogContent.replaceChildren();

  dialogContent.appendChild(
    makeElement("h2", "", title)
  );

  lines.filter(Boolean).forEach((line) => {
    dialogContent.appendChild(
      makeElement("p", "", line)
    );
  });

  if (sourceUrl) {
    const link = makeElement(
      "a",
      "button-primary",
      sourceLabel || "তথ্যের উৎস দেখুন"
    );

    link.href = sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    dialogContent.appendChild(link);
  }

  if (typeof areaDialog.showModal === "function") {
    areaDialog.showModal();
  } else {
    alert(title + "\n\n" + lines.filter(Boolean).join("\n\n"));
  }
}

function showAreaDetails(item, type) {
  const info = getInfo(item.areaName);

  if (!info) {
    openDetails(
      item.areaName,
      [
        "ধরন: " + type,
        item.districtName ? "জেলা: " + item.districtName : "",
        item.divisionName ? "বিভাগ: " + item.divisionName : "",
        "এই এলাকার বিস্তারিত ইতিহাস, দর্শনীয় স্থান ও গুরুত্বপূর্ণ ব্যক্তিত্বের তথ্য এখনো এই ওয়েবসাইটে যোগ করা হয়নি।",
        "সঠিক তথ্য প্রকাশের জন্য সরকারি নথি ও নির্ভরযোগ্য ঐতিহাসিক সূত্র যাচাই করা হবে।"
      ],
      item.divisionName === "চট্টগ্রাম"
        ? "https://chittagongdiv.gov.bd/"
        : "https://bangladesh.gov.bd/",
      "সরকারি তথ্যসূত্র"
    );
    return;
  }

  const lines = [
    "ধরন: " + (info.type || type),
    info.district ? "জেলা: " + info.district : "",
    item.divisionName ? "বিভাগ: " + item.divisionName : "",
    "",
    "পরিচিতি",
    info.intro || "",
    "",
    "ইতিহাস",
    info.history || "",
    "",
    "দর্শনীয় স্থান",
    info.places?.length
      ? info.places.join(" • ")
      : "দর্শনীয় স্থানের যাচাইকৃত তালিকা এখনো যোগ করা হয়নি।",
    "",
    "সংস্কৃতি ও ঐতিহ্য",
    info.culture || "",
    info.people ? "\nঐতিহাসিক ব্যক্তিত্ব\n" + info.people : ""
  ];

  openDetails(
    item.areaName,
    lines,
    info.source,
    info.sourceLabel
  );
}

/* ---------------------------------
   কার্ড তৈরি
---------------------------------- */

function makeCard(title, subtitle, description, icon, action, secondLabel, secondAction) {
  const card = makeElement("article", "place-card");
  const heading = makeElement("div", "card-title");
  const symbol = makeElement("div", "place-icon", icon);
  const textBox = document.createElement("div");

  textBox.appendChild(makeElement("h3", "", title));
  textBox.appendChild(makeElement("p", "location", subtitle));

  heading.append(symbol, textBox);

  card.appendChild(heading);
  card.appendChild(
    makeElement("p", "description", description)
  );

  const primary = makeElement(
    "button",
    "button-secondary",
    "বিস্তারিত পড়ুন"
  );
  primary.type = "button";
  primary.addEventListener("click", action);
  card.appendChild(primary);

  if (secondLabel && secondAction) {
    const secondary = makeElement(
      "button",
      "button-secondary",
      secondLabel
    );
    secondary.type = "button";
    secondary.style.marginTop = "8px";
    secondary.addEventListener("click", secondAction);
    card.appendChild(secondary);
  }

  return card;
}

/* ---------------------------------
   API ডেটা প্রস্তুত করা
---------------------------------- */

function buildAreaData() {
  allDistricts = [];
  allUpazilas = [];

  divisions.forEach((division) => {
    const divisionName = getName(division);

    (division.districts || []).forEach((district) => {
      const districtName = getName(district);

      allDistricts.push({
        ...district,
        areaName: districtName,
        divisionName
      });

      (district.upazilas || []).forEach((upazila) => {
        allUpazilas.push({
          ...upazila,
          areaName: getName(upazila),
          districtName,
          divisionName
        });
      });
    });
  });
}

/* ---------------------------------
   বিভাগ দেখানো
---------------------------------- */

function renderDivisions() {
  divisionGrid.replaceChildren();
  divisionFilter.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "সব বিভাগ";
  divisionFilter.appendChild(defaultOption);

  divisions.forEach((division, index) => {
    const name = getName(division);
    const option = document.createElement("option");

    option.value = name;
    option.textContent = name;
    divisionFilter.appendChild(option);

    const districtCount = (division.districts || []).length;

    const card = makeCard(
      name,
      "বাংলাদেশ",
      `${districtCount}টি জেলা`,
      ["🗺️", "🌿", "🏞️", "🌊"][index % 4],
      () => {
        activeDivision = name;
        activeDistrict = "";
        searchInput.value = "";
        divisionFilter.value = name;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    divisionGrid.appendChild(card);
  });
}

/* ---------------------------------
   জেলা ও উপজেলা দেখানো
---------------------------------- */

function renderAreas(query = "") {
  districtGrid.replaceChildren();

  const term = normalizeText(query);
  let results = [];

  if (term) {
    const matchingDistricts = allDistricts
      .filter((item) =>
        normalizeText(
          item.areaName + " " + item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "জেলা" }));

    const matchingUpazilas = allUpazilas
      .filter((item) =>
        normalizeText(
          item.areaName + " " +
          item.districtName + " " +
          item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "উপজেলা" }));

    results = [...matchingDistricts, ...matchingUpazilas];

  } else if (activeDistrict) {
    results = allUpazilas
      .filter((item) => item.districtName === activeDistrict)
      .map((item) => ({ ...item, type: "উপজেলা" }));

  } else {
    results = allDistricts
      .filter((item) =>
        !activeDivision || item.divisionName === activeDivision
      )
      .map((item) => ({ ...item, type: "জেলা" }));
  }

  districtHeading.textContent = term
    ? "সার্চের ফলাফল"
    : activeDistrict
      ? activeDistrict + " উপজেলার তালিকা"
      : activeDivision
        ? activeDivision + " বিভাগের জেলাগুলো"
        : "বাংলাদেশের জেলাগুলো";

  emptyState.hidden = results.length > 0;

  if (!results.length) {
    districtGrid.appendChild(
      makeElement(
        "div",
        "empty",
        "কোনো এলাকা পাওয়া যায়নি। নামের বানান পরীক্ষা করুন।"
      )
    );
    return;
  }

  results.forEach((item, index) => {
    const isUpazila = item.type === "উপজেলা";
    const info = getInfo(item.areaName);

    const subtitle = isUpazila
      ? `${item.districtName} জেলা • ${item.divisionName} বিভাগ`
      : `${item.divisionName} বিভাগ`;

    const description = info?.intro ||
      `${item.areaName} ${item.type}। বিস্তারিত পরিচিতি ও ইতিহাস পর্যায়ক্রমে যোগ করা হবে।`;

    const card = makeCard(
      item.areaName,
      subtitle,
      description,
      ["📍", "🏛️", "🌿", "🌊"][index % 4],
      () => showAreaDetails(item, item.type),
      isUpazila ? null : "উপজেলা দেখুন",
      isUpazila ? null : () => {
        activeDistrict = item.areaName;
        activeDivision = item.divisionName;
        searchInput.value = "";
        divisionFilter.value = activeDivision;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    districtGrid.appendChild(card);
  });
}

/* ---------------------------------
   সার্চ ও নিয়ন্ত্রণ
---------------------------------- */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  activeDivision = "";
  activeDistrict = "";
  divisionFilter.value = "";

  renderAreas(searchInput.value);

  $("explore").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeDivision = "";
    activeDistrict = "";
    divisionFilter.value = "";
    renderAreas();
  }
});

divisionFilter.addEventListener("change", () => {
  activeDivision = divisionFilter.value;
  activeDistrict = "";
  searchInput.value = "";
  renderAreas();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  divisionFilter.value = "";
  activeDivision = "";
  activeDistrict = "";
  renderAreas();
});

dialogClose.addEventListener("click", () => {
  areaDialog.close();
});

areaDialog.addEventListener("click", (event) => {
  if (event.target === areaDialog) {
    areaDialog.close();
  }
});

/* ---------------------------------
   ওয়েবসাইট চালু
---------------------------------- */

async function init() {
  $("year").textContent = new Date().getFullYear();

  showStatus("বাংলাদেশের এলাকার তথ্য লোড হচ্ছে...");

  try {
    const response = await fetch(GEO_URL);

    if (!response.ok) {
      throw new Error("API response: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("API-তে প্রত্যাশিত বিভাগ-জেলার ডেটা নেই");
    }

    divisions = data;
    buildAreaData();

    if (!allDistricts.length) {
      throw new Error("API-র ডেটার কাঠামো প্রত্যাশিত নয়");
    }

    renderDivisions();
    renderAreas();

  } catch (error) {
    console.error("আমার এলাকা:", error);

    showStatus(
      "এলাকার তালিকা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন। পরে আবার চেষ্টা করুন।"
    );
  }
}

init();/* ======================================================
   আমার এলাকা — Complete app.js
   বিভাগ, জেলা, উপজেলা, সার্চ ও এলাকার বিস্তারিত
   ====================================================== */

const GEO_URL =
  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

const $ = (id) => document.getElementById(id);

const divisionGrid = $("divisionGrid");
const districtGrid = $("districtGrid");
const divisionFilter = $("divisionFilter");
const districtHeading = $("districtHeading");
const emptyState = $("emptyState");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const areaDialog = $("areaDialog");
const dialogContent = $("dialogContent");
const dialogClose = $("dialogClose");

let divisions = [];
let allDistricts = [];
let allUpazilas = [];
let activeDivision = "";
let activeDistrict = "";

/* ---------------------------------
   যাচাইযোগ্য পরিচিতি যোগ করার ডেটা
   নামগুলো API-র বাংলা নামের সঙ্গে
   মিলিয়ে রাখা হয়েছে।
---------------------------------- */

const AREA_INFO = {
  "কক্সবাজার": {
    type: "জেলা",
    intro:
      "কক্সবাজার বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলে বঙ্গোপসাগরের তীরে অবস্থিত চট্টগ্রাম বিভাগের একটি উপকূলীয় জেলা। দীর্ঘ প্রাকৃতিক সমুদ্রসৈকত, উপকূলীয় পরিবেশ, মৎস্যসম্পদ ও পর্যটনের জন্য জেলাটি পরিচিত।",
    history:
      "কক্সবাজারের নাম ব্রিটিশ আমলের কর্মকর্তা ক্যাপ্টেন হিরাম কক্সের নামের সঙ্গে যুক্ত। তিনি আঠারো শতকের শেষ দিকে এ অঞ্চলে কাজ করেন। তাঁর স্মৃতির সঙ্গে এলাকার নামের ইতিহাস সম্পর্কিত।",
    places: [
      "কক্সবাজার সমুদ্রসৈকত",
      "হিমছড়ি",
      "ইনানী সমুদ্রসৈকত",
      "মহেশখালী",
      "রামু"
    ],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ, সামুদ্রিক বাণিজ্য, স্থানীয় খাবার এবং বিভিন্ন সম্প্রদায়ের ঐতিহ্য এ জেলার সংস্কৃতির অংশ।",
    people:
      "ক্যাপ্টেন হিরাম কক্স জেলার নামের ইতিহাসের সঙ্গে বিশেষভাবে যুক্ত। অন্য ব্যক্তিত্বের জীবনী প্রকাশের আগে নির্ভরযোগ্য জীবনীমূলক সূত্র যাচাই করা উচিত।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "চট্টগ্রাম": {
    type: "জেলা",
    intro:
      "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা। কর্ণফুলী নদী, সমুদ্রবন্দর, পাহাড় ও উপকূলীয় ভূপ্রকৃতি এই অঞ্চলের ভৌগোলিক ও অর্থনৈতিক পরিচয়ের অংশ।",
    history:
      "চট্টগ্রাম দীর্ঘকাল ধরে সমুদ্রবাণিজ্য ও আঞ্চলিক যোগাযোগের গুরুত্বপূর্ণ কেন্দ্র। বিভিন্ন সময়ে আরব বণিক, পর্তুগিজ বণিক ও অন্যান্য আঞ্চলিক শক্তির সঙ্গে এ অঞ্চলের যোগাযোগ ছিল। ব্রিটিশ আমলেও বন্দর ও বাণিজ্যের গুরুত্ব বৃদ্ধি পায়।",
    places: [
      "পতেঙ্গা সমুদ্রসৈকত",
      "ফয়েজ লেক",
      "সীতাকুণ্ড",
      "চন্দ্রনাথ পাহাড়",
      "কর্ণফুলী নদী"
    ],
    culture:
      "চট্টগ্রামের আঞ্চলিক ভাষা, মেজবান, সামুদ্রিক খাবার, বাণিজ্যিক ঐতিহ্য ও বহুমাত্রিক সাংস্কৃতিক জীবন এ জেলার পরিচয়ের অংশ।",
    people:
      "চট্টগ্রাম বহু ঐতিহাসিক ও সাংস্কৃতিক ব্যক্তিত্বের জন্মস্থান বা কর্মক্ষেত্র। প্রত্যেক ব্যক্তির নাম, অবদান ও সময়কাল প্রকাশের আগে নির্ভরযোগ্য জীবনী দিয়ে যাচাই করা দরকার।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "রাঙ্গামাটি": {
    type: "জেলা",
    intro:
      "রাঙ্গামাটি বাংলাদেশের পার্বত্য চট্টগ্রামের একটি জেলা। পাহাড়, কাপ্তাই হ্রদ ও বিভিন্ন ক্ষুদ্র নৃগোষ্ঠীর সংস্কৃতির জন্য অঞ্চলটি পরিচিত।",
    history:
      "পার্বত্য চট্টগ্রামের ইতিহাসে বিভিন্ন পাহাড়ি জনগোষ্ঠীর সমাজ, ঐতিহ্য, প্রশাসনিক পরিবর্তন ও কাপ্তাই বাঁধ নির্মাণের গুরুত্বপূর্ণ প্রভাব রয়েছে।",
    places: ["কাপ্তাই হ্রদ", "ঝুলন্ত সেতু", "শুভলং জলপ্রপাত"],
    culture:
      "চাকমা, মারমা ও অন্যান্য জনগোষ্ঠীর ভাষা, পোশাক, হস্তশিল্প ও উৎসব এ অঞ্চলের সাংস্কৃতিক বৈচিত্র্য তুলে ধরে।",
    source: "https://rangamati.gov.bd/",
    sourceLabel: "রাঙ্গামাটি জেলা প্রশাসন"
  },

  "বান্দরবান": {
    type: "জেলা",
    intro:
      "বান্দরবান পার্বত্য চট্টগ্রামের একটি পাহাড়ি জেলা। পাহাড়, বন, নদী এবং বিভিন্ন জাতিগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার পরিচিত বৈশিষ্ট্য।",
    history:
      "বান্দরবানের ইতিহাস পার্বত্য অঞ্চলের বিভিন্ন জনগোষ্ঠীর বসতি, সামাজিক ঐতিহ্য এবং প্রশাসনিক বিবর্তনের সঙ্গে সম্পর্কিত।",
    places: ["নীলাচল", "মেঘলা পর্যটন এলাকা", "সাঙ্গু নদী"],
    culture:
      "মারমা, ম্রো, ত্রিপুরা ও অন্যান্য জনগোষ্ঠীর সাংস্কৃতিক ঐতিহ্য এ জেলার বৈচিত্র্যের গুরুত্বপূর্ণ অংশ।",
    source: "https://bandarban.gov.bd/",
    sourceLabel: "বান্দরবান জেলা প্রশাসন"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    intro: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    history:
      "রাউজানের পূর্ণাঙ্গ স্থানীয় ইতিহাস, নামের উৎপত্তি ও ঐতিহাসিক ঘটনাবলির বিবরণ প্রকাশের আগে সরকারি ও প্রামাণ্য স্থানীয় সূত্র যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "স্থানীয় ঐতিহ্য, শিক্ষা, সামাজিক প্রতিষ্ঠান ও সংস্কৃতি সম্পর্কে নির্ভরযোগ্য তথ্য সংগ্রহ করে এখানে যোগ করা যাবে।",
    source: "https://chittagong.gov.bd/",
    sourceLabel: "চট্টগ্রাম জেলা প্রশাসন"
  },

  "চকরিয়া": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro: "চকরিয়া কক্সবাজার জেলার একটি উপজেলা।",
    history:
      "চকরিয়ার স্থানীয় ইতিহাস ও প্রশাসনিক বিবর্তনের বিস্তারিত বিবরণ প্রকাশের আগে সরকারি উপজেলা ও জেলা প্রশাসনের তথ্য যাচাই করা প্রয়োজন।",
    places: [],
    culture:
      "চকরিয়ার স্থানীয় জীবনযাত্রা, কৃষি, বাণিজ্য ও সংস্কৃতি সম্পর্কে যাচাইকৃত তথ্য এখানে যোগ করা যাবে।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "টেকনাফ": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "টেকনাফ কক্সবাজার জেলার দক্ষিণ প্রান্তের একটি উপকূলীয় উপজেলা, যা নাফ নদী ও মিয়ানমার সীমান্তবর্তী ভৌগোলিক অবস্থানের জন্য পরিচিত।",
    history:
      "টেকনাফের ইতিহাস উপকূলীয় বসতি, নাফ নদীকেন্দ্রিক যোগাযোগ, মৎস্যসম্পদ ও সীমান্তবর্তী জনজীবনের সঙ্গে সম্পর্কিত।",
    places: ["নাফ নদীর মোহনা", "শাহপরীর দ্বীপের উপকূল"],
    culture:
      "উপকূলীয় জীবন, মৎস্য আহরণ এবং স্থানীয় জনগোষ্ঠীর ঐতিহ্য এখানকার জীবনযাত্রার অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  },

  "মহেশখালী": {
    type: "উপজেলা",
    district: "কক্সবাজার",
    intro:
      "মহেশখালী কক্সবাজার জেলার একটি দ্বীপ উপজেলা। উপকূলীয় প্রকৃতি, পাহাড় ও স্থানীয় ধর্মীয়-সাংস্কৃতিক ঐতিহ্যের জন্য এটি পরিচিত।",
    history:
      "মহেশখালীর ইতিহাস দ্বীপভিত্তিক জনবসতি, উপকূলীয় বাণিজ্য এবং স্থানীয় ধর্মীয় ও সামাজিক ঐতিহ্যের সঙ্গে সম্পর্কিত।",
    places: ["আদিনাথ মন্দির", "মহেশখালীর উপকূল"],
    culture:
      "দ্বীপের স্থানীয় জীবনযাত্রা, মাছ ধরা, লবণ উৎপাদন এবং ধর্মীয় ঐতিহ্য এখানকার সংস্কৃতির অংশ।",
    source: "https://coxsbazar.gov.bd/",
    sourceLabel: "কক্সবাজার জেলা প্রশাসন"
  }
};

/* ---------------------------------
   সাধারণ সহায়ক ফাংশন
---------------------------------- */

function getName(item) {
  return item?.bn_name || item?.name || "";
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("bn")
    .replace(/\s+/g, " ");
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

function showStatus(message) {
  districtGrid.replaceChildren();
  districtGrid.appendChild(
    makeElement("div", "empty-state", message)
  );
}

function getInfo(name) {
  if (AREA_INFO[name]) return AREA_INFO[name];

  const normalized = normalizeText(name);
  const key = Object.keys(AREA_INFO).find(
    (item) => normalizeText(item) === normalized
  );

  return key ? AREA_INFO[key] : null;
}

/* ---------------------------------
   বিস্তারিত তথ্য দেখানো
---------------------------------- */

function openDetails(title, lines, sourceUrl, sourceLabel) {
  dialogContent.replaceChildren();

  dialogContent.appendChild(
    makeElement("h2", "", title)
  );

  lines.filter(Boolean).forEach((line) => {
    dialogContent.appendChild(
      makeElement("p", "", line)
    );
  });

  if (sourceUrl) {
    const link = makeElement(
      "a",
      "button-primary",
      sourceLabel || "তথ্যের উৎস দেখুন"
    );

    link.href = sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    dialogContent.appendChild(link);
  }

  if (typeof areaDialog.showModal === "function") {
    areaDialog.showModal();
  } else {
    alert(title + "\n\n" + lines.filter(Boolean).join("\n\n"));
  }
}

function showAreaDetails(item, type) {
  const info = getInfo(item.areaName);

  if (!info) {
    openDetails(
      item.areaName,
      [
        "ধরন: " + type,
        item.districtName ? "জেলা: " + item.districtName : "",
        item.divisionName ? "বিভাগ: " + item.divisionName : "",
        "এই এলাকার বিস্তারিত ইতিহাস, দর্শনীয় স্থান ও গুরুত্বপূর্ণ ব্যক্তিত্বের তথ্য এখনো এই ওয়েবসাইটে যোগ করা হয়নি।",
        "সঠিক তথ্য প্রকাশের জন্য সরকারি নথি ও নির্ভরযোগ্য ঐতিহাসিক সূত্র যাচাই করা হবে।"
      ],
      item.divisionName === "চট্টগ্রাম"
        ? "https://chittagongdiv.gov.bd/"
        : "https://bangladesh.gov.bd/",
      "সরকারি তথ্যসূত্র"
    );
    return;
  }

  const lines = [
    "ধরন: " + (info.type || type),
    info.district ? "জেলা: " + info.district : "",
    item.divisionName ? "বিভাগ: " + item.divisionName : "",
    "",
    "পরিচিতি",
    info.intro || "",
    "",
    "ইতিহাস",
    info.history || "",
    "",
    "দর্শনীয় স্থান",
    info.places?.length
      ? info.places.join(" • ")
      : "দর্শনীয় স্থানের যাচাইকৃত তালিকা এখনো যোগ করা হয়নি।",
    "",
    "সংস্কৃতি ও ঐতিহ্য",
    info.culture || "",
    info.people ? "\nঐতিহাসিক ব্যক্তিত্ব\n" + info.people : ""
  ];

  openDetails(
    item.areaName,
    lines,
    info.source,
    info.sourceLabel
  );
}

/* ---------------------------------
   কার্ড তৈরি
---------------------------------- */

function makeCard(title, subtitle, description, icon, action, secondLabel, secondAction) {
  const card = makeElement("article", "place-card");
  const heading = makeElement("div", "card-title");
  const symbol = makeElement("div", "place-icon", icon);
  const textBox = document.createElement("div");

  textBox.appendChild(makeElement("h3", "", title));
  textBox.appendChild(makeElement("p", "location", subtitle));

  heading.append(symbol, textBox);

  card.appendChild(heading);
  card.appendChild(
    makeElement("p", "description", description)
  );

  const primary = makeElement(
    "button",
    "button-secondary",
    "বিস্তারিত পড়ুন"
  );
  primary.type = "button";
  primary.addEventListener("click", action);
  card.appendChild(primary);

  if (secondLabel && secondAction) {
    const secondary = makeElement(
      "button",
      "button-secondary",
      secondLabel
    );
    secondary.type = "button";
    secondary.style.marginTop = "8px";
    secondary.addEventListener("click", secondAction);
    card.appendChild(secondary);
  }

  return card;
}

/* ---------------------------------
   API ডেটা প্রস্তুত করা
---------------------------------- */

function buildAreaData() {
  allDistricts = [];
  allUpazilas = [];

  divisions.forEach((division) => {
    const divisionName = getName(division);

    (division.districts || []).forEach((district) => {
      const districtName = getName(district);

      allDistricts.push({
        ...district,
        areaName: districtName,
        divisionName
      });

      (district.upazilas || []).forEach((upazila) => {
        allUpazilas.push({
          ...upazila,
          areaName: getName(upazila),
          districtName,
          divisionName
        });
      });
    });
  });
}

/* ---------------------------------
   বিভাগ দেখানো
---------------------------------- */

function renderDivisions() {
  divisionGrid.replaceChildren();
  divisionFilter.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "সব বিভাগ";
  divisionFilter.appendChild(defaultOption);

  divisions.forEach((division, index) => {
    const name = getName(division);
    const option = document.createElement("option");

    option.value = name;
    option.textContent = name;
    divisionFilter.appendChild(option);

    const districtCount = (division.districts || []).length;

    const card = makeCard(
      name,
      "বাংলাদেশ",
      `${districtCount}টি জেলা`,
      ["🗺️", "🌿", "🏞️", "🌊"][index % 4],
      () => {
        activeDivision = name;
        activeDistrict = "";
        searchInput.value = "";
        divisionFilter.value = name;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    divisionGrid.appendChild(card);
  });
}

/* ---------------------------------
   জেলা ও উপজেলা দেখানো
---------------------------------- */

function renderAreas(query = "") {
  districtGrid.replaceChildren();

  const term = normalizeText(query);
  let results = [];

  if (term) {
    const matchingDistricts = allDistricts
      .filter((item) =>
        normalizeText(
          item.areaName + " " + item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "জেলা" }));

    const matchingUpazilas = allUpazilas
      .filter((item) =>
        normalizeText(
          item.areaName + " " +
          item.districtName + " " +
          item.divisionName
        ).includes(term)
      )
      .map((item) => ({ ...item, type: "উপজেলা" }));

    results = [...matchingDistricts, ...matchingUpazilas];

  } else if (activeDistrict) {
    results = allUpazilas
      .filter((item) => item.districtName === activeDistrict)
      .map((item) => ({ ...item, type: "উপজেলা" }));

  } else {
    results = allDistricts
      .filter((item) =>
        !activeDivision || item.divisionName === activeDivision
      )
      .map((item) => ({ ...item, type: "জেলা" }));
  }

  districtHeading.textContent = term
    ? "সার্চের ফলাফল"
    : activeDistrict
      ? activeDistrict + " উপজেলার তালিকা"
      : activeDivision
        ? activeDivision + " বিভাগের জেলাগুলো"
        : "বাংলাদেশের জেলাগুলো";

  emptyState.hidden = results.length > 0;

  if (!results.length) {
    districtGrid.appendChild(
      makeElement(
        "div",
        "empty",
        "কোনো এলাকা পাওয়া যায়নি। নামের বানান পরীক্ষা করুন।"
      )
    );
    return;
  }

  results.forEach((item, index) => {
    const isUpazila = item.type === "উপজেলা";
    const info = getInfo(item.areaName);

    const subtitle = isUpazila
      ? `${item.districtName} জেলা • ${item.divisionName} বিভাগ`
      : `${item.divisionName} বিভাগ`;

    const description = info?.intro ||
      `${item.areaName} ${item.type}। বিস্তারিত পরিচিতি ও ইতিহাস পর্যায়ক্রমে যোগ করা হবে।`;

    const card = makeCard(
      item.areaName,
      subtitle,
      description,
      ["📍", "🏛️", "🌿", "🌊"][index % 4],
      () => showAreaDetails(item, item.type),
      isUpazila ? null : "উপজেলা দেখুন",
      isUpazila ? null : () => {
        activeDistrict = item.areaName;
        activeDivision = item.divisionName;
        searchInput.value = "";
        divisionFilter.value = activeDivision;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    districtGrid.appendChild(card);
  });
}

/* ---------------------------------
   সার্চ ও নিয়ন্ত্রণ
---------------------------------- */

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  activeDivision = "";
  activeDistrict = "";
  divisionFilter.value = "";

  renderAreas(searchInput.value);

  $("explore").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeDivision = "";
    activeDistrict = "";
    divisionFilter.value = "";
    renderAreas();
  }
});

divisionFilter.addEventListener("change", () => {
  activeDivision = divisionFilter.value;
  activeDistrict = "";
  searchInput.value = "";
  renderAreas();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  divisionFilter.value = "";
  activeDivision = "";
  activeDistrict = "";
  renderAreas();
});

dialogClose.addEventListener("click", () => {
  areaDialog.close();
});

areaDialog.addEventListener("click", (event) => {
  if (event.target === areaDialog) {
    areaDialog.close();
  }
});

/* ---------------------------------
   ওয়েবসাইট চালু
---------------------------------- */

async function init() {
  $("year").textContent = new Date().getFullYear();

  showStatus("বাংলাদেশের এলাকার তথ্য লোড হচ্ছে...");

  try {
    const response = await fetch(GEO_URL);

    if (!response.ok) {
      throw new Error("API response: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("API-তে প্রত্যাশিত বিভাগ-জেলার ডেটা নেই");
    }

    divisions = data;
    buildAreaData();

    if (!allDistricts.length) {
      throw new Error("API-র ডেটার কাঠামো প্রত্যাশিত নয়");
    }

    renderDivisions();
    renderAreas();

  } catch (error) {
    console.error("আমার এলাকা:", error);

    showStatus(
      "এলাকার তালিকা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন। পরে আবার চেষ্টা করুন।"
    );
  }
}

init();const GEO_URL = 
const AREA_INFO = history: "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা ও বন্দরনগরী।",
    places: ["পতেঙ্গা সমুদ্রসৈকত", "ফয়েজ লেক"],
    culture: "এ অঞ্চলের ভাষা, খাবার, ঐতিহ্য ও সমুদ্রকেন্দ্রিক জীবনযাত্রা বিশেষভাবে পরিচিত।"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    history: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    places: ["স্থানীয় ঐতিহাসিক স্থাপনা", "স্থানীয় প্রাকৃতিক পরিবেশ"],
    culture: "এলাকার স্থানীয় ঐতিহ্য, সংস্কৃতি ও পরিচ
    
};

  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

const $ = (id) => document.getElementById(id);

const divisionGrid = $("divisionGrid");
const districtGrid = $("districtGrid");
const divisionFilter = $("divisionFilter");
const districtHeading = $("districtHeading");
const emptyState = $("emptyState");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const areaDialog = $("areaDialog");
const dialogContent = $("dialogContent");
const dialogClose = $("dialogClose");

let divisions = [];
let allDistricts = [];
let allUpazilas = [];
let activeDivision = "";
let activeDistrict = "";

const icons = ["📍", "🏞️", "🏛️", "🌿", "🌊", "🏘️"];

function showStatus(message) {
  districtGrid.innerHTML = "";
  const box = document.createElement("div");
  box.className = "empty-state";
  box.textContent = message;
  districtGrid.appendChild(box);
}

function getName(item) {
  return item?.bn_name || item?.name || "নাম পাওয়া যায়নি";
}

function makeCard(title, subtitle, description, icon, action) {
  const card = document.createElement("article");
  card.className = "place-card";

  const heading = document.createElement("div");
  heading.className = "card-title";

  const symbol = document.createElement("div");
  symbol.className = "place-icon";
  symbol.textContent = icon;

  const textBox = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = title;

  const location = document.createElement("p");
  location.className = "location";
  location.textContent = subtitle;

  textBox.append(h3, location);
  heading.append(symbol, textBox);

  const desc = document.createElement("p");
  desc.className = "description";
  desc.textContent = description;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "button-secondary";
  button.textContent = "বিস্তারিত দেখুন";
  button.addEventListener("click", action);

  card.append(heading, desc, button);
  return card;
}

function openDetails(title, lines) {
  dialogContent.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = title;
  dialogContent.appendChild(heading);

  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    dialogContent.appendChild(p);
  });

  if (typeof areaDialog.showModal === "function") {
    areaDialog.showModal();
  } else {
    alert(title + "\n\n" + lines.join("\n"));
  }
}

function renderDivisions() {
  divisionGrid.replaceChildren();
  divisionFilter.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "সব বিভাগ";
  divisionFilter.appendChild(defaultOption);

  divisions.forEach((division, index) => {
    const name = getName(division);

    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    divisionFilter.appendChild(option);

    const count = Array.isArray(division.districts)
      ? division.districts.length
      : 0;

    const card = makeCard(
      name,
      "বাংলাদেশ",
      `${count}টি জেলা তালিকাভুক্ত`,
      icons[index % icons.length],
      () => {
        activeDivision = name;
        activeDistrict = "";
        divisionFilter.value = name;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    divisionGrid.appendChild(card);
  });
}

function buildAreaData() {
  allDistricts = [];
  allUpazilas = [];

  divisions.forEach((division) => {
    const divisionName = getName(division);

    (division.districts || []).forEach((district) => {
      const districtName = getName(district);

      allDistricts.push({
        ...district,
        areaName: districtName,
        divisionName
      });

      (district.upazilas || []).forEach((upazila) => {
        allUpazilas.push({
          ...upazila,
          areaName: getName(upazila),
          districtName,
          divisionName
        });
      });
    });
  });
}

function renderAreas(query = "") {
  districtGrid.replaceChildren();

  const term = query.trim().toLocaleLowerCase("bn");
  let results = [];

  if (term) {
    results = [
      ...allDistricts.filter((item) =>
        `${item.areaName} ${item.name || ""} ${item.divisionName}`
          .toLocaleLowerCase("bn")
          .includes(term)
      ).map((item) => ({ ...item, type: "জেলা" })),

      ...allUpazilas.filter((item) =>
        `${item.areaName} ${item.name || ""} ${item.districtName} ${item.divisionName}`
          .toLocaleLowerCase("bn")
          .includes(term)
      ).map((item) => ({ ...item, type: "উপজেলা" }))
    ];
  } else if (activeDistrict) {
    results = allUpazilas
      .filter((item) => item.districtName === activeDistrict)
      .map((item) => ({ ...item, type: "উপজেলা" }));
  } else {
    results = allDistricts
      .filter((item) =>
        !activeDivision || item.divisionName === activeDivision
      )
      .map((item) => ({ ...item, type: "জেলা" }));
  }

  districtHeading.textContent = term
    ? "সার্চের ফলাফল"
    : activeDistrict
      ? activeDistrict + " উপজেলার তালিকা"
      : activeDivision
        ? activeDivision + " বিভাগের জেলাগুলো"
        : "বাংলাদেশের জেলাগুলো";

  emptyState.hidden = results.length > 0;

  results.forEach((item, index) => {
    const isUpazila = item.type === "উপজেলা";

    const card = makeCard(
      item.areaName,
      isUpazila
        ? `${item.districtName} জেলা, ${item.divisionName} বিভাগ`
        : `${item.divisionName} বিভাগ`,
      isUpazila
        ? "এই উপজেলার স্থানীয় পরিচিতি ও তথ্য এখানে যোগ করা যাবে।"
        : "এই জেলার উপজেলা ও এলাকার পরিচিতি দেখতে ক্লিক করুন।",
      icons[index % icons.length],
      () => {
        if (isUpazila) {
          openDetails(item.areaName, [
            "ধরন: উপজেলা",
            "জেলা: " + item.districtName,
            "বিভাগ: " + item.divisionName,
            "স্থানীয় ইতিহাস, দর্শনীয় স্থান ও সূত্রের তথ্য পরে যোগ করা যাবে।"
          ]);
        } else {
          activeDistrict = item.areaName;
          activeDivision = item.divisionName;
          divisionFilter.value = activeDivision;
          renderAreas();
        }
      }
    );

    districtGrid.appendChild(card);
  });
}

async function init() {
  $("year").textContent = new Date().getFullYear();
  showStatus("বিভাগ, জেলা ও উপজেলার তথ্য লোড হচ্ছে...");

  try {
    const response = await fetch(GEO_URL);

    if (!response.ok) {
      throw new Error("তথ্য সার্ভার থেকে পাওয়া যায়নি");
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("তথ্যের তালিকা খালি");
    }

    divisions = data;
    buildAreaData();
    renderDivisions();
    renderAreas();

  } catch (error) {
    console.error("Area data loading error:", error);
    showStatus(
      "এলাকার তথ্য লোড হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করে পেজ রিফ্রেশ করুন।"
    );
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeDivision = "";
  activeDistrict = "";
  divisionFilter.value = "";
  renderAreas(searchInput.value);
  $("explore").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeDistrict = "";
    renderAreas();
  }
});

divisionFilter.addEventListener("change", () => {
  activeDivision = divisionFilter.value;
  activeDistrict = "";
  searchInput.value = "";
  renderAreas();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  divisionFilter.value = "";
  activeDivision = "";
  activeDistrict = "";
  renderAreas();
});

dialogClose.addEventListener("click", () => {
  areaDialog.close();
});

areaDialog.addEventListener("click", (event) => {
  if (event.target === areaDialog) {
    areaDialog.close();
  }
});

init();history: "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা ও বন্দরনগরী।",
    places: ["পতেঙ্গা সমুদ্রসৈকত", "ফয়েজ লেক"],
    culture: "এ অঞ্চলের ভাষা, খাবার, ঐতিহ্য ও সমুদ্রকেন্দ্রিক জীবনযাত্রা বিশেষভাবে পরিচিত।"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    history: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    places: ["স্থানীয় ঐতিহাসিক স্থাপনা", "স্থানীয় প্রাকৃতিক পরিবেশ"],
    culture: "এলাকার স্থানীয় ঐতিহ্য, সংস্কৃতি ও পরিচ"কক্সবাজার": {
  type: "জেলা",
  history: "কক্সবাজার বাংলাদেশের চট্টগ্রাম বিভাগের একটি উপকূলীয় জেলা। দীর্ঘ বালুকাময় সমুদ্রসৈকত ও প্রাকৃতিক সৌন্দর্যের জন্য জেলাটি সুপরিচিত।",
  places: [
    "কক্সবাজার সমুদ্রসৈকত",
    "হিমছড়ি",
    "ইনানী সমুদ্রসৈকত",
    "মহেশখালী",
    "সোনাদিয়া দ্বীপ"
  ],
  culture: "এ জেলার সংস্কৃতিতে উপকূলীয় জীবনযাত্রা, মৎস্যসম্পদ, স্থানীয় খাবার ও বিভিন্ন জনগোষ্ঠীর ঐতিহ্যের প্রভাব রয়েছে।"
},const info = AREA_INFO[item.areaName];

if (info) {
  openDetails(item.areaName, [
    "ধরন: " + info.type,
    info.district ? "জেলা: " + info.district : "",
    "ইতিহাস ও পরিচিতি: " + info.history,
    "দর্শনীয় স্থান: " + info.places.join(", "),
    "সংস্কৃতি: " + info.culture
  ].filter(Boolean));
} else {
  openDetails(item.areaName, [
    "এই এলাকার বিস্তারিত তথ্য এখনো যোগ করা হয়নি।"
  ]);
      }const AREA_INFO = {
  "চট্টগ্রাম": {
    type: "জেলা",
    history: "চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা ও বন্দরনগরী।",
    places: ["পতেঙ্গা সমুদ্রসৈকত", "ফয়েজ লেক"],
    culture: "এ অঞ্চলের ভাষা, খাবার, ঐতিহ্য ও সমুদ্রকেন্দ্রিক জীবনযাত্রা বিশেষভাবে পরিচিত।"
  },

  "রাউজান": {
    type: "উপজেলা",
    district: "চট্টগ্রাম",
    history: "রাউজান চট্টগ্রাম জেলার একটি উপজেলা।",
    places: ["স্থানীয় ঐতিহাসিক স্থাপনা", "স্থানীয় প্রাকৃতিক পরিবেশ"],
    culture: "এলাকার স্থানীয় ঐতিহ্য, সংস্কৃতি ও পরিচিত ব্যক্তিদের তথ্য এখানে যোগ করা যাবে।"
  }
};আমার এলাকা বাংলাদেশের একটি তথ্যভিত্তিক ওয়েবসাইট, যেখানে দেশের ৮টি বিভাগ, ৬৪টি জেলা, উপজেলা এবং বিভিন্ন এলাকার পরিচিতি সহজে খুঁজে পাওয়া যাবে। এখানে এলাকার ইতিহাস, নামের উৎপত্তি, সংস্কৃতি, দর্শনীয় স্থান, স্থানীয় ঐতিহ্য ও গুরুত্বপূর্ণ তথ্য তুলে ধরার লক্ষ্য রয়েছে। ব্যবহারকারীরা এলাকার নাম লিখে সার্চ করতে পারবেন এবং বিভাগ অনুযায়ী বিভিন্ন জেলা ও উপজেলা সম্পর্কে জানতে পারবেন।const GEO_URL =
  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

const $ = (id) => document.getElementById(id);

const divisionGrid = $("divisionGrid");
const districtGrid = $("districtGrid");
const divisionFilter = $("divisionFilter");
const districtHeading = $("districtHeading");
const emptyState = $("emptyState");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const areaDialog = $("areaDialog");
const dialogContent = $("dialogContent");
const dialogClose = $("dialogClose");

let divisions = [];
let allDistricts = [];
let allUpazilas = [];
let activeDivision = "";
let activeDistrict = "";

const icons = ["📍", "🏞️", "🏛️", "🌿", "🌊", "🏘️"];

function showStatus(message) {
  districtGrid.innerHTML = "";
  const box = document.createElement("div");
  box.className = "empty-state";
  box.textContent = message;
  districtGrid.appendChild(box);
}

function getName(item) {
  return item?.bn_name || item?.name || "নাম পাওয়া যায়নি";
}

function makeCard(title, subtitle, description, icon, action) {
  const card = document.createElement("article");
  card.className = "place-card";

  const heading = document.createElement("div");
  heading.className = "card-title";

  const symbol = document.createElement("div");
  symbol.className = "place-icon";
  symbol.textContent = icon;

  const textBox = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = title;

  const location = document.createElement("p");
  location.className = "location";
  location.textContent = subtitle;

  textBox.append(h3, location);
  heading.append(symbol, textBox);

  const desc = document.createElement("p");
  desc.className = "description";
  desc.textContent = description;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "button-secondary";
  button.textContent = "বিস্তারিত দেখুন";
  button.addEventListener("click", action);

  card.append(heading, desc, button);
  return card;
}

function openDetails(title, lines) {
  dialogContent.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = title;
  dialogContent.appendChild(heading);

  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    dialogContent.appendChild(p);
  });

  if (typeof areaDialog.showModal === "function") {
    areaDialog.showModal();
  } else {
    alert(title + "\n\n" + lines.join("\n"));
  }
}

function renderDivisions() {
  divisionGrid.replaceChildren();
  divisionFilter.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "সব বিভাগ";
  divisionFilter.appendChild(defaultOption);

  divisions.forEach((division, index) => {
    const name = getName(division);

    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    divisionFilter.appendChild(option);

    const count = Array.isArray(division.districts)
      ? division.districts.length
      : 0;

    const card = makeCard(
      name,
      "বাংলাদেশ",
      `${count}টি জেলা তালিকাভুক্ত`,
      icons[index % icons.length],
      () => {
        activeDivision = name;
        activeDistrict = "";
        divisionFilter.value = name;
        renderAreas();
        $("explore").scrollIntoView({ behavior: "smooth" });
      }
    );

    divisionGrid.appendChild(card);
  });
}

function buildAreaData() {
  allDistricts = [];
  allUpazilas = [];

  divisions.forEach((division) => {
    const divisionName = getName(division);

    (division.districts || []).forEach((district) => {
      const districtName = getName(district);

      allDistricts.push({
        ...district,
        areaName: districtName,
        divisionName
      });

      (district.upazilas || []).forEach((upazila) => {
        allUpazilas.push({
          ...upazila,
          areaName: getName(upazila),
          districtName,
          divisionName
        });
      });
    });
  });
}

function renderAreas(query = "") {
  districtGrid.replaceChildren();

  const term = query.trim().toLocaleLowerCase("bn");
  let results = [];

  if (term) {
    results = [
      ...allDistricts.filter((item) =>
        `${item.areaName} ${item.name || ""} ${item.divisionName}`
          .toLocaleLowerCase("bn")
          .includes(term)
      ).map((item) => ({ ...item, type: "জেলা" })),

      ...allUpazilas.filter((item) =>
        `${item.areaName} ${item.name || ""} ${item.districtName} ${item.divisionName}`
          .toLocaleLowerCase("bn")
          .includes(term)
      ).map((item) => ({ ...item, type: "উপজেলা" }))
    ];
  } else if (activeDistrict) {
    results = allUpazilas
      .filter((item) => item.districtName === activeDistrict)
      .map((item) => ({ ...item, type: "উপজেলা" }));
  } else {
    results = allDistricts
      .filter((item) =>
        !activeDivision || item.divisionName === activeDivision
      )
      .map((item) => ({ ...item, type: "জেলা" }));
  }

  districtHeading.textContent = term
    ? "সার্চের ফলাফল"
    : activeDistrict
      ? activeDistrict + " উপজেলার তালিকা"
      : activeDivision
        ? activeDivision + " বিভাগের জেলাগুলো"
        : "বাংলাদেশের জেলাগুলো";

  emptyState.hidden = results.length > 0;

  results.forEach((item, index) => {
    const isUpazila = item.type === "উপজেলা";

    const card = makeCard(
      item.areaName,
      isUpazila
        ? `${item.districtName} জেলা, ${item.divisionName} বিভাগ`
        : `${item.divisionName} বিভাগ`,
      isUpazila
        ? "এই উপজেলার স্থানীয় পরিচিতি ও তথ্য এখানে যোগ করা যাবে।"
        : "এই জেলার উপজেলা ও এলাকার পরিচিতি দেখতে ক্লিক করুন।",
      icons[index % icons.length],
      () => {
        if (isUpazila) {
          openDetails(item.areaName, [
            "ধরন: উপজেলা",
            "জেলা: " + item.districtName,
            "বিভাগ: " + item.divisionName,
            "স্থানীয় ইতিহাস, দর্শনীয় স্থান ও সূত্রের তথ্য পরে যোগ করা যাবে।"
          ]);
        } else {
          activeDistrict = item.areaName;
          activeDivision = item.divisionName;
          divisionFilter.value = activeDivision;
          renderAreas();
        }
      }
    );

    districtGrid.appendChild(card);
  });
}

async function init() {
  $("year").textContent = new Date().getFullYear();
  showStatus("বিভাগ, জেলা ও উপজেলার তথ্য লোড হচ্ছে...");

  try {
    const response = await fetch(GEO_URL);

    if (!response.ok) {
      throw new Error("তথ্য সার্ভার থেকে পাওয়া যায়নি");
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("তথ্যের তালিকা খালি");
    }

    divisions = data;
    buildAreaData();
    renderDivisions();
    renderAreas();

  } catch (error) {
    console.error("Area data loading error:", error);
    showStatus(
      "এলাকার তথ্য লোড হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করে পেজ রিফ্রেশ করুন।"
    );
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeDivision = "";
  activeDistrict = "";
  divisionFilter.value = "";
  renderAreas(searchInput.value);
  $("explore").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeDistrict = "";
    renderAreas();
  }
});

divisionFilter.addEventListener("change", () => {
  activeDivision = divisionFilter.value;
  activeDistrict = "";
  searchInput.value = "";
  renderAreas();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  divisionFilter.value = "";
  activeDivision = "";
  activeDistrict = "";
  renderAreas();
});

dialogClose.addEventListener("click", () => {
  areaDialog.close();
});

areaDialog.addEventListener("click", (event) => {
  if (event.target === areaDialog) {
    areaDialog.close();
  }
});

init();Extended description
