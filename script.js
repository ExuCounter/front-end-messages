let chatTabs = document.querySelectorAll('.chat-tab');
let welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading');
let allContactsBtn = document.querySelector('.all-contacts-btn');
let welcomeChatScreen = document.querySelector('.welcome-chat');
let allContactsScreen = document.querySelector('.all-contacts');
let chatRightColumn = document.querySelector('.chat-right-col');
let createChatButtons = document.querySelectorAll('.create-chat-btn');
let newChatScreen = document.querySelector('.new-chat-start');
let cancelCreateChatButtons = document.querySelectorAll('.cancel-chat-btn');
let contactHeadCheckBoxes = document.querySelectorAll('.contact-head-label input');
let contactHeadSubCheckBoxes = document.querySelectorAll('.parent-checkbox-sub input');
let addUsersScreen = document.querySelector('.add-users');
let addUsersBtn = document.querySelector('.chat--create-btn');
let leftColMessages = document.querySelectorAll('.left-col-message');
let finishCreateChatBtn = document.querySelector('.finish-create-chat--btn');
let chatScreen = document.querySelector('.chat');
let sendMessageCol = document.querySelector('.send-messages-col');
let chatFooterTextarea = document.querySelector('.chat-footer textarea');
let chatFooterSubmitCol = document.querySelector('.submit-col');

sendMessageCol.addEventListener('click', ()=>{
    chatFooterTextarea.focus();
})

finishCreateChatBtn.addEventListener('click', ()=>{
    activeScreen(screens, 4);
    document.body.style.overflowY = 'hidden';
});

leftColMessages.forEach((message)=>{
    message.addEventListener('click', ()=>{
        if(!(message.classList.contains('active'))){
            leftColMessages.forEach((item)=>{
                item.classList.remove('active');
            });
            if(message.querySelector('.unread-messages')){
                message.querySelector('.unread-messages').style.display = 'none';
            }
            message.classList.add('active');
        }
    });
})

contactHeadCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', ()=>{
        if(checkbox.checked === true){
            checkbox.closest('.accord-contact-head').querySelectorAll('.accord-description-container input').forEach((item)=>{
                item.checked = true;
            })
        }
        else{
            checkbox.closest('.accord-contact-head').querySelectorAll('.accord-description-container input').forEach((item)=>{
                item.checked = false;
            })
        }
    })
});

contactHeadSubCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', ()=>{
        if(checkbox.checked === true){
            checkbox.closest('.contact-group').querySelectorAll('.accord-description input').forEach((item)=>{
                item.checked = true;
            })
        }
        else{
            checkbox.closest('.contact-group').querySelectorAll('.accord-description input').forEach((item)=>{
                item.checked = false;
            })
        }
    })
});

let screens = [welcomeChatScreen, allContactsScreen, newChatScreen, addUsersScreen, chatScreen];

/* Функция для отключения всех экранов,
   кроме одного по индексу */

function activeScreen(screens, index){
    screens.forEach((item)=>{
        item.classList.remove('active');
    })  
    screens[index].classList.add('active');
}
/* Мои чаты и Отслеживаемые чаты вкладки */

chatTabs.forEach((item)=>{
    item.addEventListener('click', ()=>{
        activeScreen(screens, 0);

        chatTabs.forEach((item)=>{
            item.classList.remove('active'); 
        });
        createChatButtons.forEach((item)=>{
            item.classList.remove('disabled');
        });

        allContactsBtn.classList.remove('active');

        if(!(item.classList.contains('active')) && item.classList.contains('admin')){
            item.classList.add('active');
            welcomeChatHeading.innerHTML = `Добро пожаловать в автоматически<br> отслеживаемые чаты!`
        }
        if(!(item.classList.contains('active')) && !(item.classList.contains('admin'))){
            item.classList.add('active');
            welcomeChatHeading.innerHTML = ` Добро пожаловать `
        }
    });
})

/* Вкладка все контакты */

allContactsBtn.addEventListener('click', ()=>{
    if(allContactsBtn.classList.contains('active')){
        activeScreen(screens, 0);
        allContactsBtn.classList.remove('active');
    }
    else{
        activeScreen(screens, 1);
        allContactsBtn.classList.add('active');
        createChatButtons.forEach((item)=>{
            item.classList.remove('disabled');
        });
        
    }
});

/* Листенеры на кнопки "Создать чат" */

createChatButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        if(!(btn.classList.contains('disabled'))){
            activeScreen(screens, 2);
            createChatButtons.forEach((btn)=>{
                btn.classList.add('disabled');
            });
            allContactsBtn.classList.remove('active');
        }
        else{
            activeScreen(screens, 0);
            createChatButtons.forEach((btn)=>{
                btn.classList.remove('disabled');
            });
        }
    });
})

/* Листенер на кнопку "отменить создание чата" */

cancelCreateChatButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        createChatButtons.forEach((btn)=>{
            btn.classList.remove('disabled');
        });
        activeScreen(screens, 0);
    });
})

/* Кнопка добавления людей в группу */

addUsersBtn.addEventListener('click', ()=>{
    activeScreen(screens, 3);
});


/* TEXTAREA AUTORESIZE */

let hiddenDiv = document.createElement('div'),
    content = null;

// Adds a class to all textareas
chatFooterTextarea.classList.add('txtstuff');

hiddenDiv.classList.add('txta');
hiddenDiv.style.display = 'none';
hiddenDiv.style.whiteSpace = 'pre-wrap';
hiddenDiv.style.wordWrap = 'break-word';

    chatFooterTextarea.addEventListener('input', function() {
      
      // Append hiddendiv to parent of textarea, so the size is correct
      chatFooterTextarea.parentNode.appendChild(hiddenDiv);
      
      // Remove this if you want the user to be able to resize it in modern browsers
      chatFooterTextarea.style.resize = 'none';
      
      // This removes scrollbars
      chatFooterTextarea.style.overflow = 'hidden';

      // Every input/change, grab the content
      content = chatFooterTextarea.value;

      // Add the same content to the hidden div
      
      // This is for old IE
      content = content.replace(/\n/g, '<br>');
      
      // The <br ..> part is for old IE
      // This also fixes the jumpy way the textarea grows if line-height isn't included
      hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      hiddenDiv.style.visibility = 'hidden';
      hiddenDiv.style.display = 'block';
      chatFooterTextarea.style.height = hiddenDiv.offsetHeight + 'px';

      // Make the hidden div display:none again
      hiddenDiv.style.visibility = 'visible';
      hiddenDiv.style.display = 'none';
    });