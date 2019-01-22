fetch("manny.json")
  .then(res => res.json())
  .then(data => {
    start(data);
  });

// UI element queries
const PERSON_1_NAME = ".first .general-name";
const PERSON_1_MSGS = ".first .messages .value";
const PERSON_1_WRDS = ".first .words .value";
const PERSON_1_ACTY = ".first .activity .value";
const PERSON_2_NAME = ".second .general-name";
const PERSON_2_MSGS = ".second .messages .value";
const PERSON_2_WRDS = ".second .words .value";
const PERSON_2_ACTY = ".second .activity .value";

function start(data) {
  const person1 = data.participants[0].name;
  const person2 = data.participants[1].name;

  d3.select(PERSON_1_NAME).text(person1);
  d3.select(PERSON_2_NAME).text(person2);

  // var functions is object with util functions;
  const messages = data.messages;
  const separated = functions.groupBy(messages, "sender_name");

  const a = separated[person1]; // person 1
  const b = separated[person2]; // person 2

  const aDaysObj = functions.groupByDay(a, "timestamp_ms");
  const bDaysObj = functions.groupByDay(b, "timestamp_ms");

  // ----------------------------------------------------------------
  // ---------------------- General section -------------------------
  // Total messages
  d3.select(PERSON_1_MSGS).text(a.length.toLocaleString());
  d3.select(PERSON_2_MSGS).text(b.length.toLocaleString());

  // Total words
  let aWords = functions.getTotalWords(a, "content");
  let bWords = functions.getTotalWords(b, "content");
  d3.select(PERSON_1_WRDS).text(aWords.toLocaleString());
  d3.select(PERSON_2_WRDS).text(bWords.toLocaleString());

  // Most active day
  let aDay = new Date(functions.mostActiveDay(aDaysObj));
  let bDay = new Date(functions.mostActiveDay(bDaysObj));
  d3.select(PERSON_1_ACTY).text(aDay.toISOString().split("T")[0]);
  d3.select(PERSON_2_ACTY).text(bDay.toISOString().split("T")[0]);
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  const years = functions.groupByYear(messages, "timestamp_ms");
  console.log(years);
  console.log(a.length);

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // CHARTS
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
    .domain([0, d3.max(Object.keys(years).map(x => years[x].length))]);

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(Object.keys(years).map(s => s))
    .padding(0.2);

  chart.append("g").call(d3.axisLeft(yScale));

  chart
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Fill bars
  chart
    .selectAll()
    .data(Object.keys(years))
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", s => xScale(s))
    .attr("y", s => yScale(years[s].length))
    .attr("height", s => height - yScale(years[s].length))
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
    .attr("y", margin / 5)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Messages Sent");

  svg
    .append("text")
    .attr("class", "label")
    .attr("x", width / 2 + margin)
    .attr("y", height + margin * 1.8)
    .attr("text-anchor", "middle")
    .text("Years");

  svg
    .append("text")
    .attr("class", "title")
    .attr("x", width / 2 + margin)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Messages sent by Year");
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
}

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
