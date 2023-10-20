
const myForm = document.querySelector('#myForm');
const amount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const usersList = document.querySelector('#data');

console.log("amount");
console.log("description");


myForm.addEventListener("submit",onsubmit);



function onsubmit(e){

    e.preventDefault();
    
     
    var user = {
        amount: amount.value ,
        description: description.value,
        category:category.value
      };
    
    
      axios.post("https://crudcrud.com/api/27776cfaaf89452585b89847929eaf34/userData",user)
      .then((response)=>{
          showNewUserOnScreen(response.data);
          console.log(response)
      })
      .catch((error)=>{
          console.log(error)
      })
 
  // Clear fields
  amount.value = '';
  description.value = '';
}


 function showNewUserOnScreen(user){
    const li= document.createElement('li');
    
    li.appendChild(document.createTextNode(`${user.amount} - ${user.description}- ${user.category}` ));

     const deleteButton = createDeleteButton();
     const editButton = createEditButton();
      
    const span = document.createElement('span');
    span.appendChild(deleteButton);
    span.appendChild(editButton);


     li.appendChild(span);
     usersList.appendChild(li);
     console.log(usersList);

 }

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.type="delete-btn";
    deleteButton.addEventListener('click', onDelete);
    return deleteButton;
  
}


function createEditButton() {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.addEventListener('click', onEdit);
    return editButton;
}

function onDelete(e) {
    
    if(e.target.classList.contains('delete-btn')){
        if(confirm('Are you sure?')){
            var li =e.target.parentElement.parentElement;
            console.log(li);
          
   // Remove the <li> element from the DOM
   usersList.removeChild(li);
        }
    }
}

function onEdit(e) {
    // Get the parent <li> element when "Edit" is clicked
    var li =e.target.parentElement.parentElement;
    usersList.removeChild(li);

    // If the clicked button has the class "edit-btn" and the parent <li> is found
    if (e.target.classList.contains('edit-btn') && li) {
        var textContent = '';

        // Iterate through child nodes of the <li> element
        for (var node of li.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                textContent += node.textContent;
            }
        }

        // Trim the combined text content
        textContent = textContent.trim();
        console.log(textContent);

        // Split the text content to get individual values
        var values = textContent.split('-');
        
    
            // Populate the input fields with the extracted values
           document.getElementById('amount').value = values[0];
            document.getElementById('description').value = values[1];
           document.getElementById('category').value = values[2];
        
    }
}
