
// Slider(all Slides in a container)
const sliderBlock = document.getElementById("slide-roller")

// Transform value
let val = 0
let intervalVal = 4000 // 4 seconds

// Button functions
document.querySelectorAll("span").forEach((cur) => {
    // Assign function based on the class Name("next" and "prev")
    cur.addEventListener("click", () => {
        if (cur.classList.contains("right-but")) {
            slider("increase");
        } else if (cur.classList.contains("left-but")) {
            slider("decrease");
        }
    });
});

// Function to slide
const slider = (cond) => {
    clearInterval(start) // Clearing interval timer
    cond === "increase" ? initiateINC() : initiateDEC()
    move(val)
    animateRes()
    start = setInterval(() => slider("increase"), intervalVal)
}

// Function to increase
const initiateINC = () => {
    val === 75 ? val = 0 : val += 25
}

// Function to decrease
const initiateDEC = () => {
    val === 0 ? val = 75 : val -= 25
}

// Function to move
const move = (tVal) => {
    sliderBlock.style.transform = "translateX(-" + tVal + "%)"
}

const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from(".slides-bg", {x: "-100%", opacity: 0})

// function to restart animation
const animateRes = () => tl.restart()

let start = setInterval(() => slider("increase"), intervalVal)

// ---
const parentToShowAbout = 40
const percentToShowBubble = 75
let aboutDivObj = document.getElementsByClassName("divToShowHide");
let currentAboutObj = document.getElementById("section-about");
let currentNavObj = document.getElementById("section-header");
let flipCardObj = document.getElementsByClassName("flip-card");
let bubblePopper = document.getElementsByClassName("bubble-pop");
let bubbleContainerObj = document.getElementsByClassName("bubble-pop-container")[0];
let bubbleParentCon = document.getElementById("section-products");
let SectionsArray = ["section-slideshow", "section-about", "section-products", "section-footer"]

var isMobile = window.matchMedia("(max-width: 800px)")

if (isMobile.matches) {
    console.log("ismobile")

} else {
    console.log("isdesk")
    hideUnhideDOMS(parentToShowAbout, aboutDivObj)
    changeNav()
    flipCard(flipCardObj, "flip-toggle")
    bubblePops(bubbleContainerObj, bubblePopper, bubbleParentCon)
    parallaxBack("parallax-moving-cover", 0.125)
    //setSlideButtonsClick(slideArrowLeft, slideArrowRight)
}

function isElement(obj) {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrome)
      return obj instanceof HTMLElement;
    }
    catch(e){
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have (works on IE7)
      return (typeof obj==="object") &&
        (obj.nodeType===1) && (typeof obj.style === "object") &&
        (typeof obj.ownerDocument ==="object");
    }
}

function hideUnhideDOMS(perentToShow, scrollDiv) {
    body=document.getElementsByTagName("body")[0];
    window.addEventListener('scroll', function() {
        currScrollPosY = this.window.scrollY
        windowHeight = this.window.screen.height
        for (let i = 0; i < scrollDiv.length; i++) {
            scrollChild = scrollDiv[i].childNodes
            parentDivPosY = scrollDiv[i].getBoundingClientRect().top
            showingPoint = windowHeight - ((perentToShow/100) * windowHeight)
            if (parentDivPosY < showingPoint) {
                for (let j = 0; j < scrollChild.length; j++) {
                    if (isElement(scrollChild[j])) {
                        scrollChild[j].classList.add("text-afterScroll")
                        scrollChild[j].classList.remove("text-beforeScroll")
                    }
                }
            } else {
                for (let j = 0; j < scrollChild.length; j++) {
                    if (isElement(scrollChild[j])) {
                        scrollChild[j].classList.remove("text-afterScroll")
                        scrollChild[j].classList.add("text-beforeScroll")
                    }
                }
            }
        }
    });
}

function changeNav() {
    let divTopToCheck = currentAboutObj
    let navBarToChange = currentNavObj
    
    const navbarBottom = navBarToChange.getBoundingClientRect().bottom

    let navChild = navBarToChange.childNodes

    window.addEventListener('scroll', function() {
        let divTop = divTopToCheck.getBoundingClientRect().top
        let navContobj = this.document.getElementsByClassName("navContainer")[0]
        if (divTop < navbarBottom) {
            changeNavActives(navContobj, SectionsArray, "active-a-gradient-text")
            navBarToChange.style.height = "8%"
            navBarToChange.style.borderBottom = "0.25vw solid rgba(0,0,100,0.35)"
            navBarToChange.classList.remove("below-box-shadow")
            for (let i = 0; i < navChild.length; i++) {
                if (isElement(navChild[i])) {
                    let logoImg = navChild[i].getElementsByTagName("img");
                    if (logoImg.length > 0) {
                        logoImg[0].src = "images/logoDF_small.png";
                        logoImg[0].style.paddingTop = "20%"
                        logoImg[0].style.width = "calc(12 * ((1vh+1vw)/2))"
                    } else {
                        let navButtons = navChild[i].getElementsByTagName("button")
                        for (n = 0; n < navButtons.length; n++) {
                            if(navButtons[n].classList.contains("active-a")) {
                                navButtons[n].classList.remove("active-a")
                                navButtons[n].classList.remove("gradient-obj")
                                navButtons[n].classList.remove("nav-button-style-one")
                                navButtons[n].classList.add("nav-button-style-two")
                                navButtons[n].classList.add("active-a-gradient-text")
                            } else if(navButtons[n].classList.contains("nav-button-style-one")) {
                                navButtons[n].classList.add("nav-button-style-two")
                                navButtons[n].classList.remove("nav-button-style-one")
                            }
                        }
                    }
                }
            }
        } else {
            changeNavActives(navContobj, SectionsArray, "active-a")
            navBarToChange.style.height = "10%"
            navBarToChange.style.borderBottom = "0px solid rgba(0,0,0,0)"
            navBarToChange.classList.add("below-box-shadow")
            for (let i = 0; i < navChild.length; i++) {
                if (isElement(navChild[i])) {
                    let logoImg = navChild[i].getElementsByTagName("img");
                    if (logoImg.length > 0) {
                        console.log(logoImg.length)
                        logoImg[0].src = "images/logoDF.png";
                        logoImg[0].style.paddingTop = "0%"
                        logoImg[0].style.width = "calc(60 * ((1vh+1vw)/2))"
                    } else {
                        let navButtons = navChild[i].getElementsByTagName("button")
                        for (n = 0; n < navButtons.length; n++) {
                            if(navButtons[n].classList.contains("active-a-gradient-text")) {
                                navButtons[n].classList.add("active-a")
                                navButtons[n].classList.add("gradient-obj")
                                navButtons[n].classList.add("nav-button-style-one")
                                navButtons[n].classList.remove("nav-button-style-two")
                                navButtons[n].classList.remove("active-a-gradient-text")
                            } else if(navButtons[n].classList.contains("nav-button-style-two")) {
                                navButtons[n].classList.add("nav-button-style-one")
                                navButtons[n].classList.remove("nav-button-style-two")
                            }     
                        }
                    }
                }
            }
        }
    });
}

function flipCard(cardID, toggleClass) {
    timerLimit = 4
    console.log(cardID)
    for (let i = 0; i < cardID.length; i++) {
        cardID[i].addEventListener("click", () => {
            cardID[i].classList.toggle(toggleClass)
            containsBool = cardID[i].classList.contains(toggleClass)
            setTimeout(() => {
                if (containsBool) {
                    cardID[i].classList.remove(toggleClass)
                }
            }, timerLimit*1000);
        });
    }
}

function bubblePops(popContainer, poppingBubs, parObj) {
    body=document.getElementsByTagName("body")[0];
    currScrollPosY = this.window.scrollY
    windowHeight = this.window.screen.height
    bottomPadding = 500
    containerPos = popContainer.getBoundingClientRect().top

    let getVisibleHeight = poppingBubs[0].getBoundingClientRect().height
    let getVisibleWidth = poppingBubs[0].getBoundingClientRect().width
    let currPopCount = windowHeight*(percentToShowBubble/100)
    let popped = false
    let manualPadd = 10
    
    const posArray = []
    for (let a = 0; a < poppingBubs.length+1; a++) {
        rAdd = getRandBetween(100, 250)
        currPopCount = currPopCount + rAdd
        posArray.push(currPopCount)
    }
    
    if (currScrollPosY > containerPos + manualPadd + (windowHeight*(percentToShowBubble/100))) {
        console.log("enter")
        for (let x = 0; x < poppingBubs.length; x++) {
            poppingBubs[x].classList.add("pop-up")
            poppingBubs[x].classList.remove("pop-down")
            //poppingBubs[x].style.height = String(getVisibleHeight)
            //poppingBubs[x].style.width = String(getVisibleWidth)
            //poppingBubs[x].style.opacity = 1
            popped = true
        }
    } else {
        console.log("exit")
        for (let x = 0; x < poppingBubs.length; x++) {
            poppingBubs[x].classList.remove("pop-up")
            poppingBubs[x].classList.add("pop-down")
            //poppingBubs[x].style.height = 0
            //poppingBubs[x].style.width = 0
            //poppingBubs[x].style.opacity = 0
            popped = false
        }
    }

    window.addEventListener('scroll', function() {

        currScrollPosY = this.window.scrollY
        windowHeight = this.window.screen.height
        containerPos = popContainer.getBoundingClientRect().top
        isBottom = (currScrollPosY > (this.document.body.scrollHeight - bottomPadding))
        tempPop = false
        if (!isBottom) {
            if (currScrollPosY > containerPos + (windowHeight*(percentToShowBubble/100))) {
//            console.log("Pop entering")
                for (let x = 0; x < poppingBubs.length; x++) {
    //                console.log("Pop counting " + x + "...")
                    if (!popped) {
                        //checkPointLow = (containerPos + (windowHeight*(percentToShowBubble/100)) + posArray[x])
                        //checkPointHigh = (containerPos + (windowHeight*(percentToShowBubble/100)) + posArray[x+1])
                        if (currScrollPosY > posArray[x]) {
                            poppingBubs[x].classList.add("pop-up")
                            poppingBubs[x].classList.remove("pop-down")
                            //poppingBubs[x].style.opacity = 1
                            //poppingBubs[x].style.zoom = "1"
                            tempPop = true
                        } else {
                            tempPop = false
                        }
                    }
                }
                if (tempPop) {
                    popped = true
                }
            } else {
                for (let x = 0; x < poppingBubs.length; x++) {
                    poppingBubs[x].classList.remove("pop-up")
                    poppingBubs[x].classList.add("pop-down")
                    //poppingBubs[x].style.opacity = 0
                    //poppingBubs[x].style.zoom = "0"
                }
                popped = false
            }        
                
        } else {
            for (let x = 0; x < poppingBubs.length; x++) {
                if (!poppingBubs[x].classList.contains("pop-up")) {
                    poppingBubs[x].classList.add("pop-up")
                    poppingBubs[x].classList.remove("pop-down")    
                }
            }
            popped = true
        }
    });
}

function getRandBetween(bottomNum, topNum) {
    let rdn = Math.floor((Math.random() * topNum) + bottomNum);
    return rdn
}

function scrollingInPage(idOfElement) {
    currPosY = this.window.scrollY
    idObj = document.getElementById(idOfElement)
    scrollToPos = idObj.getBoundingClientRect().top
    console.log(currPosY, scrollToPos)
    window.scrollTo({top: (currPosY+scrollToPos), behavior: 'smooth'})
    console.log()
}

function changeNavActives(navContainerParObj, idsOfElement, activeClassName) {
    
    navContainerHeight = navContainerParObj.clientHeight
    navContainerObj = navContainerParObj.childNodes
    currScrollPosY = this.window.scrollY
    //console.log("Works", navContainerObj.length, idsOfElement.length)
    currSection = ""
    for (let c = 0; c < navContainerObj.length; c++) {
        //console.log("Curent NavButt: " + navContainerObj[c])
        if (isElement(navContainerObj[c])) {
            //console.log("is Element, with index: " + c)
            //console.log("Running through ids")
            for (let d = 0; d < idsOfElement.length; d++) {
                //console.log("Current ID: " + idsOfElement[d] + ", with index: " + d)
                if (d < (idsOfElement.length-1)) {
                    currDivTop = document.getElementById(idsOfElement[d]).getBoundingClientRect().top
                    nextDivTop = document.getElementById(idsOfElement[d+1]).getBoundingClientRect().top
                    //console.log("Body Offset: " + document.body.offsetHeight + ", Body Top: " + document.body.getBoundingClientRect().top + ", Body Scroll Height: " + document.body.scrollHeight)
                    if (currScrollPosY >= (document.body.scrollHeight - 500)) {
                        //console.log("Body Offset: " + document.body.offsetHeight + ", Body Top: " + document.body.getBoundingClientRect().top + ", Body Scroll Height: " + document.body.scrollHeight)
                        currSection = "section-footer"
                    } else {
                        console.log("Height: " + navContainerHeight
                        if ((currDivTop <= navContainerHeight) && (nextDivTop > 0)) {
                            currSection = idsOfElement[d]
                            console.log("Current Div Top ("+ idsOfElement[d] +"): " + currDivTop + ", <= Scroll: " + currScrollPosY + ", and Next Div Top: (" + idsOfElement[d+1] + ") " + nextDivTop + " > Scroll: " + currScrollPosY)
                        }
                    }
                }
            }    
        }
    }

    for (let c = 0; c < navContainerObj.length; c++) {
        if (isElement(navContainerObj[c])) {
            console.log(currSection)
            switch (currSection) {
                case "section-slideshow":
                    if (navContainerObj[c].name == "home") {
                        if (!navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.add(activeClassName)
                            if (activeClassName == "active-a") {
                                navContainerObj[c].classList.add("gradient-obj")
                            }
                        }
                    } else {
                        if (navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.remove(activeClassName)
                            navContainerObj[c].classList.remove("gradient-obj")
                        }
                    }
                    break;
                case "section-about":
                    if (navContainerObj[c].name == "about") {
                        if (!navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.add(activeClassName)
                            if (activeClassName == "active-a") {
                                navContainerObj[c].classList.add("gradient-obj")
                            }
                        }
                    } else {
                        if (navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.remove(activeClassName)
                            navContainerObj[c].classList.remove("gradient-obj")
                        }
                    }
                    break;
                case "section-products":
                    if (navContainerObj[c].name == "product") {
                        if (!navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.add(activeClassName)
                            if (activeClassName == "active-a") {
                                navContainerObj[c].classList.add("gradient-obj")
                            }
                        }
                    } else {
                        if (navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.remove(activeClassName)
                            navContainerObj[c].classList.remove("gradient-obj")
                        }
                    }
                    break;
                case "section-footer":
                    if (navContainerObj[c].name == "contact") {
                        if (!navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.add(activeClassName)
                            if (activeClassName == "active-a") {
                                navContainerObj[c].classList.add("gradient-obj")
                            }
                        }
                    } else {
                        if (navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.remove(activeClassName)
                            navContainerObj[c].classList.remove("gradient-obj")
                        }
                    }
                    break;
                default:
                    if (navContainerObj[c].name == "home") {
                        if (!navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.add(activeClassName)
                            if (activeClassName == "active-a") {
                                navContainerObj[c].classList.add("gradient-obj")
                            }
                        }
                    } else {
                        if (navContainerObj[c].classList.contains(activeClassName)) {
                            navContainerObj[c].classList.remove(activeClassName)
                            navContainerObj[c].classList.remove("gradient-obj")
                        }
                    }
                    break;                                        
            }
        }
    }
}

function parallaxBack(classNameOfPBG, velocity) {
    let paraObjects = document.getElementsByClassName(classNameOfPBG)
    window.addEventListener("scroll", () => {
        for (let p = 0; p < paraObjects.length; p++) {
            let parheight = paraObjects[p].style.height-20
            currPos = paraObjects[p].getBoundingClientRect().top
            paraObjects[p].style.backgroundPosition = "50% " + (Math.round((parheight-currPos) * velocity)) + "px";
        }
    });
}

/*
// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("g-map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }*/