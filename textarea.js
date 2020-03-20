
let chatFooterTextarea = document.querySelector('.chat-footer textarea');

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
