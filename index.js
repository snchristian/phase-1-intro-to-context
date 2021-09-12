// Your code here
const employeeData = ['value1','value2','value3','value4'];

function createEmployeeRecord(data){
    const payroll = 
      {firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents:[],
      timeOutEvents:[]
      }
    return payroll;
  }
//map(function callbackFn(element) { ... })
  function createEmployeeRecords(array){
       return array.map(function(subArray){
          return createEmployeeRecord(subArray)
      })
  }

//function createTimeInEvent(object,datastamp){
    //const type = "TimeIn"
    //Let [hour,date]= datastamp;
    //object.timeInEvent.push({type,datastamp})
    //return 
//}
function createTimeInEvent(record,dateStamp) {
      let type = "TimeIn"
    
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
   record.timeInEvents.push({type,date,hour})
    return record;
}
function createTimeOutEvent(record, dateStamp){
    let type = "TimeOut"
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
  
    record.timeOutEvents.push({type,date,hour})
    return record;
}

function hoursWorkedOnDate(record,date){
    const timeInHours = record.timeInEvents
    .filter(function(data){
       return data.date === date
      })[0].hour
     const timeOutHours = record.timeOutEvents
     .filter(function(data){
       return data.date === date
     })[0].hour
     const totalhoursWorked = timeOutHours-timeInHours
     return totalhoursWorked/100
}
function wagesEarnedOnDate(record,date){
  return record.payPerHour * hoursWorkedOnDate(record,date)
}


function allWagesFor(record){
   return record.timeInEvents.map(data => wagesEarnedOnDate(record,data.date)).reduce((x,y) => x+y)
}

function calculatePayroll(employees){
  return employees.map(employee => allWagesFor(employee)).reduce((start,end) => start+end)

}