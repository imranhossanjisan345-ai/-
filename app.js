const divisions = [
  {name:"ঢাকা", districts:["ঢাকা","গাজীপুর","গোপালগঞ্জ","কিশোরগঞ্জ","মাদারীপুর","মানিকগঞ্জ","মুন্সিগঞ্জ","নারায়ণগঞ্জ","নরসিংদী","রাজবাড়ী","শরীয়তপুর","টাঙ্গাইল","ফরিদপুর"]},
  {name:"চট্টগ্রাম", districts:["চট্টগ্রাম","কক্সবাজার","কুমিল্লা","ব্রাহ্মণবাড়িয়া","চাঁদপুর","ফেনী","লক্ষ্মীপুর","নোয়াখালী","খাগড়াছড়ি","রাঙামাটি","বান্দরবান"]},
  {name:"রাজশাহী", districts:["রাজশাহী","বগুড়া","জয়পুরহাট","নওগাঁ","নাটোর","চাঁপাইনবাবগঞ্জ","পাবনা","সিরাজগঞ্জ"]},
  {name:"খুলনা", districts:["খুলনা","বাগেরহাট","চুয়াডাঙ্গা","যশোর","ঝিনাইদহ","কুষ্টিয়া","মাগুরা","মেহেরপুর","নড়াইল","সাতক্ষীরা"]},
  {name:"বরিশাল", districts:["বরিশাল","বরগুনা","ভোলা","ঝালকাঠি","পটুয়াখালী","পিরোজপুর"]},
  {name:"সিলেট", districts:["সিলেট","হবিগঞ্জ","মৌলভীবাজার","সুনামগঞ্জ"]},
  {name:"রংপুর", districts:["রংপুর","দিনাজপুর","গাইবান্ধা","কুড়িগ্রাম","লালমনিরহাট","নীলফামারী","পঞ্চগড়","ঠাকুরগাঁও"]},
  {name:"ময়মনসিংহ", districts:["ময়মনসিংহ","জামালপুর","নেত্রকোণা","শেরপুর"]}
];

// Starter content only. Add verified upazila/union/village records to areas.json or this array.
const areaDetails = {
  "চট্টগ্রাম": {
    type:"জেলা", division:"চট্টগ্রাম",
    intro:"চট্টগ্রাম বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের একটি গুরুত্বপূর্ণ জেলা ও বন্দরনগরী। এই পৃষ্ঠাটি একটি প্রাথমিক নমুনা; প্রকাশের আগে তথ্য ও সূত্র যাচাই করে পূরণ করুন।",
    facts:[["বিভাগ","চট্টগ্রাম"],["এলাকার ধরন","জেলা"],["তথ্যের অবস্থা","প্রাথমিক নমুনা"],["যা যোগ করবেন","আয়তন, জনসংখ্যা, উপজেলা, ইতিহাস"]]
  },
  "রাউজান": {
    type:"উপজেলা", division:"চট্টগ্রাম", district:"চট্টগ্রাম",
    intro:"রাউজান চট্টগ্রাম জেলার একটি উপজেলা। স্থানীয় ইতিহাস, নামের উৎস, দর্শনীয় স্থান ও জনসংখ্যার তথ্য নির্ভরযোগ্য সূত্র দিয়ে যাচাই করে এখানে যুক্ত করা উচিত।",
    facts:[["বিভাগ","চট্টগ্রাম"],["জেলা","চট্টগ্রাম"],["এলাকার ধরন","উপজেলা"],["তথ্যের অবস্থা","প্রাথমিক নমুনা"]]
  },
  "ঢাকা": {
    type:"জেলা", division:"ঢাকা",
    intro:"ঢাকা বাংলাদেশের রাজধানী ও দেশের অন্যতম প্রধান নগরকেন্দ্র। এই সাইটে জেলা এবং ঢাকা মহানগর সম্পর্কিত তথ্য আলাদা করে স্পষ্টভাবে উল্লেখ করা উচিত।",
    facts:[["বিভাগ","ঢাকা"],["এলাকার ধরন","জেলা"],["তথ্যের অবস্থা","প্রাথমিক নমুনা"],["যা যোগ করবেন","উৎসসহ পরিসংখ্যান ও ইতিহাস"]]
  }
};

const icons = ["⌂","⌖","✦","⌁","◇","❋","◎","⌘"];
const divisionGrid = document.getElementById("divisionGrid");
const districtGrid = document.getElementById("districtGrid");
const divisionFilter = document.getElementById("divisionFilter");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("areaDialog");
const dialogContent = document.getElementById("dialogContent");
let activeQuery = "";

function normalize(value){ return (value || "").toLocaleLowerCase("bn").replace(/\s+/g," ").trim(); }
function getDivisionForDistrict(name){ return divisions.find(d => d.districts.includes(name))?.name || ""; }

function renderDivisions(){
  divisionGrid.innerHTML = "";
  divisions.forEach((division, index) => {
    const button = document.createElement("button");
    button.className = "division-card";
    button.type = "button";
    button.innerHTML = `<span class="division-symbol">${icons[index]}</span><span><strong>${division.name} বিভাগ</strong><small>${division.districts.length}টি জেলা</small></span>`;
    button.addEventListener("click", () => {
      divisionFilter.value = division.name;
      activeQuery = "";
      searchInput.value = "";
      renderDistricts();
      document.getElementById("districtHeading").textContent = `${division.name} বিভাগের জেলা`;
      document.getElementById("explore").scrollIntoView({behavior:"smooth"});
      document.getElementById("districtGrid").scrollIntoView({behavior:"smooth",block:"start"});
    });
    divisionGrid.appendChild(button);
    const option = document.createElement("option");
    option.value = division.name;
    option.textContent = `${division.name} বিভাগ`;
    divisionFilter.appendChild(option);
  });
}

function renderDistricts(){
  const selectedDivision = divisionFilter.value;
  const query = normalize(activeQuery);
  const results = [];
  divisions.forEach(division => {
    if(selectedDivision && division.name !== selectedDivision) return;
    division.districts.forEach(district => {
      const detail = areaDetails[district];
      const searchable = normalize(`${district} ${division.name} ${detail?.type || "জেলা"} ${detail?.intro || ""}`);
      if(!query || searchable.includes(query)) results.push({name:district, division:division.name, type:"জেলা"});
    });
  });
  // Include the explicitly authored upazila example in search results.
  if(!selectedDivision && (!query || normalize("রাউজান চট্টগ্রাম উপজেলা").includes(query)) && normalize("রাউজান চট্টগ্রাম উপজেলা").includes(query) && query){
    results.unshift({name:"রাউজান", division:"চট্টগ্রাম", type:"উপজেলা"});
  }
  districtGrid.innerHTML = "";
  results.forEach(area => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "district-card";
    button.innerHTML = `<span><strong>${area.name}</strong><small>${area.division} বিভাগ · ${area.type}</small></span><span class="arrow" aria-hidden="true">›</span>`;
    button.addEventListener("click", () => openArea(area.name, area.division, area.type));
    districtGrid.appendChild(button);
  });
  emptyState.hidden = results.length !== 0;
}

function openArea(name, division, type){
  const detail = areaDetails[name];
  const facts = detail?.facts || [["বিভাগ", division],["এলাকার ধরন", type],["তথ্যের অবস্থা","বিস্তারিত তথ্য এখনো যোগ করা হয়নি"],["পরবর্তী ধাপ","নির্ভরযোগ্য সূত্র দিয়ে তথ্য যাচাই ও সংযোজন"]];
  const intro = detail?.intro || `${name} এলাকার বিস্তারিত পরিচিতি এই পৃষ্ঠায় যুক্ত করা হবে। ইতিহাস, জনসংখ্যা, আয়তন, দর্শনীয় স্থান এবং স্থানীয় সংস্কৃতির তথ্য প্রকাশের আগে নির্ভরযোগ্য উৎস দিয়ে যাচাই করা প্রয়োজন।`;
  dialogContent.innerHTML = `
    <p class="dialog-kicker">আমার এলাকা · এলাকার পরিচিতি</p>
    <h2 class="dialog-title">${escapeHTML(name)}</h2>
    <p class="dialog-description">${escapeHTML(intro)}</p>
    <div class="detail-grid">${facts.map(([label,value]) => `<div class="detail-item"><strong>${escapeHTML(label)}</strong><small>${escapeHTML(value)}</small></div>`).join("")}</div>
    <p class="source-warning">তথ্য যাচাইয়ের নীতি: জনসংখ্যা ও আয়তনের মতো সংখ্যার সঙ্গে তথ্যের সাল ও মূল উৎস উল্লেখ করুন। অনুমানকে নিশ্চিত ইতিহাস হিসেবে প্রকাশ করবেন না।</p>`;
  dialog.showModal();
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  activeQuery = searchInput.value;
  divisionFilter.value = "";
  document.getElementById("districtHeading").textContent = activeQuery.trim() ? `"${activeQuery.trim()}" খোঁজার ফলাফল` : "জেলাগুলো খুঁজুন";
  renderDistricts();
  document.getElementById("explore").scrollIntoView({behavior:"smooth"});
});
searchInput.addEventListener("input", () => {
  if(!searchInput.value.trim()){
    activeQuery = "";
    document.getElementById("districtHeading").textContent = "জেলাগুলো খুঁজুন";
    renderDistricts();
  }
});
divisionFilter.addEventListener("change", () => {
  activeQuery = "";
  searchInput.value = "";
  document.getElementById("districtHeading").textContent = divisionFilter.value ? `${divisionFilter.value} বিভাগের জেলা` : "জেলাগুলো খুঁজুন";
  renderDistricts();
});
document.getElementById("clearSearch").addEventListener("click", () => {
  activeQuery = ""; searchInput.value = ""; divisionFilter.value = "";
  document.getElementById("districtHeading").textContent = "জেলাগুলো খুঁজুন";
  renderDistricts();
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if(event.target === dialog) dialog.close(); });
document.getElementById("year").textContent = new Date().getFullYear();

renderDivisions();
renderDistricts();
