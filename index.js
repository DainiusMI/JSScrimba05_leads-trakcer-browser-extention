
let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputButtonEl = document.getElementById('input-button');
const deleteButtonEl = document.getElementById('delete-button');
const saveTabButtonEl = document.getElementById('save-button');
const ulEL = document.getElementById('ul-el');

//   reading from local storage memory
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));  // this line broke once it gained invalid type of data
const tabs = [{url: "https://www.linkedin.com/in/per-harald-borgen/"}];

saveTabButtonEl.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ // selects the active tab that is on top
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads);
    })
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}




function render(parameterVariable) {    // parameterVariable is going to match render(myLeads) functions argument you have entered
    let listItems = '';
    for (let i = 0; i < parameterVariable.length; i++) {
    //    listItems += '<li><a href="https://' + myLeads[i] + '" target="_blank">' + myLeads[i] + "</a></li>";
    //  template strings/literals:
    listItems += `
        <li>
            <a target='_blank' href='${parameterVariable[i]}'>
                ${parameterVariable[i]}
            </a>
        </li>
    `
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
        // create element
        // set text content
        // append to ul
    //    const li = document.createElement("li");
    //    li.textContent = myLeads[i];
    //    ulEL.append(li);   
    }
    ulEL.innerHTML = listItems;
}


inputButtonEl.addEventListener('click', function() {
    myLeads.push(inputEl.value);
    inputEl.value = '';
//   writting to local storage memory
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads);
})


deleteButtonEl.addEventListener('dblclick', function() {
    myLeads = [];
    localStorage.clear();
    ulEL.textContent = ''; // or just invoke render(myLeads) function
})