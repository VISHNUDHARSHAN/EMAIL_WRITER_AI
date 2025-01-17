console.log("Email writer extension - content script loaded");

function createAIButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI REPLY";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}

function createToneSelector(callback) {
  const container = document.createElement("div");
  container.className = "ai-tone-selector";
  container.style.position = "absolute";
  container.style.background = "white";
  container.style.border = "1px solid #ccc";
  container.style.padding = "8px";
  container.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
  container.style.zIndex = "1000";
  container.style.top = "300px";
  container.style.left = "600px";

  const tones = ["Professional", "Friendly", "Humorous", "Harsh"];
  tones.forEach((tone) => {
    const option = document.createElement("div");
    option.textContent = tone;
    option.style.padding = "5px 10px";
    option.style.cursor = "pointer";
    option.style.borderBottom = "1px solid #eee";
    option.addEventListener("click", () => {
      callback(tone.toLowerCase());
      document.body.removeChild(container);
    });
    container.appendChild(option);
  });

  document.body.appendChild(container);
}

function getemailcontent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return "";
}

function findComposeToolbar() {
  const selectors = [".aDh", ".btC", '[role="toolbar"]', ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null;
}

function injectButton() {
  const existingbutton = document.querySelector(".ai-reply-button");
  if (existingbutton) {
    existingbutton.remove();
  }
  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Email writer extension - Compose toolbar not found");
    return;
  }
  console.log("Email writer extension - Compose toolbar found");
  const button = createAIButton();
  button.classList.add("ai-reply-button");
  button.addEventListener("click", () => {
    createToneSelector(async (selectedTone) => {
      try {
        button.innerHTML = "Generating AI Reply...";
        button.disabled = true;
        const emailcontent = getemailcontent();
        const response = await fetch(
          "http://localhost:8080/api/email/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailcontent: emailcontent,
              tone: selectedTone,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("AI reply generation failed");
        }

        const generatedreply = await response.text();
        const composeBox = document.querySelector(
          "[role = 'textbox'][g_editable = 'true']"
        );

        if (composeBox) {
          composeBox.focus();
          document.execCommand("insertText", false, generatedreply);
        } else {
          console.log("Email writer extension - Compose box not found");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to generate email...");
      } finally {
        button.innerHTML = "AI REPLY";
        button.disabled = false;
      }
    });
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return false;

      return (
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]'))
      );
    });
    if (hasComposeElements) {
      console.log("Email writer extension - Compose window detected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
