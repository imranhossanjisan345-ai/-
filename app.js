
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
