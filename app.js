
const GEO_URL = 
const AREA_INFO = {
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

init();
