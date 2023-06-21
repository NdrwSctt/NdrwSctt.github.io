// //Average button


// Define a function to generate the output
function generateOutputB() {
  var outputB = '';
  for (let x = 0; x < averages.length; x++) {
    outputB += '<p><a href="#" onclick="searchFunctionB(' + averages[x].index_number + ', \'outputB\');return false;">' + averages[x].company_name + '</a></p>';
  }

  return outputB;
}

function searchFunctionB(indexNumB) {
  for (let x = 0; x < averages.length; x++) {
  AvSalRange = (Number(averages[x].salary) - Number(averages[x].median_worker_pay)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');


    if (averages[x].index_number == indexNumB) {
     eSize = Number(averages[x].pay_ratio);
     bizName = averages[x].industry + averages[x].pay_ratio 
     + ":1" + '\n' + '\n' + averages[x].ceo_name + averages[x].salary.toFixed(2) + '\n' + '\n' 
     + averages[x].ticker + averages[x].median_worker_pay + '\n' + '\n' 
     + averages[x].text + AvSalRange + averages[x].textB;
     console.log(eSize);
    }
  }
}

// List of Companies

var sortedRuss = myData

// Define a function to generate the output
function generateOutput() {
  var output = '';
  for (let i = 0; i < sortedRuss.length; i++) {
    output += '<p><a href="#" onclick="searchFunction('+ sortedRuss[i].index_number+');return false;">' + sortedRuss[i].company_name + '</a></p>';
  }

  return output;
}
//I started this for you
function searchFunction(indexNum) {
  for (let i = 0; i < sortedRuss.length; i++) {
    var medianWorkerPay = Number(sortedRuss[i].median_worker_pay.replaceAll(',', ''));
    var salary = Number(sortedRuss[i].salary.replaceAll(',', ''));
    var salRange = (salary - medianWorkerPay).toLocaleString();
    var revRange = (medianWorkerPay - salary).toLocaleString();    
    if (sortedRuss[i].index_number == indexNum) {
      eSize = Number(sortedRuss[i].pay_ratio.slice(0,-2).replace(',', ''));
     // eSize = Number(sortedRuss[i].pay_ratio.slice(0,-2).replace(',', ''));
     // bizName = sortedRuss[i].company_name + '\n' + '~~~' + '\n'
     // + 'CEO ' + sortedRuss[i].ceo_name + ' makes $' + sortedRuss[i].salary + '. $' 
     // + salRange + ' over the median salary of $' + sortedRuss[i].median_worker_pay 
     // + ', or ' + (salary / medianWorkerPay).toFixed(2) + ' times the median employee.'
     if (salary < medianWorkerPay){
        bizName = sortedRuss[i].company_name + '\n' + '~~~' + '\n'
        + 'CEO ' + sortedRuss[i].ceo_name + ' makes $' + sortedRuss[i].salary + '. $' 
        + revRange + ' below the median salary of $' + sortedRuss[i].median_worker_pay 
        + ', or ' + (salary / medianWorkerPay).toFixed(2) + ' times the median employee.'
      } else {
        bizName = sortedRuss[i].company_name + '\n' + '~~~' + '\n'
        + 'CEO ' + sortedRuss[i].ceo_name + ' makes $' + sortedRuss[i].salary + '. $' 
        + salRange + ' over the median salary of $' + sortedRuss[i].median_worker_pay 
        + ', or ' + (salary / medianWorkerPay).toFixed(2) + ' times the median employee.'
      }
    } 
  }
  
}


// Wrap your code inside a window.onload function
window.onload = function() {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = generateOutput();
  var outputBDiv = document.getElementById('outputB');
  outputBDiv.innerHTML = generateOutputB();
}


///Calculates mean, median, and mode


function calculateMean(data) {
  var sum = data.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / data.length) * 100) / 100; // Round to nearest cent
}

function calculateMedian(data) {
  var sortedData = data.slice().sort((a, b) => a - b);
  var middle = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    return (sortedData[middle - 1] + sortedData[middle]) / 2;
  } else {
    return sortedData[middle];
  }
}

function calculateMode(data) {
  var roundedSalaries = data.map(value => Math.round(value / 10000) * 10000);

  var modeMap = {};
  var maxCount = 0;
  var modes = [];

  roundedSalaries.forEach(value => {
    modeMap[value] = (modeMap[value] || 0) + 1;

    if (modeMap[value] > maxCount) {
      maxCount = modeMap[value];
    }
  });

  for (var key in modeMap) {
    if (modeMap[key] === maxCount) {
      modes.push(parseFloat(key));
    }
  }

  return {
    values: modes,
    frequency: maxCount
  };
}

// Convert salary strings to numbers
var salaries = myData.map(item => parseFloat(item.salary.replace(/,/g, '')));

// Calculate mean, median, and mode
var mean = calculateMean(salaries);
var median = calculateMedian(salaries);
var mode = calculateMode(salaries);


// Log the results to the console
console.log('Mean Salary:', mean);
console.log('Median Salary:', median);
console.log('Mode Salary:', mode.values, 'Frequency:', mode.frequency);

averages[0].salary = mean
averages[1].salary = median


///Median Worker Pay Mean, Median and Mode

// Convert "median_worker_pay" strings to numbers
var medianWorkerPay = myData.map(item => parseInt(item.median_worker_pay.replace(',', '')));

// Calculate mean, median, and mode
var wMean = calculateMean(medianWorkerPay);
var wMedian = calculateMedian(medianWorkerPay);
var wMode = calculateMode(medianWorkerPay);

// Log the results to the console
console.log('Mean Median Worker Pay:', wMean);
console.log('Median Median Worker Pay:', wMedian);
console.log('Mode Median Worker Pay:', wMode.values, 'Frequency:', wMode.frequency);

averages[0].median_worker_pay = wMean
averages[1].median_worker_pay = wMedian


var avRatio = Math.round(mean/wMean);
console.log('Average Pay Ratio', avRatio,':1');
averages[0].pay_ratio = avRatio;


var avMedian = Math.round(median/wMedian);
console.log('Median Pay Ratio', avMedian,':1');
averages[1].pay_ratio = avMedian;

// var avMode = Math.round(mode.values/wMode.values);
// console.log('Mode Pay Ratio', avMode,':1');
// averages[2].pay_ratio = avMode;


///Change Order Buttons

var isAscending = true; // Track the current sorting order

function sortIndex() {
  if (isAscending) {
    sortedRuss = myData.sort(function(a, b) {
      return a.index_number - b.index_number;
    });
  } else {
    sortedRuss = myData.sort(function(a, b) {
      return b.index_number - a.index_number;
    });
  }

  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = generateOutput();
  
  isAscending = !isAscending; // Toggle the sorting order
}


function sortCeo() {
  if (isAscending) {
    sortedRuss = myData.sort(function(a, b) {
      var salaryA = parseFloat(a.salary.replace(/,/g, ''));
      var salaryB = parseFloat(b.salary.replace(/,/g, ''));
      return salaryB - salaryA;;
    });
  } else {
    sortedRuss = myData.sort(function(a, b) {
      var salaryA = parseFloat(a.salary.replace(/,/g, ''));
      var salaryB = parseFloat(b.salary.replace(/,/g, ''));
      return salaryA - salaryB;;
    });
  }

  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = generateOutput();
  
  isAscending = !isAscending; // Toggle the sorting order
}


function sortMedian(){
  if (isAscending) {
    sortedRuss = myData.sort(function(a, b) {
      var salaryA = parseFloat(a.median_worker_pay.replace(/,/g, ''));
      var salaryB = parseFloat(b.median_worker_pay.replace(/,/g, ''));
      return salaryB - salaryA;;
    });
  } else {
    sortedRuss = myData.sort(function(a, b) {
      var salaryA = parseFloat(a.median_worker_pay.replace(/,/g, ''));
      var salaryB = parseFloat(b.median_worker_pay.replace(/,/g, ''));
      return salaryA - salaryB;;
    });
  }

  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = generateOutput();
  
  isAscending = !isAscending; // Toggle the sorting order
}


function sortRatio(){

 if (isAscending) {
    sortedRuss = myData.sort(function(a, b) {
      var salaryA = parseFloat(a.pay_ratio.slice(0,-2).replace(/,/g, ''));
      var salaryB = parseFloat(b.pay_ratio.slice(0,-2).replace(/,/g, ''));
      return salaryB - salaryA;;
    });
  } else {
    sortedRuss = myData.sort(function(a, b) {
      var salaryA = parseFloat(a.pay_ratio.slice(0,-2).replace(/,/g, ''));
      var salaryB = parseFloat(b.pay_ratio.slice(0,-2).replace(/,/g, ''));
      return salaryA - salaryB;;
    });
  }

  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = generateOutput();
  
  isAscending = !isAscending; // Toggle the sorting order
}
//   sortedRuss = myData.sort(function(a, b) {
//     var salaryA = parseFloat(a.pay_ratio.slice(0,-2).replace(/,/g, ''));
//     var salaryB = parseFloat(b.pay_ratio.slice(0,-2).replace(/,/g, ''));
//     return salaryB - salaryA;
//   });

//   var outputDiv = document.getElementById('output');
//   outputDiv.innerHTML = generateOutput();
// }
