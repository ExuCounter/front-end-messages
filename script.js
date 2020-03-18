let chatTabs = document.querySelectorAll('.chat-tab');
let welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading');

chatTabs.forEach((item)=>{
    item.addEventListener('click', ()=>{
        if(!(item.classList.contains('active')) && item.classList.contains('admin')){
            chatTabs.forEach((item)=>{
                item.classList.remove('active'); 
            });
            item.classList.add('active');
            welcomeChatHeading.innerHTML = `
                Добро пожаловать в автоматически<br> отслеживаемые чаты!
            `
        }
        if(!(item.classList.contains('active')) && !(item.classList.contains('admin'))){
            chatTabs.forEach((item)=>{
                item.classList.remove('active'); 
            });
            item.classList.add('active');
            welcomeChatHeading.innerHTML = `
                   Добро пожаловать
            `
        }
    });
})
