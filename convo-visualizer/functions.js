// // console.log(a.slice(0, 5));

// // # of days messaged
// const days = groupByDay(a.slice(0, 100), "timestamp_ms");
// console.log(days);
// const max = mostActiveDay(days);
// console.log(new Date(max));

const functions = {
  groupBy: function(array, property) {
    return array.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  },

  groupByDay: function(array, property) {
    return array.reduce((acc, msg) => {
      let date = new Date(msg[property]);
      date.setHours(0, 0, 0, 0); // Without hr, min, ms
      let timestamp = date.getTime();
      if (!acc[timestamp]) {
        acc[timestamp] = [];
      }
      acc[timestamp].push(msg);
      return acc;
    }, {});
  },

  getTotalWords: function(array, property) {
    return array.reduce((acc, msg) => {
      if (!msg.hasOwnProperty(property)) return acc;
      let words = msg[property].split(" ");
      return acc + words.length;
    }, 0);
  },

  mostActiveDay: function(daysObj) {
    const days = Object.keys(daysObj);
    let max = days[0];
    days.slice(1).forEach(day => {
      if (daysObj[day].length > daysObj[max].length) max = day;
    });
    return parseInt(max); // timestamp for Date object
  }
};

// Inspiration - https://i.redd.it/23v9czqdj6i01.jpg
