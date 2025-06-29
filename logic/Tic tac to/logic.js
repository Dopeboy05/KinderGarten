let boxes=document.querySelectorAll(".boxes");
let reset=document.querySelector("#reset");
let wineMasage=document.querySelector(".wineMasage");
let msg=document.querySelector("#msg");
let newgame=document.querySelector("#newgame");
let turn0=true;
console.dir(boxes);
const winpattern=[
     [0,1,2],
     [0,3,6],
     [0,4,8],
     [1,4,7],
     [2,5,8],
     [2,4,6],
     [3,4,5],
     [6,7,8],
];
const wineMas=(a)=>{
     msg.innerText=`Congratulations,winer is ${a}`;
     wineMasage.classList.remove("hide");
     disablebox();

}
const disablebox=()=>{
     for(let box of boxes)
     {
          box.disabled=true;
     }
}
const enablebox=()=>{
     for(let box of boxes)
     {
          box.disabled=false;
          box.innerText=""
          wineMasage.classList.add("hide");

     }
}
newgame.addEventListener("click",enablebox);
reset.addEventListener("click",enablebox);
    
boxes.forEach((box)=> {
     box.addEventListener("click",()=>{        
        if(turn0){
          box.innerText="O";
          turn0=false;

        }
        else{
          box.innerText="X";
          turn0=true;
          
        }
        box.disabled=true;
        chakeWinner();
          

   });
 });

 const chakeWinner=()=>{
     for(let pattern of winpattern )
     {
          //  console.log(pattern[0],pattern[1],pattern[2]);
          //console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
          let value1=boxes[pattern[0]].innerText;
         // console.log(value1);
          let value2=boxes[pattern[1]].innerText;
          //console.log(value2);
          let value3=boxes[pattern[2]].innerText;
         // console.log(value3);
          

          if(value1!="" && value2!="" && value3!=""){
               if(value1===value2 && value2===value3)
               {
                    console.log("winer");
                    wineMas(value1);
               }
          }
     }
}


