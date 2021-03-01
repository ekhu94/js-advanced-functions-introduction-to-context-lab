const createEmployeeRecord = arr => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = arr => {
    return arr.map(subArr => createEmployeeRecord(subArr));
}

const createTimeInEvent = (obj, date) => {
    obj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return obj;
}

const createTimeOutEvent = (obj, date) => {
    obj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return obj;
}

const hoursWorkedOnDate = (obj, date) => {
    const timeIn = obj.timeInEvents.find(d => d.date === date).hour;
    const timeOut = obj.timeOutEvents.find(d => d.date === date).hour;
    return (timeOut - timeIn) / 100;
}

const wagesEarnedOnDate = (obj, date) => {
    let hours = hoursWorkedOnDate(obj, date);
    return hours * obj.payPerHour;
}

const allWagesFor = obj => {
    let total = 0;
    for (let date of obj.timeInEvents) total += wagesEarnedOnDate(obj, date.date);
    return total;
}

const findEmployeeByFirstName = (arr, name) => {
    return arr.find(obj => obj.firstName === name);
}

const calculatePayroll = arr => {
    let total = 0;
    for (let obj of arr) total += allWagesFor(obj);
    return total;
}