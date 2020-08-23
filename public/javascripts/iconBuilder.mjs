const ICON_BUILD=()=>{
    const userAgent = navigator.userAgent.toLowerCase(); // 접속 핸드폰 정보 
    // 모바일 홈페이지 바로가기 링크 생성 
    
    if(userAgent.match('iphone')) { 
        document.write('<link rel="apple-touch-icon" href="images/icon_114x114.png" />') 
    } else if(userAgent.match('ipad')) { 
        document.write('<link rel="apple-touch-icon" sizes="72*72" href="images/icon_114x114.png" />') 
    } else if(userAgent.match('ipod')) { 
        document.write('<link rel="apple-touch-icon" href="images/icon_114x114.png" />') 
    } else if(userAgent.match('android')) { 
        document.write('<link rel="shortcut icon" href="images/icon_72x72.png" />') 
    } 
}

export {ICON_BUILD}