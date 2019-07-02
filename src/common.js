import axios from "axios";

export const HTTP = axios.create({
  baseURL: ``,
   baseURL: `https://nffekiti.essentials.ng`,
//   baseURL: `http://localhost:5353`,
  headers: {
    Authorization: "Bearer {token}"
  }
});

export function checkRedirect(respData) {
  if (respData.Body !== null) {
    if (
      respData.Body.Redirect !== null &&
      respData.Body.Redirect !== undefined &&
      respData.Body.Redirect !== ""
    ) {
      console.log("We Redirect to " + respData.Body.Redirect);
      window.location.href = "/#" + respData.Body.Redirect;
    }
  }
}

export function checkPermissions() {
//   HTTP.get("/api/permissions", {
//     withCredentials: true
//   })
//     .then(response => {
//       checkRedirect(response.data);
//     })
//     .catch(e => {
//       if (window.location.hash !== "#/") {
//         window.location.href = "/";
//       }
//     });
}

export function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

export function dayofWeek() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[d.getDay()];
}

export function dateTimeConvert(dateTime) {
  if (dateTime !== "") {
    dateTime =
      new Date(dateTime).toDateString() +
      " " +
      humanTime(
        new Date(dateTime.substring(0, 19)).toTimeString().substring(0, 8)
      );
  }
  return dateTime;
}

export function humanTime(time) {
  if (time == undefined) {
    return;
  }

  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original
}

export function humanNumber(nStr) {
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "," + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

export function displayImage(event, app, field) {
  var reader = new FileReader();
  var selectedFile = event.target.files[0];
  event.target.value = "";
  reader.readAsDataURL(selectedFile);
  reader.onload = function () {
    if (selectedFile.size > 10240000) {
      app.notifications.push({
        Code: 0,
        Message: "Image File must be less than 10MB"
      });
    } else {
      switch (selectedFile.type) {
        case "image/gif":
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
          app.record[field] = reader.result;
          break;

        default:
          app.notifications.push({
            Code: 0,
            Message: "File Must be a valid Image"
          });
          break;
      }
    }
  };
  reader.onerror = function (error) {
    app.notifications.push({ Code: 0, Message: "Image Error:" + error });
  };
}

export function uploadFile(event, app, field) {
  var reader = new FileReader();
  var selectedFile = event.target.files[0];
  event.target.value = "";
  reader.readAsDataURL(selectedFile);
  reader.onload = function () {
    if (selectedFile.size > 10240000) {
      app.notifications.push({
        Code: 0,
        Message: "File must be less than 10MB"
      });
    } else {
      switch (selectedFile.type) {
        case "text/csv":
        case "application/csv":
        case "application/json":
          app.record[field] = reader.result;
          break;

        default:
          app.notifications.push({
            Code: 0,
            Message: "File Must be a JSON or CSV"
          });
          break;
      }
    }
  };
  reader.onerror = function (error) {
    app.notifications.push({
      Code: 0,
      Message: "Image Error:" + error
    });
  };
}

export function uploadDocumentLine(event, line, app) {
  console.log(line);

  var reader = new FileReader();
  var selectedFile = event.target.files[0];
  event.target.value = "";
  reader.readAsDataURL(selectedFile);
  reader.onload = function () {
    if (selectedFile.size > 20480000) {
      app.notifications.push({
        Code: 0,
        Message: "Document must be less than 20MB"
      });
    } else {
      line.Filepath = reader.result;
      line.Filesize = selectedFile.size;
      line.Filetype = selectedFile.type;
      line.Filename = selectedFile.name;
      line.Title = selectedFile.name;

      // switch (selectedFile.type) {
      //     case "image/png":
      //     case "image/jpg":
      //     case "image/jpeg":
      //     case "application/pdf":
      //         line.Filepath = reader.result;
      //         line.Filesize = selectedFile.size;
      //         line.Filetype = selectedFile.type;
      //         line.Filename = selectedFile.name;
      //         line.Title = selectedFile.name;
      //         break;

      //     default:
      //         app.notifications.push({
      //             Code: 0,
      //             Message: "File Must be a PDF, JPG, or PNG"
      //         })
      //         break
      // }
    }
  };
  reader.onerror = function (error) {
    app.notifications.push({
      Code: 0,
      Message: "Document Error:" + error
    });
  };
}

export function uploadDocument(event, app) {
  var reader = new FileReader();
  var selectedFile = event.target.files[0];
  event.target.value = "";
  reader.readAsDataURL(selectedFile);
  reader.onload = function () {
    if (selectedFile.size > 20480000) {
      app.notifications.push({
        Code: 0,
        Message: "Document must be less than 20MB"
      });
    } else {
      app.record.Filepath = reader.result;
      app.record.Filesize = selectedFile.size;
      app.record.Filename = selectedFile.name;
      app.record.Filetype = selectedFile.type;
      console.log(app.record);
    }
  };
  reader.onerror = function (error) {
    app.notifications.push({
      Code: 0,
      Message: "Document Error:" + error
    });
  };
}

export function scrollTop() {
  const scrollHeight = window.scrollY,
    scrollStep = Math.PI / (300 / 15),
    cosParameter = scrollHeight / 2;
  var scrollCount = 0,
    scrollMargin,
    scrollInterval = setInterval(function () {
      if (window.scrollY != 0) {
        scrollCount = scrollCount + 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else {clearInterval(scrollInterval);}
    }, 7);
}



export function printLetterHead(elementID, app) {
    // var dimensions = "width=" + document.getElementById(elementID).clientWidth + "px";
    var dimensions = "500px"
    var win = window.open("", "win", dimensions); // a window object 
    win.document.open("text/html", "replace");
    var docContent = "<HTML><HEAD><TITLE> PRINT </TITLE>"
    docContent += "<link rel='stylesheet' href='https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css'/>"
    docContent += `<style>  img{max-width: 500 px;}  body { width: 21cm; height: 29.7cm;} </style>`
    docContent += "</HEAD><BODY>"

    docContent += document.getElementById(elementID).innerHTML;
    
    docContent += "</BODY></HTML>"
    win.document.write(docContent);
    setTimeout(function () {
        win.print()
    }, 5000);
}


export function printRecords(elementID, app) {
    // var dimensions = "width=" + document.getElementById(elementID).clientWidth + "px";
    
    var win = window.open("", "", "width=900, height=1273"); // a window object 
    win.document.open("text/html", "replace");
    var docContent = "<HTML><HEAD><TITLE>Printing "
    docContent +=  app.search.limit + " Records"
    docContent += "</TITLE>"
    docContent += "<link rel='stylesheet' href='https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css'/>"
    docContent += "</HEAD><BODY>"

    docContent += document.getElementById(elementID).innerHTML;
    

    if (window.print) {
        docContent += '<center><input type=button name=print value="Print" onClick="window.print()"></center>';
    }


    docContent += "</BODY></HTML>"
    win.document.write(docContent);
    
    // setTimeout(function () {
        win.print()
    // }, 2500);



}