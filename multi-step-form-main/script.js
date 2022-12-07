let yearly = document.querySelector('.yearly')
let monthly = document.querySelector('.monthly')
let circle = document.querySelector('.circle')
let slideButton = document.querySelector('.slideButton')
let yearlySubs = document.querySelectorAll('.yearlySubs')
let userInfo = document.querySelector('.userInfo')
let selectPlan = document.querySelector('.selectPlan')
let finishingUp = document.querySelector('.finishingUp')
let thanks = document.querySelector('.thanks')
let addOns = document.querySelector('.addOns')
let stepOne = document.querySelector('.step1')
let stepTwo = document.querySelector('.step2')
let stepThree = document.querySelector('.step3')
let stepFour = document.querySelector('.step4')
let arcadePrice = document.querySelector('.arcadePrice')
let advancedPrice = document.querySelector('.advancedPrice')
let proPrice = document.querySelector('.proPrice')
let totalPer = document.querySelector('.totalPer')
let total = document.querySelector('.total')
let onlineServicePrice = document.querySelector('.onlineServicePrice')
let largerStoragePrice = document.querySelector('.largerStoragePrice')
let customizePrice = document.querySelector('.customizePrice')
let nextStepBtn = document.querySelectorAll('.nextStepBtn')
let goBack = document.querySelectorAll('.goBack')
let arrSteps = [userInfo, selectPlan, addOns, finishingUp, thanks]
let steps = [stepOne, stepTwo, stepThree, stepFour]
let checkboxes = document.querySelectorAll('.checkbox')
let currentStep = 0;
let movements = [nextStepBtn, goBack];
let changePlan = document.querySelector('.changePlan');
let plan = document.querySelectorAll('.plan');
let selectedPlan;
let collectTotalPrice = [];
let additionalServices = document.querySelector('.additionalServices');
let chosenPlanType = document.querySelector('.chosenPlanType');
let chosenPrice = document.querySelector('.chosenPrice');
let yearlyOrMonthly = document.querySelector('.yearlyOrMonthly');
const reg = /\d+/;
let yOrM = true;
let calculateSum = [];
let confirm = document.querySelector('.confirm')
window.onload = () => {
  resetSteps();
  currentStep = 0;
  goBack.forEach((item, i) => {
    item.style.display = 'none';
  });

  arrSteps[currentStep].style.display = 'flex';
  resetStepNumber();
  steps[currentStep].style.backgroundColor = 'hsl(206, 94%, 87%)';
  steps[currentStep].style.color = 'black';
}
confirm.addEventListener('click', () => {
  resetSteps();
  thanks.style.display = 'flex';
})
plan.forEach((item) => {
   item.addEventListener('click', (e) => {
     plan.forEach((item) => {
       item.style.backgroundColor = 'white';
       item.style.borderColor = 'hsl(231, 11%, 63%)';
     });
     selectedPlan = e.target;
     e.target.style.backgroundColor = 'hsl(229, 24%, 87%, 0.2)';
     e.target.style.borderColor = 'hsl(243, 100%, 62%)';
   })
});

function resetSelectedPlan(thePlan) {
  if (yOrM) {
    chosenPlanType.textContent = thePlan.childNodes[3].childNodes[1].textContent + " (Monthly)";
  } else {
    chosenPlanType.textContent = thePlan.childNodes[3].childNodes[1].textContent + " (Yearly)";
  }
  chosenPrice.textContent = thePlan.childNodes[3].childNodes[3].textContent;
}

checkboxes.forEach((item) => {
   item.addEventListener('click', (e) => {
     if(!e.target.checked) {
       e.target.parentElement.style.backgroundColor = 'hsl(231, 100%, 99%)';
       e.target.parentElement.style.borderColor = 'hsl(231, 11%, 63%)';
     } else {
       e.target.parentElement.style.backgroundColor = 'hsl(229, 24%, 87%, 0.2)';
       e.target.parentElement.style.borderColor = 'hsl(243, 100%, 62%)';
     }
   })
});

nextStepBtn.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    goBack.forEach((item, i) => {
      item.style.display = 'block';
    });
    if (currentStep < 3) {
      resetSteps();
      currentStep++;
      arrSteps[currentStep].style.display = 'flex';
      resetStepNumber();
      steps[currentStep].style.backgroundColor = 'hsl(206, 94%, 87%)';
      steps[currentStep].style.color = 'black';
      if (currentStep === 2) {
        collectTotalPrice.push(selectedPlan.childNodes[3].childNodes[3].textContent);
        resetSelectedPlan(selectedPlan)
      }
      if (currentStep === 3) {
        let filtered = [...checkboxes].filter((item) => {
          if (item.checked) {
            return item;
          }
        })
        let filteredServices = [];
        filtered.forEach((item) => {
         filteredServices.push(item.parentElement);
        });
         makeCheckOutList(filteredServices);
         let finalPlanPrice= document.querySelector('.chosenPlan');
         addAll(finalPlanPrice.childNodes[3].textContent)
      }
    }
    return null;
  })
});
goBack.forEach((item) => {
  item.addEventListener('click', () => {
    if (currentStep === 0) {
     return null;
    }

    resetSteps();
    resetStepNumber()
    currentStep--;
    arrSteps[currentStep].style.display = 'flex';
    steps[currentStep].style.backgroundColor = 'hsl(206, 94%, 87%)';
    steps[currentStep].style.color = 'black';
    calculateSum = [];
  })
});

function makeCheckOutList(serviceItems) {
   let htmlString = serviceItems.map((item) => {
     return `
     <div class="addition">
    <h3>${item.childNodes[3].childNodes[1].textContent}</h3>
   <p class="additionalServicePrice">${item.childNodes[5].textContent}</p>
     </div>   `
   }).join('')
   additionalServices.innerHTML = htmlString;
}
function resetSteps() {
  arrSteps.forEach((item, i) => {
     item.style.display = 'none';
  });
}
function resetStepNumber() {
  steps.forEach((item) => {
    item.style.backgroundColor = 'transparent';
    item.style.color = 'white';
  });
}
steps.forEach((item) => {
   item.addEventListener('click', (e) => {
     let thsiItemNumber = parseInt(e.target.textContent);
     currentStep = thsiItemNumber - 1;
     arrSteps.forEach((step) => {
        step.style.display = 'none';
     });
     resetStepNumber();
     arrSteps[thsiItemNumber - 1].style.display ='flex';
     e.target.style.backgroundColor = 'hsl(206, 94%, 87%)';
     e.target.style.color = 'black';

   })
});

slideButton.addEventListener('click', (e) => {
  if (yOrM) {
    circle.style.left = 'calc(100% - 0.8rem)';
    monthly.style.color = 'hsl(213, 96%, 18%)';
    yearly.style.color = 'hsl(231, 11%, 63%)';
    // plan yearly
    arcadePrice.textContent = "$90/yr";
    advancedPrice.textContent = "$120/yr";
   proPrice.textContent = "$150/yr";
   //Add ons yearly prices
   onlineServicePrice.textContent = "+$10/yr"
   largerStoragePrice.textContent = "+$20/yr"
   customizePrice.textContent = "+$20/yr"
   totalPer.textContent = "Total (per year)"
   chosenPlanType.textContent += "(Yearly)"
    yearlySubs.forEach((item, i) => {
       item.style.display = 'block';
       item.style.transition = 'all 0.5s linear ease-out';
    });
    yOrM = false
  } else {
    circle.style.left = '0px';
    monthly.style.color = 'hsl(231, 11%, 63%)'
    yearly.style.color = 'hsl(213, 96%, 18%)'
    //Plan monthly
    arcadePrice.textContent = "$9/mo";
    advancedPrice.textContent = "$12/mo";
   proPrice.textContent = "$15/mo";
   //add ons monthly
   onlineServicePrice.textContent = "+$1/mo"
   largerStoragePrice.textContent = "+$2/mo"
   customizePrice.textContent = "+$2/mo"

   totalPer.textContent = "Total (per month)"
   chosenPlanType.textContent = "(Monthly)"
    yearlySubs.forEach((item, i) => {
       item.style.display = 'none';
       yOrM = true;
    });
  }
})
// change the user plans
changePlan.addEventListener('click', () => {
  resetSteps();
  currentStep = 0;
  arrSteps[currentStep].style.display = 'flex';
  resetStepNumber();
  steps[currentStep].style.backgroundColor = 'hsl(206, 94%, 87%)';
  steps[currentStep].style.color = 'black';
  calculateSum = [];
})

function addAll(finalPlanPrice) {
  let allAdditions = document.querySelectorAll('.addition');
  allAdditions.forEach((item) => {
    calculateSum.push(item.childNodes[3].textContent);
  });
  calculateSum.push(finalPlanPrice);
  let arr = [];
  calculateSum = calculateSum.forEach((item, i) => {
    arr.push(parseInt(item.match(reg)));
  });
  let tot = 0;
  for (var i = 0; i < arr.length; i++) {
    tot += arr[i];
  }
  if (yOrM) {
    total.textContent = `+$${tot}/mo`;
  } else {
    total.textContent = `+$${tot}/yr`;
  }
}
