 // Function to save the selected date to localStorage
 function saveDate() {
    const selectedDate = document.getElementById('selectedDate').value;
    localStorage.setItem('selectedDate', selectedDate);
    alert('Date saved successfully!');
  }

  // Function to save the selected date to localStorage
 function saveTimeSlot() {
  const selectedTimeSlot = document.getElementById('selectedtask').value;
  localStorage.setItem('selectedTimeSlot', selectedTimeSlot);
  alert('Time Slot saved successfully!');
}

 
  // Check if a date was previously saved in localStorage
  const savedDate = localStorage.getItem('selectedDate');
  if (savedDate) {
    document.getElementById('selectedDate').value = savedDate;
  }

  var incrementButton = document.getElementsByClassName('inc');
  var decrementButton = document.getElementsByClassName('dec');
  //console.log(incrementButton);
 // console.log(decrementButton);
 //INCREEMENT
 for(var i = 0; i < incrementButton.length; i++){
  var button = incrementButton[i];
  button.addEventListener('click',function(event){

    var buttonClicked = event.target;
   // console.log(buttonClicked);
   var input = buttonClicked.parentElement.children[2];
  // console.log(input);
  var inputValue = input.value;
  //console.log(inputvalue);
  var newValue = parseInt(inputValue)  + 1;
  //console.log(newValue);
  input.value = newValue;

  })
 }

   //DECREMENT
   for(var i = 0; i < decrementButton.length; i++){
    var button = decrementButton[i];
    button.addEventListener('click',function(event){

      var buttonClicked = event.target;
     // console.log(buttonClicked);
     var input = buttonClicked.parentElement.children[2];
    // console.log(input);
    var inputValue = input.value;
    //console.log(inputvalue);
    var newValue = parseInt(inputValue)  - 1;
    //console.log(newValue);
    if (newValue >= 0){
      input.value = newValue;

    }
    else{
      input.value = 0;
     // alert('QTY CAN NOT BE LESS THAN ZERO')
    }

    })
   }

   //Load  saved values from local storage

   for(var i =1; i<=5; i++){
    var savedValue = localStorage.getItem('qty' + i);
    if(savedValue !== null){
      document.getElementById(i).value = savedValue;
    }           
  }

  for(var i = 0; i < incrementButton.length; i++){
    incrementButton[i].addEventListener('click', function (event){
      updateValue(event, 1);

    });
  }

  
  for(var i = 0; i < decrementButton.length; i++){
    decrementButton[i].addEventListener('click', function (event){
      updateValue(event, -1);

    });
  }

  function updateValue(event,change){
    var buttonClicked = event.target;
    var input = buttonClicked.parentElement.children[2];
    var inputId = input.id;
    var inputValue = parseInt(input.value) + change;

    if(inputValue >= 0){
      input.value = inputValue;
      saveToLocalStorage(inputId, inputValue);
    }
  }


  function saveToLocalStorage(inputId, newValue){
    localStorage.setItem('qty-' + inputId, newValue)
  }


  document.querySelector('.select-field').addEventListener('click',()=>{
    document.querySelector('.list').classList.toggle('show');
    document.querySelector('.down-arrow').classList.toggle('rotate180');


    });

    //create a function to Append the pill when use checks
    function appendSelectedChild(childToAppend){
      const selectedtasks = document.querySelector(".selected-tasks");
      selectedtasks.insertAdjacentHTML('beforebegin', childToAppend);

    }
    //lets create a function to remove the pill
    // we will pass id of the related pill
    function removeSelectedChild(id){
      const selectedtask = document.getElementById(id)
        //when we remove any pill, we have to uncheck from list too
        const unCheckRelatedList = document.getElementById(id.split('_')[1]) 
        
        if(unCheckRelatedList.checked === true){
        unCheckRelatedList.checked = false;
        }
        
      selectedtask.parentNode.removeChild(selectedtask);

    }

    //create a function to append items on select 
    function onSelect(e){
      //create an custom id for appended items
      const selected_id ="selected_" + e.target.id;

      //lets create a pill with cross button
      // we will use template literals
      const childToAppend = `<span style ="background-color:white; padding:0.3rem; margin:0.3rem;" id="${selected_id}">${e.target.value}
          <button onclick ="removeSelectedChild('${selected_id}')"></button></span>`

      //now append this child inside selected-tasks div
      appendSelectedChild(childToAppend);
      saveSelectedTasks();
    }


    //create a function to save the selected time slots to localstorage
    function saveSelectedTasks(){
      const selectedTasks = document.querySelectorAll(".selected-tasks span");
      const selectedTasksArray = Array.from(selectedTasks).map(task => task.textContent);
      localStorage.setItem("selectedTasks", JSON.stringify(selectedTasksArray));

    }`  `

    // Load saved tasks from local storage and diplay them
    function loadSavedTasks(){
      const savedTasks =localStorage.getItem("selectedTasks");
      if(savedTasks){
        const selectedTasks = document.querySelector(".selected-tasks");
        const savedTasksArray = JSON.parse(savedTasks);
        savedTasksArray.forEach(task => {
          const selected_id = "selected_" + task.split(" ")[0].replace('.','').replace('-','_');
          const childToAppend = `<span style ="background-color:white; padding:0.3rem;" id="${selected_id}">${task}
            <button onclick="removeSelectedChild('${selected_id}')">X</button></span>`;
          selectedTasks.insertAdjacentHTML('beforeend', childToAppend);
      });
        }

    }

    // Load saved tasks when the page loads
    window.addEventListener('load', loadSavedTasks);

    // Save selected tasks whenever a new task is selected
    document.querySelector('.list').addEventListener('change', (event) => {
        if (event.target.type === "checkbox") {
            saveSelectedTasks();
        }
    });


   