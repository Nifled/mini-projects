// UI element queries
const PERSON_1_NAME = ".first .general-name";
const PERSON_1_MSGS = ".first .messages .value";
const PERSON_1_WRDS = ".first .words .value";
const PERSON_1_ACTY = ".first .activity .value";
const PERSON_2_NAME = ".second .general-name";
const PERSON_2_MSGS = ".second .messages .value";
const PERSON_2_WRDS = ".second .words .value";
const PERSON_2_ACTY = ".second .activity .value";

fetch("manny.json")
  .then(res => res.json())
  .then(data => {
    d3.select(PERSON_1_NAME).text(data.participants[0].name);
    d3.select(PERSON_1_MSGS).text(data.participants[0].name);
    d3.select(PERSON_2_NAME).text(data.participants[1].name);
  });

const sample = [
  {
    language: "Rust",
    value: 78.9,
    color: "#000000"
  },
  {
    language: "Kotlin",
    value: 75.1,
    color: "#00a2ee"
  },
  {
    language: "Python",
    value: 88.0,
    color: "#fbcb39"
  },
  {
    language: "TypeScript",
    value: 67.0,
    color: "#007bc8"
  },
  {
    language: "Go",
    value: 65.6,
    color: "#65cedb"
  },
  {
    language: "Swift",
    value: 65.1,
    color: "#ff6e52"
  },
  {
    language: "JavaScript",
    value: 61.9,
    color: "#f9de3f"
  },
  {
    language: "C#",
    value: 60.4,
    color: "#5d2f8e"
  },
  {
    language: "F#",
    value: 59.6,
    color: "#008fc9"
  },
  {
    language: "Clojure",
    value: 59.6,
    color: "#507dca"
  }
];

const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const svg = d3.select("svg");
const chart = svg
  .append("g")
  .attr("transform", `translate(${margin}, ${margin})`);

// X and Y axis
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, 100]);

const xScale = d3
  .scaleBand()
  .range([0, width])
  .domain(sample.map(s => s.language))
  .padding(0.2);

chart.append("g").call(d3.axisLeft(yScale));

chart
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Fill bars
chart
  .selectAll()
  .data(sample)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", s => xScale(s.language))
  .attr("y", s => yScale(s.value))
  .attr("height", s => height - yScale(s.value))
  .attr("width", xScale.bandwidth());

// Grid lines - horizontal
chart
  .append("g")
  .attr("class", "grid")
  .call(
    d3
      .axisLeft()
      .scale(yScale)
      .tickSize(-width, 0, 0)
      .tickFormat("")
  );

// Labels
svg
  .append("text")
  .attr("x", -(height / 2) - margin)
  .attr("y", margin / 2.4)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Love meter (%)");

svg
  .append("text")
  .attr("class", "label")
  .attr("x", width / 2 + margin)
  .attr("y", height + margin * 1.8)
  .attr("text-anchor", "middle")
  .text("Languages");

svg
  .append("text")
  .attr("class", "title")
  .attr("x", width / 2 + margin)
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .text("Most loved programming languages in 2018");

// Interactivity
// svg
//   .on('mouseenter', function (actual, i) {
//     console.log(this)
//       // d3.select(this).attr('opacity', 0.5)
//   })
//   .on('mouseleave', function (actual, i) {
//       d3.select(this).attr('opacity', 1)
//   })

// https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
