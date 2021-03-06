//ADD new To do 
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const popup = document.querySelector('.popup');
const gPop = document.querySelector('.popup-wrapper');
const btn = document.querySelector('.btn');
const search = document.querySelector('.search input');
gPop.style.display = "none";


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre afficher (time control)*/
function start(duree)
{
var o=document.getElementById("sp");
if(duree > 0)
{
o.innerHTML = duree;
gPop.style.display = "block";
setTimeout("start("+duree+" -1)", 1000);
}
else
{
   alert("enter a valid to do");
o.innerHTML ="Au revoir";
gPop.style.display="none";
popup.style.visibility ="hidden";

}};


/* Function Creation dynamique du POPUP */

function create(){
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id','closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
   <span id="sp">1</span>
   <h2>Fill the Input</h2>
   <p>Don't forget</p>
   <a href="#">Return</a>`;
   div2.innerHTML=html;
   popup.append(div2); 
   
}

/* Function generation dynamique des TODOS */

const generateTemp = todo =>{
   const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
             <span>${todo}</span>
             <i class="fas fa-trash delete"></i>
            </li>
   `;  
   list.innerHTML += html;
};


/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

	node.addEventListener(type, function(e) {
	
		e.target.removeEventListener(e.type, arguments.callee);

		return callback(e);
	});
}

onetime(gPop,'click',handler);

    function handler(e){
         
      if(e.target.id='closing'){
   
         gPop.style.display ="none";
   }
}

/***************Fin reusable function********************/




/************* Adding TO DO**************/

function addElement () {
   let Input = document.querySelector(".add input");
   if (Input.value !== "") {
      generateTemp(Input.value);
      TheTodoS.push(Input.value);
      Input.value = "";
   } else {
      create();
      start(5000);
   }
}

//Eventlistner Add TODOS
   let TheTodoS = [];
   btn.addEventListener('click', addElement);
   
/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/
list.addEventListener('click',e =>{
   list.addEventListener('click', e => {
      let targets = e.target;
      if (targets.matches("i")) {
         targets.parentElement.remove()
        let x =  targets.parentElement.firstElementChild.textContent.toUpperCase();
        let theIndex = TheTodoS.indexOf(x);
        TheTodoS.splice(theIndex, 1);
      }
   });
});

/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 
 
const retrieve = (e) => {
   let elem = e.target.value.toUpperCase();
   var TheTodos = Array.from(list.children);
   let inclo = TheTodos.filter(e => {
         let cont = e.firstElementChild.textContent;
         return !cont.toUpperCase().indexOf(elem) !== -1;
      })
      .forEach(e => e.classList.add('filtre'))
   let Ninclo = TheTodos.filter(e => {
         let cont = e.firstElementChild.textContent;
         return cont.toUpperCase().indexOf(elem) !== -1;
      })
      .forEach(e => e.classList.remove('filtre'))

   //function pour faire un filtre i
};

//evenement de recherche des mots clés 
search.addEventListener('keyup', (e) =>{
   retrieve(e)
})

/*************************************Fin SEARCH ITEM********************************************/
window.addEventListener("beforeunload", e => localStorage.setItem('TheTodoS' , JSON.stringify(TheTodoS)))
window.addEventListener("load" ,function (){
   let local = localStorage.getItem('TheTodoS');
   local = JSON.parse(local);
   for (let i = 0 ; i < local.length ;i++){
      TheTodoS.push(local[i]);
      generateTemp(local[i]);
   }
  
} )


