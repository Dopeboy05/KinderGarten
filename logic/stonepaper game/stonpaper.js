choices=document.querySelectorAll(".choise");
let comscore=0;
let userscore=0;

const computerchoise=()=>{

    let cop=["rock","paper","scissors"];
    let index=Math.floor(Math.random()*3);
    const comChoice=cop[index];
    return comChoice;
    };
    

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const userChoice = choice.getAttribute("id");
      playgame(userChoice);
    });
  });
  
  const playgame=(userChoice)=>{
     
    const comChoice=computerchoise();
    console.log(userChoice);
    console.log(comChoice);
     
    
    if(userChoice===comChoice){
      equal();
    }
    else{
      let usrerwin=true;

    if(userChoice==="rock")
    {
      usrerwin=comChoice==="scissors"?true:false;
    }
    else if(userChoice==="paper")
    {
      usrerwin=comChoice==="rock"?true:false;
    }
    else if(userChoice==="scissors")
    {
      usrerwin=comChoice==="paper"?true:false;
    }
    console.log(usrerwin);
  showmsg(usrerwin,userChoice,comChoice);
  }
  
}

let mas=document.querySelector("#mas");
let msgCounter=document.querySelector(".msgCounter");

const equal=()=>{
  mas.innerText="The match is draw";
  mas.style.backgroundColor="blue";
  mas.style.color="white";
  console.log("deraw");

}
let comScor=document.querySelector("#comScor");
let userScor=document.querySelector("#userScor");

const showmsg=(usrerwin,userChoice,comChoice)=>{
  if(usrerwin===true)
  {
    mas.innerText=`You win! Your ${userChoice} beats ${comChoice}`;
    mas.style.backgroundColor="green";
    mas.style.color="white";
    userscore++;
    userScor.innerText=userscore;


  }
  else{
    mas.innerText=`You lost. ${comChoice} beats your ${userChoice}`;
    mas.style.backgroundColor="red";
    mas.style.color="white";
    comscore++;
    comScor.innerText=comscore;
    
  }

}