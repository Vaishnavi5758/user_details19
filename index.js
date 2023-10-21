



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
    
     
    var  user = {
        amount: amount.value ,
        description: description.value,
        category:category.value
      };
    
    
      axios.post("https://crudcrud.com/api/f9b65d1342664beaa905477f70ec401d/userData",user)
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


window.addEventListener("DOMContentLoaded",()=>{
   
    axios.get("https://crudcrud.com/api/f9b65d1342664beaa905477f70ec401d/userData")
    .then((response)=>{

        for(var i=0;i<response.data.length;i++){
        showNewUserOnScreen(response.data[i]);
        }
      //  console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
})


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

            var textContent = '';

            // Iterate through child nodes of the <li> element
            for (var node of li.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    textContent += node.textContent;
                }
            }
    
            // Trim the combined text content
            textContent = textContent.trim();

             // Split the itemText into parts to extract "amount" and "description"
        const parts = textContent.split('-');

        // Create an object with the data you want to send to the server
        const finalText = {
            amount: parts[0].trim(),
            description: parts[1].trim(),
            category:parts[2].trim(),
        };
            
           // var itemText = li.textContent;
            console.log(finalText);

           // const searchText = 100100 - lucky- movie;
   
           // Fetch the data from the server and then delete the item
      fetchItemsFromServer()
      .then(data => {
        const itemToDelete = findItemInData(data, finalText);
        if (itemToDelete) {
          deleteItemFromServer(itemToDelete._id)
            .then(() => {
              console.log('Item deleted successfully on the server.');
              // Remove the <li> element from the DOM
              li.remove();
            })
            .catch(error => {
              console.log('Error deleting item on the server:', error);
            });
        } else {
          console.log('Item not found in the server data. Unable to delete.');
        }
      });
  }
}
}

// Function to fetch data from the server (replace with your server's logic)
function fetchItemsFromServer() {
return axios.get('https://crudcrud.com/api/f9b65d1342664beaa905477f70ec401d/userData')
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error fetching data from the server:', error);
    throw error;
  });
}

// Function to find an item in the data based on finalText
function findItemInData(data, finalText) {
return data.find(item => item.amount === finalText.amount && item.description === finalText.description && item.category === finalText.category);
}

// Function to delete an item from the server
function deleteItemFromServer(itemId) {
return axios.delete(`https://crudcrud.com/api/f9b65d1342664beaa905477f70ec401d/userData/${itemId}`);
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
