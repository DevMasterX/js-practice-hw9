const t=document.querySelector(".js-start"),e=document.querySelector(".js-container");t.addEventListener("click",(function(){[...e.children].forEach(((t,e)=>t.textContent="")),[...e.children].forEach(((t,e)=>{return(n=e,new Promise(((t,e)=>{setTimeout((()=>{Math.random()>.55?t("💵"):e("❌")}),1e3*n+1e3)}))).then((e=>{t.textContent=e})).catch((e=>{t.textContent=e}));var n}))}));
//# sourceMappingURL=03-promises.1408a847.js.map
