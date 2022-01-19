const acomplishments = document.querySelectorAll('.card-body__done')
const goals = document.querySelectorAll('.card-body__goal')
const allAcomplishmentOutputs = document.querySelectorAll('.card-body__done-percentage');
const allMonthsLinesDone = document.querySelectorAll('.card-footer__lines-done');
const headerSelect = document.querySelector('#header__select');

const loadProfileButton = document.querySelector('#header__button');
loadProfileButton.addEventListener('click', populateFields);

const calculateResults = document.querySelector('#input__button');
calculateResults.addEventListener('click', generateResults);

const numberOfGoals = 6;

let allGoalsList = allGoals();
let allAcomplishmentsList = allAcomplishments();
let allBoostsList = allBoosts();


//Capturing all input values and turning it into a array
function allGoals(){
  const goals = document.querySelectorAll('.card-body__goal')
  const values = []
  goals.forEach(element => {
    const value = element.value;
    values.push(value);    
  });
  return values;
}


function allAcomplishments(){
  const acomplishments = document.querySelectorAll('.card-body__done')
  const values = []
  acomplishments.forEach(element => {
    const value = element.value;
    values.push(value);    
  });
  return values;
}


function allBoosts(){
  const exc = document.querySelector('#boosts__exc').value;
  const exo = document.querySelector('#boosts__exo').value;
  const index = document.querySelector('#boosts__index').value;

  const values = [];
  values.push(exc);
  values.push(exo);
  values.push(index);

  return values;
}



// Profile management functions
// Loading the profile
function loadProfileName(){
  const profile = document.querySelector('#header__select').value;
  return profile;
}


function loadProfileData(){
  let allGoalsList = allGoals();
  let allAcomplishmentsList = allAcomplishments();
  let allBoostsList = allBoosts();
  let profileName = loadProfileName();
  let data = [];
  
  data = JSON.parse(localStorage.getItem(profileName));
  if(data != null){
    allGoalsList.concat(data[0]);
    allAcomplishmentsList.concat(data[1]); 
    allBoostsList.concat(data[2]);   
  }
  if(data === null){
    alert('Atenção, esta simulação está vazia, selecione uma simulação salva válida ou preencha os campos abaixo');
    document.location.reload(true);
  }
  return data;
}


function populateFields(){ 
  let data = loadProfileData();
  let loadedGoals = data.goals;
  let loadedAcomplishments = data.acomplishments;
  let loadedBoosts = data.boosts;

  //populating the goals inputs
  let cont = 0;
  let goalsImput = document.querySelectorAll('.card-body__goal');
  goalsImput.forEach(element => {
    element.value = loadedGoals[cont];
    cont++;  
  }) 


  //populating the acomplishments inputs
  let cont2 = 0;
  let acomplishmentsInput = document.querySelectorAll('.card-body__done');
  acomplishmentsInput.forEach(element => {
    element.value = loadedAcomplishments[cont2];
    cont2++;  
  })
  
  //populating the boosts inputs
  const exc = document.querySelector('#boosts__exc');
  const exo = document.querySelector('#boosts__exo');
  const index = document.querySelector('#boosts__index');

  exc.value = loadedBoosts[0];
  exo.value = loadedBoosts[1];
  index.value = loadedBoosts[2];

  alert('Simulação carregada com sucesso!, para ver os resultados, clique no botão "Salvar e Simular"')
}


// Saving the profille
function joinLists(){
  const goalPlusAcomplishment = {   
  }

  let allGoalsList = allGoals();
  let allAcomplishmentsList = allAcomplishments();
  let allBoostsList = allBoosts();

  goalPlusAcomplishment.acomplishments = allAcomplishmentsList;
  goalPlusAcomplishment.goals = allGoalsList;
  goalPlusAcomplishment.boosts = allBoostsList;

  return goalPlusAcomplishment;
}


function saveProfileData(){
  const profile = loadProfileName();

  const data = joinLists();
  localStorage.setItem(profile, JSON.stringify(data))
}



// mannaging the "confirm saving" alert
function saveAlert(){  
  if(confirm(`Os dados serão salvos em "${headerSelect.value}", caso já existam dados salvos neste perfil, os mesmos serão sobreescritos. Deseja continuar?`)){
    alert(`Simulação salva com sucesso em "${headerSelect.value}"`);
    return true;
  } else{
    alert(`Se preferir, selecione outro perfil no topo de página para salvar esta simulação`)
    return false;
  }
}



// applying some styles
function changeOutputColor(llAcomplishmentOutputs, acomplishmentPercentage){
  if(acomplishmentPercentage < 100){
    llAcomplishmentOutputs.classList.add('underTheGoal')
  }
  if(acomplishmentPercentage >= 100){
    llAcomplishmentOutputs.classList.add('overTheGoal')
  }
}


// calculating and displaying the number of lines done in each period
function calculateLinesDone(numberOfGoals, allGoalsList, allAcomplishmentsList){
  let linesDoneList = [];

  let month1LinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i]/allGoalsList[i] >= 1){
      month1LinesDone++;
    }
  }
  linesDoneList.push(month1LinesDone);

  let month2LinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i+6]/allGoalsList[i+6] >= 1){
      month2LinesDone++;
    }
  }
  linesDoneList.push(month2LinesDone);
  
  let month3LinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i+12]/allGoalsList[i+12] >= 1){
      month3LinesDone++;
    }
  }
  linesDoneList.push(month3LinesDone);
  
  let month4LinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i+18]/allGoalsList[i+18] >= 1){
      month4LinesDone++;
    }
  }
  linesDoneList.push(month4LinesDone);

  let month5LinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i+24]/allGoalsList[i+24] >= 1){
      month5LinesDone++;
    }
  }
  linesDoneList.push(month5LinesDone);

  let month6LinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i+30]/allGoalsList[i+30] >= 1){
      month6LinesDone++;
    }
  }
  linesDoneList.push(month6LinesDone);

  let totalLinesDone = 0;
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsList[i+36]/allGoalsList[i+36] >= 1){
      totalLinesDone++;
    }
  }
  linesDoneList.push(totalLinesDone);

  return linesDoneList;
}


function displayLinesDone(linesDoneList){
  for( let i = 0; i < 7; i++){
    allMonthsLinesDone[i].innerHTML = linesDoneList[i];
  }
  const semesterLinesAcomplished = document.querySelector('#results__main-title-value');
  semesterLinesAcomplished.innerHTML = linesDoneList[6]
}



// calculating the totals (sum of values in the blocks) and applying the "final lines" rule
function calculateTotals(){
  const acomplishments = document.querySelectorAll('.card-body__done')
  const goals = document.querySelectorAll('.card-body__goal')
  const allGoalsList = allGoals();
  const allAcomplishmentsList = allAcomplishments();

  for(let i = 0; i < numberOfGoals; i++){    
    acomplishments[i+36].value = Number(allAcomplishmentsList[i]) + Number(allAcomplishmentsList[i+6]) + Number(allAcomplishmentsList[i+12]) + Number(allAcomplishmentsList[i+18])+ Number(allAcomplishmentsList[i+24]) + Number(allAcomplishmentsList[i+30]);
  }
  for(let i = 0; i < numberOfGoals; i++){    
    goals[i+36].value = Number(allGoalsList[i]) + Number(allGoalsList[i+6]) + Number(allGoalsList[i+12]) + Number(allGoalsList[i+18])+ Number(allGoalsList[i+24])+ Number(allGoalsList[i+30]);
  }
}

/* not used in this version
function calculateFinalLines(){
  const acomplishments = document.querySelectorAll('.card-body__done')
  const goals = document.querySelectorAll('.card-body__goal')
  const allGoalsList = allGoals();
  const allAcomplishmentsList = allAcomplishments();

  console.log(allGoalsList)

  for(let i = 0; i < 3; i++){ 
    if(allGoalsList[i+2] != 0){
      goals[i+38].value = allGoalsList[i+2]      
    } 
    if(allGoalsList[i+8] != 0){
      goals[i+38].value = allGoalsList[i+8]      
    }
    if(allGoalsList[i+14] != 0){
      goals[i+38].value = allGoalsList[i+14]      
    }
    if(allGoalsList[i+20] != 0){
      goals[i+38].value = allGoalsList[i+20]      
    }
    if(allGoalsList[i+26] != 0){
      goals[i+38].value = allGoalsList[i+26]      
    } 
    if(allGoalsList[i+32] != 0){
      goals[i+38].value = allGoalsList[i+32]      
    } 
  }


  for(let i = 0; i < 3; i++){ 
    if(allAcomplishmentsList[i+2] != 0){
      acomplishments[i+38].value = allAcomplishmentsList[i+2]
    }  
    if(allAcomplishmentsList[i+8] != 0){
      acomplishments[i+38].value = allAcomplishmentsList[i+8]
    }
    if(allAcomplishmentsList[i+14] != 0){
      acomplishments[i+38].value = allAcomplishmentsList[i+14]
    }
    if(allAcomplishmentsList[i+20] != 0){
      acomplishments[i+38].value = allAcomplishmentsList[i+20]
    }
    if(allAcomplishmentsList[i+26] != 0){
      acomplishments[i+38].value = allAcomplishmentsList[i+26]
    }
    if(allAcomplishmentsList[i+32] != 0){
      acomplishments[i+38].value = allAcomplishmentsList[i+32]
    }             
  }
} */



// displays every line in every month acomplishment %
function showMonthGoalsAcomplishments(numberOfGoals, allGoalsList, allAcomplishmentsList){
  const allAcomplishmentOutputs = document.querySelectorAll('.card-body__done-percentage');

  for(let i = 0; i < (numberOfGoals * 7); i++){
    let acomplishmentPercentage = 0; 
    
    if(Number(allGoalsList[i]) === 0){
      acomplishmentPercentage = 0;
      allAcomplishmentOutputs[i].innerHTML = `-`;
    } else{
      if(allAcomplishmentsList[i]/allGoalsList[i] > 1.5){
        acomplishmentPercentage = 150;
      } else{
        acomplishmentPercentage = (allAcomplishmentsList[i]/allGoalsList[i])*100;
      }

    if(acomplishmentPercentage){
      allAcomplishmentOutputs[i].innerHTML = `${acomplishmentPercentage.toFixed(0)}%`   
      changeOutputColor(allAcomplishmentOutputs[i], acomplishmentPercentage);   
      } else{
        allAcomplishmentOutputs[i].innerHTML = `-`;
      }
    }
  }
}




// runs every "total line" checking if this line was acomplished over 100%, if so, pushes the full target value of this line into the list of values, if a line was not acomplished over 100% it pushes the value "0" into the list, nulifyuing this line potential of gain
function elegibleLines(numberOfGoals, allGoalsListUpdated, allAcomplishmentsListUpdated){
  const targets = [3060, 1530, 2040, 1020, 1530, 1020];
  let elegibleLinesList  = [];
  
  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsListUpdated[i + 36] >= allGoalsListUpdated[i + 36]){
      elegibleLinesList.push(targets[i]);
    } else{
      elegibleLinesList.push(0);
    }
  }  
  return elegibleLinesList;
}




//calculating Multipliers and Boosts
function calculateLinesMultiplier(allGoalsListUpdated, allAcomplishmentsListUpdated){
  let linesDoneList = calculateLinesDone(numberOfGoals, allGoalsListUpdated, allAcomplishmentsListUpdated);
  let linesDoneFinal = linesDoneList[6];

  if(linesDoneFinal < 2){
    return 0;
  } if(linesDoneFinal === 2){
    return 1;
  } if(linesDoneFinal === 3){
    return 1.5;
  } if(linesDoneFinal === 4){
    return 2;
  } if(linesDoneFinal === 5){
    return 3;
  } if(linesDoneFinal === 6){
    return 4;
  }  
}


function calculateBoostsMultiplier(){
  const exc = document.querySelector('#boosts__exc').value;
  const exo = document.querySelector('#boosts__exo').value;
  const index = document.querySelector('#boosts__index').value;

  return 1 + Number(exc) + Number(exo) + (index * 3.3334 / 100);
}




// multiplying every line target by the global multiplier
function multiplyLines(elegibleLinesList, linesMultiplier, linesWithAccelerator){
  let multipliedLines = [];

  for(let i = 0; i < numberOfGoals; i++){
    multipliedLines.push(elegibleLinesList[i] * linesMultiplier * linesWithAccelerator[i]);
  }
  
  return multipliedLines;  
}



//apply the accelerator in the lines by acomplishing more than 100%.
function linesAccelerator(allAcomplishmentsListUpdated, allGoalsListUpdated){
  let linesWithAccelerator = [];

  for(let i = 0; i < numberOfGoals; i++){
    if(allAcomplishmentsListUpdated[36+i] >= allGoalsListUpdated[36+i]){
      let accelerator = allAcomplishmentsListUpdated[36+i]/allGoalsListUpdated[36+i];
      if(accelerator >= 1.5){
        linesWithAccelerator.push(1.5);
      } else{
        linesWithAccelerator.push(accelerator);
      }
    }
  }
  return linesWithAccelerator;
}




// applying the boosts in every line target
function applyBoostsAndSum(multipliedLines, boostsMultiplier){
  let total = multipliedLines.reduce(function(total, number){
    return total + number;
  }, 0);
  return total * boostsMultiplier;
}




//Main Function
function generateResults(){ 
  let alertAnswer = saveAlert();
  if(alertAnswer){

    // display the totals card
    let cardTotals = document.querySelector('#card-totals');
    cardTotals.classList.remove('card-hide');

    // filling the "totals" fields with the blocks lines sum.
    calculateTotals();
    
    //calculateFinalLines(); - not used in this version

    // creating an updatted list of goals and acomplishments, now with the "totals" values too.
    const allGoalsListUpdated = allGoals();
    const allAcomplishmentsListUpdated = allAcomplishments();  

    // calculating and displayng the number of lines acomplished in every block, as well as  the individual lines acomplishment %
    const linesDoneList = calculateLinesDone(numberOfGoals, allGoalsListUpdated, allAcomplishmentsListUpdated)
    displayLinesDone(linesDoneList);
    showMonthGoalsAcomplishments(numberOfGoals, allGoalsListUpdated, allAcomplishmentsListUpdated);

    // calculating the global lines multiplier, the boosts multiplier, eligible lines and their respective target values and finally calculating the total amount
    const linesMultiplier = calculateLinesMultiplier(allGoalsListUpdated, allAcomplishmentsListUpdated);
    const boostsMultiplier = calculateBoostsMultiplier();
    const elegibleLinesList = elegibleLines(numberOfGoals, allGoalsListUpdated, allAcomplishmentsListUpdated);
    const linesWithAccelerator = linesAccelerator(allAcomplishmentsListUpdated, allGoalsListUpdated);
    const multipliedLines = multiplyLines(elegibleLinesList, linesMultiplier, linesWithAccelerator);
    const finalValue = applyBoostsAndSum(multipliedLines, boostsMultiplier);

    // displaying the total amount earned
    const finalValueOutput = document.querySelector('#results__value');
    finalValueOutput.innerHTML = finalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});   

    // saving the values into the choosen profile for further use
    saveProfileData();    
  }  
}
