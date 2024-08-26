const items = [
    {
      "id": 0,
      "name": "Rohan",
      "email": "rohan@abc.com",
      "password": "nani"
    },
    {
      "name": "Lalithaaa",
      "email": "lalitha@abc.com",
      "password": "lalli",
      "id": 1
    },
    {
      "name": "Satwik",
      "email": "satwik@abc.com",
      "password": "sevenwick",
      "id": 2
    },
    {
        "name": "Shivani",
        "email": "shivani@abc.com",
        "password": "shivani",
        "id": 3
    }
  ]


export function getAll(){
    return items;
}

export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

export function deleteById(id) {
  let arrayIndex = getArrayIndexForId(id);
  if( arrayIndex >= 0 && arrayIndex < items.length){
    items.splice(arrayIndex,1);
  }
}

export function post(item) {
  let nextid = getNextId();
  item.id = nextid;
  items[items.length] = item;
}

export function put(id, item) {
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      items[i] = item;
      return;
    }
  }
}

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


