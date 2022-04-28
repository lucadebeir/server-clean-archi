export const addHours = (time: any) => {
  let dateTime = new Date();
  let temps = time.toString().split(':');
  dateTime.setHours(parseInt(temps[0]));
  dateTime.setMinutes(parseInt(temps[1]));
  dateTime.setSeconds(parseInt(temps[2]));
  if (dateTime.getHours() > 1) {
    if (dateTime.getMinutes() > 1) {
      return (
        dateTime.getHours().toString() +
        ' h ' +
        dateTime.getMinutes().toString()
      );
    } else {
      return dateTime.getHours().toString() + ' h ';
    }
  } else if (dateTime.getHours() == 1) {
    if (dateTime.getMinutes() > 1) {
      return (
        dateTime.getHours().toString() +
        ' h ' +
        dateTime.getMinutes().toString()
      );
    } else {
      return dateTime.getHours().toString() + ' h ';
    }
  } else {
    if (dateTime.getMinutes() > 1) {
      if (dateTime.getSeconds() > 1) {
        return (
          dateTime.getMinutes().toString() +
          ' min ' +
          dateTime.getSeconds().toString()
        );
      } else {
        return dateTime.getMinutes().toString() + ' min';
      }
    } else if (dateTime.getMinutes() == 1) {
      if (dateTime.getSeconds() > 1) {
        return (
          dateTime.getMinutes().toString() +
          ' min ' +
          dateTime.getSeconds().toString()
        );
      } else {
        return dateTime.getMinutes().toString() + ' min';
      }
    } else {
      if (dateTime.getSeconds() > 1) {
        return dateTime.getSeconds().toString() + ' s';
      }
    }
  }
};

export function globalTimeToString(startTime: any, endTime: any) {
  var times = [0, 0, 0];
  var max = times.length;

  var a = (startTime || '').split(':');
  var b = (endTime || '').split(':');

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
  }

  // store time values
  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i];
  }

  var hours = times[0];
  var minutes = times[1];
  var seconds = times[2];

  if (seconds >= 60) {
    var m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m;
  }

  if (minutes >= 60) {
    var h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  return (
    ('0' + hours).slice(-2) +
    ':' +
    ('0' + minutes).slice(-2) +
    ':' +
    ('0' + seconds).slice(-2)
  );
}

export function globalTimeToDate(startTime: any, endTime: any) {
  let dateTime = new Date();
  let temps1 = startTime.toString().split(':');
  let temps2 = endTime.toString().split(':');
  dateTime.setHours(parseInt(temps1[0]) + parseInt(temps2[0]));
  dateTime.setMinutes(parseInt(temps1[1]) + parseInt(temps2[1]));
  dateTime.setSeconds(parseInt(temps1[2]) + parseInt(temps2[2]));
  return dateTime;
}
