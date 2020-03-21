let chatTabs = document.querySelectorAll('.chat-tab');
let welcomeChatHeading = document.querySelector('.welcome-chat .lg-heading');
let allContactsBtn = document.querySelector('.all-contacts-btn');
let welcomeChatScreen = document.querySelector('.welcome-chat');
let allContactsScreen = document.querySelector('.all-contacts');
let chatRightColumn = document.querySelector('.chat-right-col');
let chatLeftColumn = document.querySelector('.chat-left-col');
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
let chatFooterSubmitCol = document.querySelector('.submit-col');
let showInfoButtons = document.querySelectorAll('.show-info-button');
let privateScreen = document.querySelector('.private-chat');
let testChat = document.querySelector('.chat-1');
let testChatCommon = document.querySelector('.chat-2');
let commonChatScreen = document.querySelector('.common-chat');
let seenMessagesScreen = document.querySelector('.seen-messages-screen');
let messageInfoButtons = document.querySelectorAll('.common-chat .message-info-icon');
let commonChatSettingsScreen = document.querySelector('.common-chat-settings');
let chatSettingsButtons = document.querySelectorAll('.chat-settings-btn');
let pushSettingsBtn = document.querySelector('.push-settings--btn');

let screens = [welcomeChatScreen, allContactsScreen, newChatScreen, addUsersScreen, chatScreen, privateScreen, commonChatScreen, seenMessagesScreen, commonChatSettingsScreen];

pushSettingsBtn.addEventListener('click', ()=>{
    activeScreen(screens, 0);
})

chatSettingsButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        activeScreen(screens, 8);
    });
})

testChat.addEventListener('click', ()=>{
    activeScreen(screens, 5);
})

testChatCommon.addEventListener('click', ()=>{
    activeScreen(screens, 6);
})

messageInfoButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        activeScreen(screens, 7);
    })
});

showInfoButtons.forEach((item)=>{
    item.addEventListener('click', ()=>{
        item.closest('.private-chat-info').querySelector('.hide-info').classList.add('active');
        item.classList.add('active');
    });
})

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

// chatLeftColumn.classList.add('hide-screen');
// chatRightColumn.classList.remove('hide-screen');
// activeScreen(screens, 8);

/* Для телефонов стартовый экран */

if(document.documentElement.clientWidth < 768){
    chatLeftColumn.classList.remove('hide-screen');
    chatRightColumn.classList.add('hide-screen');
    chatTabs.forEach((item)=>{
        
        item.addEventListener('click', ()=>{
            chatLeftColumn.classList.remove('hide-screen');
            chatRightColumn.classList.add('hide-screen');

        });
    });

}



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


 /* Показать приватную информацию о пользователе */


 let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for(let screen of screens){
            if(screen.classList.contains('active')){
                chatLeftColumn.classList.add('hide-screen');
                chatRightColumn.classList.add('active');
                chatRightColumn.classList.remove('hide-screen');
            }

        };
    });    
});

// настраиваем наблюдатель
let config = { attributes: true, childList: true, characterData: true }

for(let screen of screens){
    observer.observe(screen, config);
};
