var courseContent = {};
var json = {};
//---------------------------data---------------------------------------
//--------------------init------------------------
var xhttp = new XMLHttpRequest();
let x = document.querySelectorAll(".course");
for (i = 0; i < x.length; i++) {
  y = x[i].children;
  for (j = 0; j < y.length; j++) y[j].style.display = "none";
}
/* Construct timetable */
var scheduleTime = document.getElementById("time");
for (var i = 8; i < 19; ) {
  scheduleTime.innerHTML +=
    "<p class = 'time-slot'>" + i + ":30 - " + (i + 1) + ":00<p>";
  i++;
  if (i === 19) break;
  scheduleTime.innerHTML +=
    "<p class = 'time-slot' >" + i + ":00 - " + i + ":30<p>";
}
/* time effect */
const DAYTIME = 24 * 60 * 60 * 1000;
const WEEKTIME = 7 * DAYTIME;
var timeNow = new Date().getTime();
var time = new Date(2018, 7, 13, 0, 0, 0).getTime();
var week = 0;
while (timeNow > time) {
  time += WEEKTIME;
  week++;
}
var dateTimeNow = timeNow - (time - WEEKTIME);
var weekday = Math.ceil(dateTimeNow / DAYTIME);
var fraction = (dateTimeNow / DAYTIME + 1 - weekday) * 100;
var timetableFraction = 0;
var dayTimeNow = (dateTimeNow % DAYTIME) / 1000;
if (dayTimeNow > 8 * 3600 + 30 * 60) {
  if (dayTimeNow < 19 * 3600)
    timetableFraction =
      5 + ((dayTimeNow - (8 * 3600 + 30 * 60)) / (11 * 3600 - 30 * 60)) * 95;
  else timetableFraction = 100;
}
if (!(weekday === 6 || weekday === 7))
  document.getElementsByClassName("title")[weekday].style.background =
    "linear-gradient(90deg,rgba(27,27,27,0.4) 0%,rgba(108,95,105,0.8) " +
    fraction +
    "%,rgba(27,27,27,0.4) 100%)";
else week++;
//time line
// document.getElementsByClassName("schedule")[0].style.background = "linear-gradient(rgba(27,27,27,0)" + (timetableFraction - 0.5) + "%,rgba(50,50,50,0.8) " + timetableFraction + "%,rgba(27,27,27,0) " + (timetableFraction + 0.5) + "%)";

document.getElementById("week").innerHTML += week > 7 ? week - 1 : week;

/* background */
function background(url) {
  if (url === null || url === "")
    document.getElementsByTagName("header")[0].style.background =
      "url('https://picsum.photos/1920/1080/?random')" +
      " no-repeat fixed center/cover";
  else
    document.getElementsByTagName(
      "header"
    )[0].style.background = `url(${url}) no-repeat fixed center/cover`;
}

background(backgroundURL);

//--------------------init------------------------
//--------------first solution---------------------
// var arr = X.split('\n');
// var newArr = [];
// var index = -1;
// arr.forEach((a) => {
//     if (a.split('\t').length == 15) {
//         newArr.push([a.split('\t')]);
//         index++;
//     }
//     else{
//         newArr[index].push(a.split('\t'));
//     }
// })
// const C = newArr;
//
// class setup {
//     constructor(type, location, group, week, courseTime) {
//         let arr = []
//         let weekArr = []
//         if (week.includes("-")) {
//             week = week.split("-")
//             for (var i = Number(week[0]); i <= Number(week[1]); i++) {
//                 weekArr.push(i);
//             }
//             week = weekArr
//         } else if (week.includes(",")) week = week.split(",").map((i)=>{return parseInt(i,10)});
//         else week = [week]
//         this.specific = {
//             location: location,
//             group: group,
//             week: week,
//             courseTime: courseTime
//         }
//         arr.push(this.specific)
//         this.content = {
//             [type]: arr
//         }
//     }
//     extract() {
//         return this.content
//     }
// }
//
// function jsonF(content) {
//     function assign(C) {
//         var result = []
//         head = C[0].splice(0,9);
//         C.forEach((list) => {
//             let week = list[list.length - 1];
//             week = week.split('k');
//             let type = list[0];
//             if(list[0]=='LEC/STUDIO') type = 'LEC';
//             item = new setup(type, list[4], list[1], week[1], {
//                 [list[2]]: list[3].split('-')
//             })
//             result.push(item.extract());
//         });
//         console.log(head);
//         console.log('!');
//         return [head, result];
//     }
//
//     Rc = assign(content);
//     RcC = Rc[1]
//     var RcN = {}
//     var keyArr = []
//     RcC.forEach((item) => {
//         if (keyArr.includes(Object.keys(item)[0])) {
//             RcN[Object.keys(item)].push(item[Object.keys(item)][0])
//         } else {
//             RcN[Object.keys(item)] = item[Object.keys(item)];
//             keyArr.push(Object.keys(item)[0]);
//         }
//     })
//
//     RcH = Rc[0];
//     var result = {
//         [RcH[0]]: {
//             id: RcH[0],
//             course: {
//                 type: keyArr,
//                 match: RcN
//             }
//         }
//     }
//     courseContent = Object.assign({}, courseContent, result);
// }
//
// C.forEach((a) => jsonF(a))
//
// json = {
//     courseList: Object.keys(courseContent),
//     length: Object.keys(courseContent).length,
//     courseContent: courseContent
// }
// var jsonFile = JSON.stringify(json);
// var fs = require('fs');
// fs.writeFile('myjsonfile.json',jsonFile, 'utf8');
//----------------------------------------------------------------
//-------------------------second solution------------------------
const DATA = X.trim()
  .split("\n")
  .filter(item => {
    return item[item.length - 1] !== "e";
  })
  .map(item => item.split("\t"));

const HEADER = DATA.reduce((list, item) => {
  if (item.length == 15) list.push(item[0]);
  return list;
}, []);
var course;
const BODY = DATA.reduce((obj, item) => {
  if (item.length == 15) {
    obj[item[0]] = {};
    course = obj[item[0]];
    course.id = item[0];
    item.splice(0, 9);
    typeArr = [];
    course.course = {};
    course.course.match = {};
  }
  type = item[0].split("/")[0];
  course.course.match[type] = course.course.match[type] || [];
  if (!typeArr.includes(type)) {
    typeArr.push(type);
  }
  course.course.type = typeArr;
  course.course.match[type].push({
    location: item[4],
    group: item[1],
    week: ((week = item[item.length - 1].split("k")[1]) => {
      if (week.includes("-")) {
        var weekArr = [];
        week = week.split("-");
        for (var i = Number(week[0]); i <= Number(week[1]); i++) {
          weekArr.push(i);
        }
        weekArr = weekArr.map(i => {
          if (i > 7) return parseInt(i) + 1;
          else return i;
        });
        console.log(weekArr);
        return weekArr;
      } else if (week.includes(","))
        return week
          .split(",")
          .map(i => parseInt(i.trim()))
          .map(i => {
            if (i > 7) return parseInt(i) + 1;
          });
      else return week <= 7 ? [week] : [parseInt(week) + 1];
    })(),
    courseTime: {
      [item[2]]: item[3].split("-")
    }
  });
  return obj;
}, {});
var json = {};
json.courseList = HEADER;
json.length = HEADER.length;
json.courseContent = BODY;
console.log(json);

//--------------------------------------------------------------
for (i = 0; i < json.length; i++) {
  var item = json.courseContent[json.courseList[i]];
  for (let courseType in item.course.type) {
    let matchContent = item.course.match[item.course.type[courseType]];
    for (t = 0; t < matchContent.length; t++) {
      formHTML(
        item.id,
        item.course.type[courseType],
        item.course,
        matchContent[t]
      );
    }
  }
}

function formHTML(id, courseType, source, targetJson) {
  let weekOn = Object.keys(targetJson.courseTime);
  function calculate(element) {
    //calculate the fraction for css style sheet.
    return (
      (element[weekOn[k]][0].replace("30", ".5").replace("00", "") - 8.5) * 2 +
      1 +
      "/" +
      ((element[weekOn[k]][1].replace("30", ".5").replace("00", "") - 8.5) * 2 +
        1)
    );
  }
  for (k = 0; k < weekOn.length; k++) {
    let targetWeekDay = document.getElementById(weekOn[0]);
    let showing = "none";
    for (var actWeek in targetJson.week) {
      targetJson.week[actWeek] == week ? (showing = "") : (showing = showing);
    }
    let targetTime = calculate(targetJson.courseTime);
    targetWeekDay.innerHTML += `<div id="${
      item.id
    }" style = "grid-row: ${targetTime}; display:${showing}">${id} ${courseType} ${
      targetJson.group
    }<br>${targetJson.location}</div>`;
  }
}
