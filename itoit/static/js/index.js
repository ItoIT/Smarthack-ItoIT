let show_dropdown = false;

function dropdown() {
  var menu_drop = document.querySelector("#menu-drop");
  if (show_dropdown == false) {
    show_dropdown = true;
    document.querySelector("#menu-drop li:nth-child(1)").style =
      "opacity: 0; animation: animate 200ms ease-out forwards; animation-delay: 100ms";
    document.querySelector("#menu-drop li:nth-child(2)").style =
      "opacity: 0; animation: animate 200ms ease-out forwards; animation-delay: 350ms";
    menu_drop.style.display = "grid";
  } else {
    show_dropdown = false;
    document.querySelector("#menu-drop li:nth-child(2)").style =
      "opacity: 1; animation: animate-out 200ms ease-out forwards; animation-delay: 100ms";
    document.querySelector("#menu-drop li:nth-child(1)").style =
      "opacity: 1; animation: animate-out 200ms ease-out forwards; animation-delay: 350ms";
    setTimeout(() => {
      menu_drop.style.display = "none";
    }, 600);
  }
}
const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

window.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const referralId = urlParams.get("ref");

  if (referralId !== null) {
    const referralInput = document.querySelector("#register-referred_by");
    if (referralInput !== null) {
      referralInput.value = referralId;
    }
  }
  let btnToAuth = document.querySelector("small#to-sign-in");
  if (btnToAuth) {
    btnToAuth.addEventListener('click', () => {
      let registerForm = document.querySelector("#register-form");
      let loginForm =  document.querySelector("#login-form");
      registerForm.classList.toggle("d-none");
      registerForm.classList.toggle("d-block");
      loginForm.classList.toggle("d-none");
      loginForm.classList.toggle("d-block");
  
    });
  }
  if (btnToRegister) {
    let btnToRegister = document.querySelector("small#to-register");
    btnToRegister.addEventListener('click', () => {
    let registerForm = document.querySelector("#register-form");
    let loginForm =  document.querySelector("#login-form");
    registerForm.classList.toggle("d-none");
    registerForm.classList.toggle("d-block");
    loginForm.classList.toggle("d-none");
    loginForm.classList.toggle("d-block");
  });
  }
});
