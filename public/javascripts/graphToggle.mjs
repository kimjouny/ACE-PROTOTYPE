const graphToggle=(e,toggleComponent)=>{
    if(e.target.tagName!=='LI'||e.target.classList.length>=2)return;
    const TOGGLE_BTNS=e.currentTarget.getElementsByClassName('graph_toggle');
    TOGGLE_BTNS[e.target.value].classList.add('gt_focused');
    TOGGLE_BTNS[Math.abs(e.target.value-1)].classList.remove('gt_focused');    
    if(e.target.value){
        toggleComponent[0].style.left="-110%";
        toggleComponent[1].style.left="0%";
    }
    else{
        toggleComponent[0].style.left="0%";
        toggleComponent[1].style.left="110%";
    }
}

export {graphToggle};