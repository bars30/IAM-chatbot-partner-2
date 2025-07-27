import { botEnReplies } from "./lang/bot-replies.en.js";
import { botDeReplies } from "./lang/bot-replies.de.js";
import { uiTexts as enTexts } from "./lang/ui-texts.en.js";
import { uiTexts as deTexts } from "./lang/ui-texts.de.js";


document.addEventListener("DOMContentLoaded", () => {


  const langButtons = document.querySelectorAll('.lang-option');

  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log("🎁🎁🎁🎁🎁");
      
      langButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const selectedLang = button.dataset.lang;
      console.log(selectedLang);
    });
  });

let firstMessage = true;
let currentLang = localStorage.getItem("lang") || "en";
if (localStorage.getItem("lang")) {
  console.log( localStorage.getItem("lang"));
  const l =localStorage.getItem("lang");
console.log(4);

  console.log(langButtons);
  langButtons.forEach(btn => btn.classList.remove('active'));
  langButtons.forEach(button => {
  
      console.log("🎁🎁🎁🎁🎁");
      
      
      // button.classList.add('active');
      // const selectedLang = button.dataset.lang;
      // console.log(selectedLang);
      console.log(button.dataset.lang);
      if (button.dataset.lang == l) {
        button.classList.add('active');
        console.log("🎁🎁🎁🎁🎁");
        
      } else {
        console.log(45);
        
      }
  setTimeout(() => {
    updateUIText();
  }, 100);
});

}
console.log("🥶🥶🥶🥶🥶🥶", currentLang);


  document.querySelectorAll(".lang-option").forEach(button => {
    button.addEventListener("click", () => {
      console.log("🔥🔥🔥🔥🔥");
      
      const lang = button.getAttribute("data-lang");
      currentLang = lang;
      localStorage.setItem("lang", lang);
    
      updateUIText();
      // clearChat();
    });
  });



  const promptTranslations = {
  "Why Companies Choose Us": "Warum Unternehmen uns wählen",
  "Services for Clients": "Dienstleistungen für Kunden",
  "Hiring Process": "Einstellungsprozess",
  "Technological Expertise & Roles": "Technologisches Fachwissen",
  "IAM Talent Network": "IAM Talent-Netzwerk",
  "Story & Purpose": "Geschichte & Zweck",
  "Team": "Team",
  "For IAM Professionals": "Für IAM-Profis",
  "Contact": "Kontakt",
  "Career Consultation": "Karriereberatung",
  "Send Us Your CV": "Senden Sie uns Ihren Lebenslauf"
};
const reversePromptTranslations = Object.fromEntries(
  Object.entries(promptTranslations).map(([en, de]) => [de, en])
);


function updateUIText() {
  const texts = currentLang === "de" ? deTexts : enTexts;


  // Title
  document.title = texts.siteTitle;

  // Header block
  document.querySelector(".logo-header-title").textContent = texts.siteTitle;
  document.querySelector(".logo-header-subtitle").textContent = texts.siteSubtitle;

  // Chat greeting block
  document.querySelector(".quick-prompts-header").innerHTML = texts.greetingHeader;
  document.querySelector(".quick-prompts-subtitle").textContent = texts.greetingSub;

  // Input placeholder
  document.querySelector("#chatbox-input").placeholder = texts.placeholder;




  // Footer buttons (Clear, Classic, Questions)
  document.querySelectorAll(".clear-btn").forEach(btn => {
    btn.textContent = texts.buttons.clear;
  });

  document.querySelector(".chatbox-footer-btn-questions").textContent = texts.buttons.questions;
  document.querySelector(".chatbox-footer-btn[onclick]").querySelector("span").textContent = texts.buttons.questions;

  // Footer legal text
  document.querySelector("footer p").textContent = texts.footer.copyright;

  // Footer legal buttons
  const footerBtns = document.querySelectorAll(".footer-btn p");
  if (footerBtns.length >= 2) {
    footerBtns[0].textContent = texts.footer.imprint;
    footerBtns[1].textContent = texts.footer.privacy;
  }

const menuButtons = document.querySelectorAll(".quick-prompts-btn");
menuButtons.forEach((btn) => {
  const currentText = btn.textContent.trim();

  // 👇 Ստուգում ենք `prompt`-ը ըստ լեզվի՝ և՛ EN, և՛ DE ուղղությամբ
  const prompt = 
    currentLang === "de" 
      ? Object.keys(promptTranslations).find(key => promptTranslations[key] === currentText) || currentText
      : reversePromptTranslations[currentText] || currentText;

  // ✅ Ստեղծում ենք data-prompt (EN քի)
  btn.dataset.prompt = prompt;

  // ✅ UI-ում դնում ենք համապատասխան լեզվով ցուցադրվող տեքստ
  if (currentLang === "de" && promptTranslations[prompt]) {
    btn.textContent = promptTranslations[prompt];
  }

  if (currentLang === "en") {
    btn.textContent = prompt;
  }
});


}




  const promptButtons = document.querySelectorAll(".quick-prompts-btn");
  const promptsSection = document.querySelector(".quick-prompts");
  const chatboxMessages = document.querySelector(".chatbox-messages");
  const questionsBtn = document.querySelector(".chatbox-footer-btn-questions");
  const input = document.querySelector(".send-message");



function restoreChatHistory() {
  const savedHistory = localStorage.getItem("chatHistory");
  if (!savedHistory) return;

  let chatData = JSON.parse(savedHistory);

  if (
    chatData.length >= 2 &&
    chatData[chatData.length - 1].sender === "bot" &&
    chatData[chatData.length - 1].text.replace(/<[^>]*>/g, '').trim() === ""
  ) {
    chatData.splice(chatData.length - 2, 2);
  }

  chatData.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${msg.sender}-message`;
    msgDiv.innerHTML = msg.text;
    chatboxMessages.appendChild(msgDiv);
  });

  if (chatData.length > 0) {
    promptsSection.style.display = "none";
    chatboxMessages.style.display = "flex";
    input.classList.add("shrink");
    questionsBtn.classList.add("visible");

chatboxMessages.style.scrollBehavior = "auto";
chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
chatboxMessages.style.scrollBehavior = ""; // reset to default (smooth) եթե պետք լինի հետո

  }
}


  restoreChatHistory();
function typeText(container, text, delay = 15, callback) {
  let i = 0;
  container.textContent = '';
  const interval = setInterval(() => {
    container.textContent += text.charAt(i);
    i++;


    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 7);
}

function typeTextHTML(container, html, delay = 20, callback) {
  container.innerHTML = ''; 

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const nodes = Array.from(tempDiv.childNodes);

  let currentIndex = 0;

  function typeNextNode() {
    if (currentIndex >= nodes.length) {
      if (callback) callback();
      return;
    }

    const node = nodes[currentIndex];
    
    if (node.nodeType === Node.TEXT_NODE) {
      console.log("spaaaaaaaaaaaaaaaaaaaaan");
      
      const span = document.createElement("span");
      container.appendChild(span);
console.log(span, "🦋");

      typeText(span, node.textContent, delay, () => {
        currentIndex++;
        typeNextNode();
        console.log(span, "🦋");
        console.log(!span.textContent.trim(), "🔥");
        if (!span.textContent.trim()) {
    span.remove(); // ջնջում ենք DOM-ից
  } else {
    console.log(span, "🫣🫣🫣🫣");
  }
      });

    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false); 
      container.appendChild(clone);

      // 🧼 Մաքրում ենք node.innerHTML-ից դատարկ span-ները
      let childHTML = node.innerHTML;

      const temp = document.createElement("div");
      temp.innerHTML = childHTML;

      temp.querySelectorAll("span").forEach((el) => {
        if (!el.textContent.trim()) {
          el.remove();
        }
      });

      childHTML = temp.innerHTML;

      typeTextHTML(clone, childHTML, delay, () => {
        currentIndex++;
        typeNextNode();
      });

    } else {
      currentIndex++;
      typeNextNode();
    }
  }

  typeNextNode();
}


function getBotReply(prompt) {
  if (currentLang === "de") {
    return botDeReplies[prompt] || "<p>Antwort nicht gefunden.</p>";
  } else {
    return botEnReplies[prompt] || "<p>Reply not found.</p>";
  }
}
  promptButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedPrompt = btn.textContent;
console.log("🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻");

      promptButtons.forEach(b => b.disabled = true);
      promptsSection.classList.add("fade-out");

      setTimeout(() => {
        promptsSection.style.display = "none";
        chatboxMessages.style.display = "flex";
        input.classList.add("shrink");
        setTimeout(() => {
          questionsBtn.classList.add("visible");
        }, 200);
      

        const userMsg = document.createElement("div");
        userMsg.className = "message user-message";
        const userP = document.createElement("p");
        userP.textContent = selectedPrompt;
        userMsg.appendChild(userP);
        chatboxMessages.appendChild(userMsg);
        saveChatHistory();
  console.log("🔥", localStorage.getItem('chatHistory'));

  console.log("🔥🦋", localStorage.getItem('chatHistory'));
  console.log("✅✅✅✅✅✅✅✅", !localStorage.getItem('chatHistory'));
  
  if (firstMessage && !!localStorage.getItem('chatHistory')) {
    setTimeout(() => {
          chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
        }, 50); 
        console.log("ssssssss");
        
    
  } else if (firstMessage && !localStorage.getItem('chatHistory')) {
    console.log(1);
    
  }
  else {
    setTimeout(() => {
          chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
        }, 50); 
  }

        // setTimeout(() => {
        //   userMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // }, 50); 

        const botMsg = document.createElement("div");
        botMsg.className = "message bot-message";
        const botP = document.createElement("p");
        botMsg.appendChild(botP);
        chatboxMessages.appendChild(botMsg);
        saveChatHistory();
  console.log("2🔥", localStorage.getItem('chatHistory'));



        if (firstMessage) {
          console.log('first message');
          firstMessage = false;
          botMsg.classList.add("new-bot-message");
        } else {
          console.log("🎀🎀🎀🎀🎀🎀🎀🎀🎀");
          
          const element = document.querySelector('.new-bot-message');
          if (element) {
            element.classList.remove("new-bot-message");
          }
          console.log('not first message');
          botMsg.classList.add("new-bot-message");
        }

      saveChatHistory();
  console.log("🔥33", localStorage.getItem('chatHistory'));
console.log("botp", botP);
console.log(getBotReply(selectedPrompt));

questionsBtn.disabled = true;
langButtons.forEach(b => b.disabled = true);
sendBtn.disabled = true;

typeTextHTML(botP, getBotReply(selectedPrompt), 20, () => {
  questionsBtn.disabled = false;
  langButtons.forEach(b => b.disabled = !true);
sendBtn.disabled = !true;
  saveChatHistory();
});
      }, 400);
    });
  });

  questionsBtn.addEventListener("click", () => {
    const footerPrompts = document.querySelector(".quick-prompts-footer");
    if (footerPrompts.style.display === "flex") {
      footerPrompts.classList.remove("fade-in");
      footerPrompts.classList.add("fade-out");
      setTimeout(() => {
        footerPrompts.style.display = "none";
      }, 300);
    } else {
      footerPrompts.style.display = "flex";
      footerPrompts.classList.remove("fade-out");
      footerPrompts.classList.add("fade-in");
    }
  });


const footerPromptButtons = document.querySelectorAll('.quick-prompts-footer .quick-prompts-btn');
const footerPrompts = document.querySelector(".quick-prompts-footer");

footerPromptButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    footerPrompts.classList.remove("fade-in");
    footerPrompts.classList.add("fade-out");
    setTimeout(() => {
      footerPrompts.style.display = "none";
    }, 300);
  });
});

const textarea = document.getElementById('chatbox-input');

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; 
  this.style.height = Math.min(this.scrollHeight, 80) + 'px'; 
});





let chatState = "waitingUserQuestion"; 

const chatboxInput = document.getElementById("chatbox-input");
const sendBtn = document.querySelector(".chatbox-send-btn");

function addMessage(text, sender = "bot", animated = false, callback, file = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}-message`;

  if (file) {
    console.log("📂 File mode enabled");
    console.log(text);
    msgDiv.innerHTML = text;
    chatboxMessages.appendChild(msgDiv);

    // chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

    saveChatHistory();
    return msgDiv; // ✅ return, որ մնացած կոդը չաշխատի
  }

  // 👇 սա կաշխատի միայն եթե file === false
  const p = document.createElement("p");
  msgDiv.appendChild(p);
  chatboxMessages.appendChild(msgDiv);

  const isSimpleText = !/<[^>]+>/.test(text);

  if (animated && !isSimpleText) {
    typeTextHTML(p, text, 20, () => {
      // chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

      if (callback) callback();
    });
  } else {
    p.innerHTML = text;
    // chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

    if (callback) callback();
  }

  saveChatHistory();
  return msgDiv;
}


function saveChatHistory() {
  const messages = document.querySelectorAll(".chatbox-messages .message");
  const chatData = [];

  messages.forEach((msg) => {
    chatData.push({
      sender: msg.classList.contains("user-message") ? "user" : "bot",
      text: msg.innerHTML
    });
  });

  localStorage.setItem("chatHistory", JSON.stringify(chatData));
}



const clearBtns = document.querySelectorAll('.chatbox-footer-btn.clear-btn');

clearBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    
    localStorage.removeItem('chatHistory');
    location.reload();
  });
});

sendBtn.addEventListener("click", () => {
  const userInput = chatboxInput.value.trim();
  if (!userInput && selectedFiles.length === 0) return;

  promptsSection.classList.add("fade-out");
  promptsSection.classList.add("fade-out-display-none");
  questionsBtn.classList.add("visible");

  
  // 1️⃣ Ավելացնում ենք user-ի տեքստը, եթե կա
  if (userInput) {
    console.log("🎀🎀🎀🎀🎀🎀🎀🎀🎀");
    console.log("🎀🎀🎀🎀🎀🎀🎀🎀🎀", userInput);
    
    addMessage(userInput, "user");
  }
// 2️⃣ Եթե ֆայլեր կան՝ ավելացնում ենք նաև ֆայլերի preview-ը
  if (selectedFiles.length > 0) {
    let filesHTML = "";

    selectedFiles.forEach((file) => {
      filesHTML += `
        <div class="file-preview">
          <div class="file-header">
            <img src="./img/file.svg" alt="">
            <span class="file-name">${file.name}</span>
          </div>
        </div>
      `;
    });

    addMessage(filesHTML, "user",  false, null, true); // ֆայլերը կավելանան որպես user-message
    selectedFiles = [];            // մաքրում ենք զանգվածը
    updatePreview();               // մաքրում ենք file-preview-container-ը
    updateFileList();              // reset անում ենք input.files
  }

  chatboxInput.value = "";
  chatboxInput.style.height = "auto";

  

  if (chatState === "waitingUserQuestion") {
    const fullResponse = `
      <p>Thank you for your message!</p>
      <p>To assist you better, please share your <b>full name</b> and <b>email address</b>.</p>
      <p>Unfortunately, I can't answer this question directly, but one of our consultants will reach out to you shortly.</p>
    `;
    // addMessage(fullResponse, "bot");
    const newBotEl = addMessage(fullResponse, "bot");
const element = document.querySelector('.new-bot-message');
          if (element) {
            element.classList.remove("new-bot-message");
          }

newBotEl.classList.add("new-bot-message");
chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

console.log(chatboxMessages);


chatState = "done";
    // chatState = "done";
    


  } else if (chatState === "done") {
const fullResponse = `
      <p>We've already received your info. Our consultant will contact you soon.</p>
    `;
    // addMessage(fullResponse, "bot");
    // const newBotEl = addMessage(fullResponse, "bot");
const newBotEl = addMessage(fullResponse, "bot", false); // առանց անիմացիայի

    const element = document.querySelector('.new-bot-message');
          if (element) {
            element.classList.remove("new-bot-message");
          }

newBotEl.classList.add("new-bot-message");
chatboxMessages.scrollTop = chatboxMessages.scrollHeight;


chatState = "done";
    // chatState = "done";
    

  }
});

const fileInput = document.getElementById("file-upload");
const filePreviewContainer = document.getElementById("file-preview-container");

// Պահում ենք ընտրված ֆայլերը
let selectedFiles = [];

fileInput.addEventListener("change", () => {
  const newFile = fileInput.files[0]; // օգտատերը ամեն անգամ 1 ֆայլ է ընտրում
  if (!newFile) return;

  // Եթե նույն անունով ֆայլ արդեն կա, չավելացնենք կրկնակի
  if (selectedFiles.some(f => f.name === newFile.name)) {
    fileInput.value = ""; // reset input
    return;
  }

  selectedFiles.push(newFile);

  updatePreview();
  updateFileList();
  fileInput.value = ""; // reset, որ հաջորդ ընտրության ժամանակ նորից trigger անի
});

function updatePreview() {
  filePreviewContainer.innerHTML = "";

  selectedFiles.forEach((file, index) => {
    const fileBlock = document.createElement("div");
    fileBlock.className = "file-preview";
    fileBlock.innerHTML = `
      <div class="file-header">
        <img src="./img/file.svg" alt="">
        <span class="file-name">${file.name}</span>
      </div>
      <button class="remove-file">  <img src="./img/close.svg" alt=""></button>
    `;
    filePreviewContainer.appendChild(fileBlock);

    // Ջնջելու event
    fileBlock.querySelector(".remove-file").addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      updatePreview();
      updateFileList();
    });
  });
}

function updateFileList() {
  const dt = new DataTransfer();
  selectedFiles.forEach(f => dt.items.add(f));
  fileInput.files = dt.files;
}




const toggle = document.getElementById("modeToggle");
const root = document.documentElement;
const logoLight = document.getElementById("logo-light");
const logoDark = document.getElementById("logo-dark");

// Սկսենք dark mode-ով
toggle.checked = true;

// Տալ dark mode արժեքները սկզբից
root.style.setProperty('--bg-page', '#19212E');
root.style.setProperty('--bg-chatbox', '#333942');
root.style.setProperty('--bg-language-switch', '#2D343E');
root.style.setProperty('--prompt-bg', '#2E343F');
root.style.setProperty('--prompt-text', '#F1F2F2');
root.style.setProperty('--border-color', '#3A414B');
root.style.setProperty('--text-subtitle', '#B0B8C1');
root.style.setProperty('--text-placeholder', '#A0AAB4');
root.style.setProperty('--text-dark', '#ffffff');
root.style.setProperty('--header-footer', '#333942');
root.style.setProperty('--button-shadow', '#6c788d');

logoLight.style.display = "none";
logoDark.style.display = "inline";

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    // DARK MODE
    root.style.setProperty('--bg-page', '#19212E');
    root.style.setProperty('--bg-chatbox', '#333942');
    root.style.setProperty('--bg-language-switch', '#2D343E');
    root.style.setProperty('--prompt-bg', '#2E343F');
    root.style.setProperty('--prompt-text', '#F1F2F2');
    root.style.setProperty('--border-color', '#3A414B');
    root.style.setProperty('--text-subtitle', '#B0B8C1');
    root.style.setProperty('--text-placeholder', '#A0AAB4');
    root.style.setProperty('--text-dark', '#ffffff');
    root.style.setProperty('--header-footer', '#333942');
    root.style.setProperty('--button-shadow', '#6c788d');
    logoLight.style.display = "none";
    logoDark.style.display = "inline";
  } else {
    // LIGHT MODE
    root.style.setProperty('--bg-page', '#F2F7FD');
    root.style.setProperty('--bg-chatbox', '#ffffffff');
    root.style.setProperty('--bg-language-switch', '#F9F9F9');
    root.style.setProperty('--prompt-bg', '#FDFEFF');
    root.style.setProperty('--prompt-text', '#4A5362');
    root.style.setProperty('--border-color', '#F0F3F7');
    root.style.setProperty('--text-subtitle', '#536073');
    root.style.setProperty('--text-placeholder', '#6F7E93');
    root.style.setProperty('--text-dark', '#1a1a1a');
    root.style.setProperty('--header-footer', '#ffffff');
    root.style.setProperty('--button-shadow', '#c4cfe3');
    logoLight.style.display = "inline";
    logoDark.style.display = "none";
  }
});



});
