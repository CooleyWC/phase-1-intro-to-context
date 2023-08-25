// Your code here
function createEmployeeRecord(employeeData){
    const [firstName, familyName, title, payPerHour] = employeeData;
    const employeeRecord = {
        "firstName":firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents":[],
        "timeOutEvents":[]
    }
    return employeeRecord;
}

function createEmployeeRecords(employeeData){
    const employeeRecords = employeeData.map((element)=>{
        const employeeRecord = createEmployeeRecord(element);
        return employeeRecord;
    });
    return employeeRecords;
}

function createTimeInEvent(employeeObject, dateStamp){
    const hour = parseInt(dateStamp.split(' ')[1].slice(0,4));
    const date = dateStamp.split(' ')[0];
    const employeeRecord = {
        "type":"TimeIn",
        "hour":hour,
        "date":date
    }
    employeeObject.timeInEvents.push(employeeRecord)
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp){
    const hour = parseInt(dateStamp.split(' ')[1].slice(0,4));
    const date = dateStamp.split(' ')[0];
    const employeeRecord = {
        "type":"TimeOut",
        "hour":hour,
        "date":date
    }
    employeeObject.timeOutEvents.push(employeeRecord)
    return employeeObject;
}

function hoursWorkedOnDate(employeeObject, date){
  let findHourIn = 0;
  let findHourOut = 0;

  employeeObject.timeInEvents.forEach(event=>{
    // console.log(event);
    // console.log(typeof date);
  if(event.date === date){
    findHourIn = event.hour;
  }
});
    employeeObject.timeOutEvents.forEach(event=>{
  if(event.date === date){
     findHourOut = event.hour;
  }
})
  const hoursWorked = (parseInt(findHourOut)-parseInt(findHourIn))/100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObject, date){
    let hoursWorked = hoursWorkedOnDate(employeeObject, date);
    return hoursWorked*employeeObject.payPerHour;
}

function allWagesFor(employeeObject){
    let totalWages = 0;
    employeeObject.timeInEvents.forEach((timeInEvent)=>{
        // console.log(timeInEvent.date)
        totalWages += wagesEarnedOnDate(employeeObject, timeInEvent.date);
    })
    return totalWages;
}

function calculatePayroll(employeeData){
    let totalPay = 0;
    // console.log(employeeData);
    employeeData.forEach((obj)=>{
        obj.timeInEvents.forEach((timeInEvent)=>{
            let wages = wagesEarnedOnDate(obj, timeInEvent.date);
            totalPay += wages;
        })
    })
    console.log(totalPay)
    return totalPay;
}