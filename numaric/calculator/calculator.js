let mode=document.querySelector(".mode");
let body=document.querySelector("body")
let tog="light";
 mode.addEventListener("click",(f)=>{
    console.log("mode is cliked")
    if(tog==="light")
    {
         body.classList.add("dark");
         body.classList.remove("light");
         tog="dark";

    }
    else{
        body.classList.add("light");
        body.classList.remove("dark");
         tog="light";

    }

 });
