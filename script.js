const langButtons = document.querySelectorAll('.lang-option');

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const selectedLang = button.dataset.lang;
    console.log(selectedLang);
  });
});

let firstMessage = true;



document.addEventListener("DOMContentLoaded", () => {


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
    switch (prompt) {
      case "Why Companies Choose Us":
        return `
         <p><b>Seeking Top IAM Talent?</b> We streamline your hiring by delivering pre-vetted experts in <b>Okta, Azure AD, SailPoint, CyberArk,</b> and more. Discover precision talent that fits your exact needs.</p>
        
         <ul>
          <li><b>Deep IAM Specialization:</b> We're not generalists. Our exclusive focus on <b>IAM, PAM, IGA, CIAM, and MIM</b> means we speak your language, understanding complex needs from <b>Zero Trust</b> to <b>DevSecOps with Identity focus.</b></li>
          <li><b>High-Caliber, Vetted Experts:</b> We connect you with experienced <b>IAM Engineers, Architects, and Consultants</b> who thrive in <b>ISO 27001 / SOC 2</b> environments. Our talent is rigorously vetted for technical prowess and cultural fit.</li>
          <li><b>Your Strategic Talent Partner:</b> For <b>CISOs, Heads of IAM, and HR/TA Partners,</b> we're a trusted extension of your team. We quickly deliver IAM-literate candidates, anticipating triggers like new projects (MFA, SSO) or audits, saving you time and effort.</li>
          <li><b>Targeted Market Access:</b> Specializing in Germany's <b>Banking, Tech, Manufacturing, and Pharma</b> sectors, our reach extends across <b>DACH</b> and key <b>EU</b> markets, sourcing both German and English-speaking professionals.</li>
          </ul>
        
          <p><b>Ready to Secure Your Digital Future with the Right IAM Talent? Find Your Next IAM Expert Now.</b></p>
        <img src="./img/sect01.png" class="section-img" alt="">
        
          `;
      case "Services for Clients":
        return `
          <h2>Our Specialized IAM & Cybersecurity Recruitment Services</h2>

<p>Partner with <b>IAM Hiring</b> to overcome your IAM talent challenges. We offer flexible and effective recruitment solutions designed to meet your precise requirements, whether you're expanding your internal IAM team or scaling consulting teams selling IAM services.</p>

<h2>Our Core Talent Solutions:</h2>

<ul>
  <li><b>Permanent Placement (Direct Hire):</b> Securing long-term IAM and Cybersecurity talent is crucial for sustained growth and compliance. We specialize in identifying, attracting, and placing permanent professionals who will integrate seamlessly into your team and strengthen your security posture.
    <ul>
      <li><b>Contingency Search:</b> Our "no win, no fee" model for standard-to-mid-level IAM roles. You only pay upon successful placement, reducing risk for HR/TA Partners.</li>
      <li><b>Retained Search:</b> A dedicated, prioritized search for critical or highly specialized positions, such as IAM Architects, DevSecOps with Identity focus, or IAM Project Managers. This offers exclusive focus, in-depth market mapping, and a guaranteed commitment to finding the ideal candidate within a defined timeframe, addressing CISOs' concerns about long time-to-fill.</li>
      <li><b>Executive Search:</b> For C-level and senior leadership positions (e.g., Chief Identity Officer, VP of IAM Strategy). We employ a discrete and meticulous approach to identify leaders who will shape your organization's security future, particularly for enterprises undergoing significant IAM modernization or Zero Trust rollouts.</li>
    </ul>
  </li>

  <li><b>Contract / Interim IAM Staffing:</b> Need specialized IAM expertise for a specific project, to cover a temporary absence, or to scale up quickly for new initiatives like MFA/SSO deployments? Our network includes highly skilled IAM contractors and interim managers ready to hit the ground running.
    <ul>
      <li>Flexible engagement models to suit project lifecycles.</li>
      <li>Rapid deployment of pre-vetted professionals, crucial for urgent demands from Hiring Managers.</li>
      <li>Access to niche skills for short-to-medium term requirements, especially for PAM or CIAM projects.</li>
      <li>Dedicated account management, ensuring HR/TA Partners receive a true specialist who delivers without wasting time.</li>
    </ul>
  </li>
</ul>

  <img src="./img/sect04.png" class="section-img" alt="">
 <div class="space"></div>

        `;
      case "Hiring Process":
        return `

<p>Our process is designed to overcome talent shortages and ensure a fast, efficient path to the right hire. We address <b>CISOs'</b> goals of reduced risk and <b>IAM Team Leads'</b> needs for strong, reliable teams.</p>

<ol>
  <li><b>In-depth Needs Assessment & Strategy Definition:</b> We begin with a thorough consultation to understand your specific IAM role requirements, company culture, existing tech stack (e.g., CyberArk, ForgeRock, Saviynt), and strategic security roadmap (e.g., Zero Trust). We align on your Hiring Need (2–10 roles/year) and craft a customized search strategy.</li>
  
  <li><b>Targeted Sourcing & Identification of IAM Experts:</b> Leveraging our extensive network across Germany, DACH, and Europe, proprietary database, and advanced active sourcing techniques, we identify passive and active IAM professionals who precisely match your criteria. We prioritize candidates with experience in environments like yours (e.g., ISO 27001, SOC 2).</li>
  
  <li><b>Rigorous Vetting & Specialized Qualification:</b> Every candidate undergoes a detailed interview by our team, including hard-skills screening, soft skills assessment, and cultural fit evaluation. We only present candidates who meet our high standards, addressing Hiring Managers' challenges of finding candidates with deep, specialized experience.</li>
  
  <li><b>Presentation of Top Candidates & Interview Coordination:</b> We provide you with a shortlist of highly qualified candidates, complete with detailed profiles and our expert assessment. We manage all interview scheduling, feedback collection, and logistical arrangements, ensuring HR/TA Partners save time and focus on decision-making.</li>
  
  <li><b>Offer Management & Post-Placement Support:</b> We facilitate offer negotiations, ensuring a smooth and successful acceptance. Our support extends to post-placement follow-ups, ensuring successful integration and satisfaction for both client and candidate, reducing CISOs' concerns about team attrition.</li>
</ol>
<img src="./img/sect05.png" class="section-img" alt="">
 <div class="space"></div>
        `;
      case "Technological Expertise & Roles":
        return `
        <p>Our network comprises professionals skilled in a wide array of industry-leading IAM and related security solutions, ensuring we can match your precise technology requirements:</p>

<p><b>Key IAM & Cybersecurity Roles We Place</b><br>
Our expertise spans the critical positions driving your Identity and Access Management and Cybersecurity initiatives:</p>

<ul>
  <li>IAM Engineers / Architects</li>
  <li>Identity Governance & Administration (IGA) Experts</li>
  <li>Privileged Access Management (PAM) Specialists</li>
  <li>Machine Identity & Secrets Management (MIAM) Experts</li>
  <li>Customer Identity & Access Management (CIAM) Specialists</li>
  <li>IAM Project Managers & Leads</li>
  <li>DevSecOps with Identity focus</li>
  <li>IAM Sales Consultants / Presales Engineers</li>
  <li>IAM Analysts / Administrators</li>
  <li>IAM Consultants (Advisory, Implementation, Integration)</li>
  <li>Cloud IAM Architects (e.g., AWS IAM, Google Cloud IAM)</li>
  <li>IAM Operations Specialist</li>
  <li>Head of IAM / IAM Practice Leader / Head of Infrastructure / Head of Security</li>
  <li>Other Specialized IAM Positions</li>
</ul>

<p><b>Core IAM Platforms:</b></p>
<ul>
  <li>Microsoft Entra ID (formerly Azure Active Directory)</li>
  <li>Okta Workforce Identity Cloud</li>
  <li>Ping Identity</li>
  <li>ForgeRock Identity Platform</li>
  <li>IBM Security Verify</li>
  <li>Oracle Identity Management</li>
  <li>OneLogin</li>
  <li>JumpCloud</li>
  <li>Duo Security (Cisco Duo)</li>
  <li>RSA SecurID</li>
</ul>

<p><b>Identity Governance & Administration (IGA) Platforms:</b></p>
<ul>
  <li>SailPoint Identity Security Cloud</li>
  <li>Saviynt Enterprise Identity Cloud</li>
  <li>Omada Identity Platform</li>
  <li>tenfold</li>
  <li>OneIdentity</li>
</ul>

<p><b>Privileged Access Management (PAM) Platforms:</b></p>
<ul>
  <li>CyberArk Privileged Access Manager</li>
  <li>BeyondTrust Privileged Access Management</li>
  <li>Delinea (formerly Thycotic & Centrify)</li>
  <li>Wallix Bastion</li>
  <li>StrongDM</li>
</ul>

<p><b>MIAM / Secrets Management Platforms:</b></p>
<ul>
  <li>HashiCorp Vault</li>
  <li>Venafi</li>
  <li>AWS IAM</li>
  <li>Google Cloud IAM</li>
</ul>

<p><b>Customer Identity & Access Management (CIAM) Platforms:</b></p>
<ul>
  <li>Okta Customer Identity Cloud (formerly Auth0)</li>
  <li>LoginRadius</li>
  <li>FusionAuth</li>
</ul>

<p><b>Additional Protocols & Standards Expertise:</b><br>
OAuth, OpenID Connect, SAML, SCIM, LDAP, Kerberos.</p>

<p><b>DevSecOps Tooling Expertise:</b><br>
Kubernetes Identity, API Security, CI/CD pipeline security.</p>
<img src="./img/sect06.png" class="section-img" alt="">
 <div class="space"></div>
        `;
      case "IAM Talent Network":
        return `
        <p>At <b>IAM Hiring</b>, we don't just search for candidates; we connect you with a pre-existing, meticulously curated community of the most sought-after <b>Identity and Access Management (IAM) experts in Europe.</b></p>
        
        <p>Our vast network comprises <b>over 8,000 highly skilled IAM professionals</b>, with approximately <b>5,000 top talents located right here in Germany</b>. What truly sets us apart is the depth of our relationships: we've personally engaged with <b>every single one of these experts</b>, whether through in-depth online interviews, face-to-face meetings at industry conferences, or during dedicated meetups.</p>
        <p>This personal connection means we don't just know their skills; we understand their career aspirations, their ideal work environment, and exactly <b>what opportunity will be truly attractive for them to make a job change</b>. When you partner with us, you're not waiting for a search to begin; we likely <b>already know the ideal candidate you're looking for</b>, enabling faster, more precise placements that genuinely last.</p>
        <img src="./img/sect02.png" class="section-img" alt="">
         <div class="space"></div>
        `;
      case "Story & Purpose":
        return `
          <p><b>Our Mission:</b> At <b>IAM Hiring</b>, we empower German and European businesses by providing them with expert <b>Identity & Access Management (IAM)</b> and <b>Cybersecurity</b> talent. We specialize in filling crucial roles to strengthen your security posture in today's complex digital landscape.</p>

<p><b>Our Vision:</b> To be the leading and most trusted specialized IAM recruitment partner in Germany and across <b>DACH/EU</b>. We're recognized for our deep industry knowledge, precision matching, and the profound positive impact we have on both client security and candidate careers.</p>

<p><b>Our Story:</b> <b>IAM Hiring</b> is a niche recruitment firm exclusively dedicated to the IAM sector. Founded by managers with multiple years of <b>IT and Cybersecurity recruitment</b> experience in Germany, our passion was to fill a critical market gap. We observed that companies struggled to find truly specialized IAM professionals, often missed by generalist recruiters.</p>

<p>We built <b>IAM Hiring</b> as a direct response, focusing solely on this complex domain. We understand that robust <b>IAM</b> is a critical foundation, not just a technology. Our deep specialization provides unparalleled market intelligence and direct access to a network of highly sought-after IAM professionals. We are the trusted, specialized firm that both top talents and hiring managers prefer.</p>
<img src="./img/sect03.png" class="section-img" alt="">
 <div class="space"></div>
        `;
      case "Team":
        return `

<article class="team-member">
          <img class="team-member-img" src="./img/team01.png" alt="">
    <div class="article-cont">
    <div class="title-cont">
     <h3>Katja Olkhovaia</h3>
     <h4>Strategic IAM Hiring Partner</h4>
    </div>
    <div class="text">
     <p>With 16 years of experience in IT Recruitment and a network of over 27,000 IT experts, Katja brings unparalleled insight into the industry. </p> 
      <p>She leads our strategic client partnerships, ensuring we deliver on the specific needs of CISOs and Heads of IAM.</p>
    </div>
    <div class="contact">
     <p><b>Email:</b> <a href="mailto:katja@iamhiring.de">katja@iamhiring.de</a></p>
    <p><b>Book a call:</b> <a href="https://getwhitelisted.de/katja" target="_blank" rel="noopener noreferrer">https://getwhitelisted.de/katja</a></p>
    </div>
    </div>
  </article>


<article class="team-member">
          <img class="team-member-img" src="./img/team02.png" alt="">
    <div class="article-cont">
    <div class="title-cont">
     <h3>Darius Starks</h3>
     <h4>IAM Talent Partner & Technical Recruiter</h4>
    </div>
    <div class="text">
     <p>Darius combines deep technical curiosity with sharp recruiting instincts. With a strong focus on IAM, PAM, and cybersecurity architecture roles, he thrives in finding experts who don’t just check the boxes—but elevate the whole system.</p> 
      <p>He’s passionate about building secure futures for both startups and enterprise-level clients.</p>
    </div>
    <div class="contact">
     <p><b>Email:</b> <a href="mailto:darius@iamhiring.de">darius@iamhiring.de</a></p>
    </div>
    </div>
  </article>


<article class="team-member">
          <img class="team-member-img" src="./img/team03.png" alt="">
    <div class="article-cont">
    <div class="title-cont">
     <h3>Vladyslav Kartyshov</h3>
     <h4>GRC & Compliance Talent Specialist</h4>
    </div>
    <div class="text">
     <p>Vladyslav specializes in the intersection of governance, risk, and compliance with identity management. With hands-on experience in ISMS, GDPR, and BSI standards, he’s a trusted advisor for regulated industries hiring in the DACH region.</p> 
      <p>He ensures our candidates meet not only technical, but also legal and regulatory demands</p>
    </div>
    <div class="contact">
     <p><b>Email:</b> <a href="mailto:vlad@iamhiring.de">vlad@iamhiring.de</a></p>
    </div>
    </div>
  </article>
 <div class="space"></div>
  `;
      case "For IAM Professionals":
        return `
          <h2>For IAM Professionals: Your Next Career Move Starts Here</h2>

  <p>
    As a leading specialized IAM and Cybersecurity recruiter in Germany and DACH, we're dedicated to connecting top talent like you with rewarding career opportunities at innovative companies. Let us help you navigate your next career move, whether you're an IAM Engineer, Architect, or PAM Specialist.
  </p>

  <h2>Why Partner With IAM Hiring?</h2>
    We're trusted by top talents who seek meaningful career progression, not just another job. We understand your expertise in Okta, SailPoint, CyberArk, and Azure AD, and we match you with roles that truly fit.
  </p>

  <ul>
    <li>
      <b>Exclusive Access to Top Roles:</b> We partner with leading German and DACH companies (Banking, Tech, Manufacturing, etc.), often on exclusive IAM, PAM, IGA, CIAM, and MIM positions that are not publicly advertised. Gain access to roles perfectly suited to your specialized skills in ISO 27001-compliant environments.
    </li>
    <li>
      <b>Deep IAM Industry Insight & Guidance:</b> Our team understands the nuances of the IAM market, specific technologies, and relevant career paths for DevSecOps with Identity focus or IAM Sales Consultants. We provide informed guidance, salary benchmarking, and insights into current market trends.
    </li>
    <li>
      <b>Personalized Career Journey:</b> We take the time to understand your career aspirations, strengths, and desired work environment, whether you're looking for an IAM Project Manager role or an IAM Architect challenge. We're committed to finding not just a job, but the right long-term career move for you.
    </li>
    <li>
      <b>Streamlined, Expert-Led Process:</b> From resume optimization and interview preparation (we'll help you highlight your CyberArk or SailPoint expertise!) to offer negotiation and onboarding support, we guide you every step of the way, making your job search efficient and stress-free.
    </li>
    <li>
      <b>Confidentiality & Professionalism:</b> Your privacy is paramount. We handle your job search with the utmost discretion and professionalism, understanding the sensitive nature of Cybersecurity careers.
    </li>
  </ul>

  <p><b>Ready for Your Next IAM Career Step?</b><br>
  <a href="#contact">Send Us Your CV</a> | <a href="#consultation">Request a Career Consultation</a>
  </p>
  <img src="./img/sect07.png" class="section-img" alt="">
 <div class="space"></div>
        `;
      case "Contact":
        return `
 <p>
    Ready to find your next IAM expert for your Banking, Tech, or Manufacturing enterprise, or looking for your next career opportunity in IAM/Cybersecurity? Get in touch with our specialized team today.
  </p>

  <h4>Send Us a Message in the Chat:</h4>
  <ul>
    <li>Your Name:</li>
    <li>Your Email:</li>
    <li>Phone (Optional):</li>
    <li>Your Message:</li>
  </ul>

  <h4>Or Reach Us Directly:</h4>
  <ul>
    <li><strong>Phone:</strong> +49 30 70016612</li>
    <li><strong>Email:</strong> <a href="mailto:info@iamhiring.de">team@iamhiring.de</a></li>
    <li><strong>Office Address:</strong> Ziegelstraße 16, 10117 Berlin, Germany</li>
    <li><strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM (CET)</li>
  </ul>

  <h4>Connect With Us:</h4>
  <p>
    <a href="https://www.linkedin.com/company/107770925/admin/dashboard/" target="_blank" rel="noopener noreferrer">LinkedIn Company Page</a>
  </p>
   <div class="space"></div>
        `;
      case "Career Consultation":
      return `
        <p>Ready to strategically plan your next career move in <b>Identity & Access Management?</b> Our experienced team at IAM Hiring is here to consult with you.</p>
        <p>We offer personalized career guidance, insights into the latest IAM market trends in Germany and DACH, and expert advice on optimizing your job search. Whether you're looking for market intelligence, interview preparation tips, or a clear path for your professional growth, we're dedicated to helping you achieve your aspirations.</p>
        <p><b>Book your confidential career consultation by clicking the link below:</b></p>
        <p><a href="https://outlook.office.com/book/IAMhiring@starks-consulting.de/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">Schedule Career Consultation</a></p>
     <div class="space"></div>
        `;
      case "Current IAM Job Openings":
  return `
    <p><b>Ready for Your Next IAM Career Step?</b></p>
    <p>Jobs, jobs, jobs</p>
    <p><a href="#send-cv">Send Us Your CV</a> | <a href="#career-consultation">Request a Career Consultation</a></p>
    <hr>
    <p><b>Send Us Your CV</b></p>
    <p>Happy that you're ready for your next career step in IAM! We're here to help you find the perfect match.</p>
    <p>To get started, please attach your CV and all other relevant files (such as certificates, Zeugnisse, or project portfolios) using the upload feature below.</p>
    <p>Please share in chat details about what you're looking for so we can tailor our search effectively:</p>
    <ul>
      <li>What kind of IAM or Cybersecurity roles are you interested in? (e.g., Senior IAM Engineer, Cloud IAM Architect, PAM Consultant, DevSecOps with Identity focus)</li>
      <li>What are your preferred locations? (e.g., Berlin, Munich, Frankfurt, DACH region, remote, hybrid)</li>
      <li>What are your salary expectations? (e.g., Annual gross salary range)</li>
      <li>Are there any other specific job requirements or preferences you have? (e.g., industry focus, company size, specific tech stack you want to work with, team culture, work-life balance needs)</li>
    </ul>
    <p>We look forward to reviewing your profile and helping you advance your career!</p>
     <div class="space"></div>
  `;

      
      default:
        return `Thanks for your interest in "${prompt}". Let me tell you more...`;
    }
  }

  promptButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedPrompt = btn.textContent;

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
          userMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50); 
        console.log("ssssssss");
        
    
  } else if (firstMessage && !localStorage.getItem('chatHistory')) {
    console.log(1);
    
  }
  else {
    setTimeout(() => {
          userMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

typeTextHTML(botP, getBotReply(selectedPrompt), 20, () => {
  questionsBtn.disabled = false;
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

    msgDiv.scrollIntoView({ behavior: "smooth", block: "start" });
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
      msgDiv.scrollIntoView({ behavior: "smooth", block: "start" });
      if (callback) callback();
    });
  } else {
    p.innerHTML = text;
    msgDiv.scrollIntoView({ behavior: "smooth", block: "start" });
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

// sendBtn.addEventListener("click", () => {
//   const userInput = chatboxInput.value.trim();
//   if (!userInput) return;

//   promptsSection.classList.add("fade-out");
//   promptsSection.classList.add("fade-out-display-none");
//   questionsBtn.classList.add("visible");

//   addMessage(userInput, "user");

//   chatboxInput.value = "";
//   chatboxInput.style.height = "auto";

  

//   if (chatState === "waitingUserQuestion") {
//     const fullResponse = `
//       <p>Thank you for your message!</p>
//       <p>To assist you better, please share your <b>full name</b> and <b>email address</b>.</p>
//       <p>Unfortunately, I can't answer this question directly, but one of our consultants will reach out to you shortly.</p>
//     `;
//     // addMessage(fullResponse, "bot");
//     const newBotEl = addMessage(fullResponse, "bot");


// newBotEl.classList.add("new-bot-message");
// chatboxMessages.scrollTop = chatboxMessages.scrollHeight;


// chatState = "done";
//     // chatState = "done";
    


//   } else if (chatState === "done") {

//     addMessage("We've already received your info. Our consultant will contact you soon.", "bot");
//   }
// });

const clearBtn = document.querySelector('.chatbox-footer-btn.clear-btn');

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('chatHistory');
  location.reload();
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
