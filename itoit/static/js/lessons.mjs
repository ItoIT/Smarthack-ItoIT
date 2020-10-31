import {getOccupiedIntervals,getTeachers,getServerTime,addLesson}  from './APIs/API.mjs';
import {setCoinsValue} from "./layout.mjs";
var date = new Date();

window.addEventListener('load',(event) => {
    setInterval( function() {
        var hours = new Date().getHours();
        $(".hours").html(( hours < 10 ? "0" : "" ) + hours);
        }, 1000);
        setInterval( function() {
        var minutes = new Date().getMinutes();
        $(".min").html(( minutes < 10 ? "0" : "" ) + minutes);
        },1000);
        setInterval( function() {
        var seconds = new Date().getSeconds();
        $(".sec").html(( seconds < 10 ? "0" : "" ) + seconds);
        },1000);
});

var modal = document.getElementById("exampleModalCenter");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it


function daysInMonth (month, year) {
    return new Date(year, month+1, 0).getDate();
}
         
var monthsEng = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var daysLetters = ["LUN","MAR","MIE","JOI","VIN","SAM","DUM"];
var dateDayNumber = date.getDate();
var dateDayLetter = date.getDay();
var daysAsNumber  = document.querySelectorAll(".day-number");
var daysAsLetters = document.querySelectorAll(".day-letters");
const nrDays = 14;
var lessonsStartingHours = [8,10,12,14,16,18]; 
var reservedLessonsNr = new Array(lessonsStartingHours.length * nrDays).fill(0);

let teachersIDs = [];
generateTeachers();


let nrTeachers = 0;
async function generateTeachers()
{
    teachersIDs = JSON.parse(window.localStorage.getItem('teachersFilter'));
    if(teachersIDs == null)
    {
        teachersIDs = [];
    }
    let spinner = document.querySelector(".spinner-border");
    spinner.style.display = "block";
    let currentDate = new Date();
    
    currentDate.setHours(8);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    let unixTimeStart = parseInt((currentDate.getTime() / 1000).toFixed(0)) ;
    let unixTimeEnd = parseInt(unixTimeStart) + nrDays * 24 * 3600;

    let currentServerTime = await getServerTime();
    let teachers = (await getTeachers())['data'];
    let allLessons = (await getOccupiedIntervals(unixTimeStart,unixTimeEnd))['data'];
    let selectTeacherDiv = document.querySelector(".boxes");
    let firstSelect= document.querySelector("#box-1");
    selectTeacherDiv.innerHTML = "<input type='checkbox' id='box-1'><label for='box-1'>Toți profesorii</label>";
    for(let i = 0 ; i < teachers.length; i ++)
    {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = String(teachers[i]['id']);
        input.classList = "checkbox";
        if(teachersIDs.indexOf(String(teachers[i]['id']))!= -1)
        {
            input.checked = true;
        }
        input.addEventListener( 'change', function() {
            if(this.checked) {
                if(teachersIDs.indexOf(this.id) == -1)
                {
                    teachersIDs.push(this.id);
                    createCards(currentServerTime,teachers,allLessons);
                    atLeastOneChecked();
                    updateStorageFilter();
                }
            } else {
                teachersIDs.splice(teachersIDs.indexOf(this.id),1);
                
                
                let firstSelect= document.querySelector("#box-1");
                firstSelect.checked = false;
                var checkBoxes = document.getElementsByClassName( 'checkbox' );
                
            
                var isChecked = false;
                for (var i = 0; i < checkBoxes.length; i++) {
                    if ( checkBoxes[i].checked ) {
                        isChecked = true;
                    }
                }
                if(!isChecked)
                {
                    this.checked = true;
                    teachersIDs.push(this.id);
                }
                updateStorageFilter();
                
                
                atLeastOneChecked();
                createCards(currentServerTime,teachers,allLessons);
            }
        });
        let label = document.createElement("label");
        label.setAttribute("for",String(teachers[i]['id']));
        
        label.innerHTML = teachers[i]['name'];
       
        selectTeacherDiv.appendChild(input);
        selectTeacherDiv.appendChild(label);

        
    }
    if(teachersIDs.length == 0)
        {
            
            let checkBoxes = document.getElementsByClassName( 'checkbox' );
      
            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = true ;
                teachersIDs.push(checkBoxes[i].id);
                updateStorageFilter();
            }
            firstSelect.checked = true;
        }
    else
    {
        atLeastOneChecked();
    }
    createCards(currentServerTime,teachers,allLessons);
    firstSelect.addEventListener( 'change', function() {
        if(firstSelect.checked == true)
        {
            createCards(currentServerTime,teachers,allLessons);
            let checkBoxes = document.getElementsByClassName( 'checkbox' );
            
            teachersIDs = [];
            for (var i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = true ;
                teachersIDs.push(checkBoxes[i].id);
                
            }
            updateStorageFilter();
            
        }
        else
        {
            atLeastOneChecked();
        }
    });
    
}
function atLeastOneChecked(){
    let checkBoxes = document.getElementsByClassName( 'checkbox' );
    let firstSelect= document.querySelector("#box-1");
    let allChecked = true;
   
    for (let i = 0; i < checkBoxes.length; i++) {
        if ( !checkBoxes[i].checked ) {
            allChecked = false;
        }
    }
    if(allChecked)
    {
        firstSelect.checked = true;
        updateStorageFilter();
        
    }
        
}

function updateStorageFilter()
{
    window.localStorage.setItem('teachersFilter',JSON.stringify(teachersIDs));

}



async function createCards(currentServerTime,teachers,allLessons)
{
    
    
    let daysCards = document.querySelectorAll(".busy-meter");
    let currentDate = new Date();
    
    nrTeachers = teachers.length;
    if(teachersIDs.length > 0)
    {
        nrTeachers = teachersIDs.length;
    }
    
    currentDate.setHours(8);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    let unixTimeStart = parseInt((currentDate.getTime() / 1000).toFixed(0)) ;
    let unixTimeEnd = parseInt(unixTimeStart) + nrDays * 24 * 3600;

   
    let lessons = [];
    for(let i = 0; i < allLessons.length; i++)
    {
        if(teachersIDs.indexOf(String(allLessons[i]['professor_id'])) != -1)
        {
            lessons.push(allLessons[i]);
        }
    }
    console.log(lessons);
    reservedLessonsNr = new Array(lessonsStartingHours.length * nrDays).fill(0);

    for(let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex++)
    {
        let currentLesson = lessons[lessonIndex];
        let unixTimeCurrentLesson = currentLesson['start_date'];
        let date = new Date(unixTimeCurrentLesson * 1000);
        let day = date.getDate() - new Date().getDate();
        if(day < 0)
        {
            day += daysInMonth(new Date().getMonth(), new Date().getFullYear());
        }
        
        let startHour = date.getHours();
        reservedLessonsNr[day* 6 + (startHour - 8 ) / 2] ++;
    }
    for(let dayIndex = 0; dayIndex < nrDays; dayIndex ++)
    {
        let date = new Date();
        let startDay = String(date.getFullYear()) + "." + String(date.getMonth() + 1) + "." + date.getDate();

        let todayDate = new Date(startDay);
        // Get date
        let actualDay = new Date();
        actualDay.setDate(todayDate.getDate() + dayIndex);
        actualDay.setHours(0);
        actualDay.setMinutes(0);
        actualDay.setSeconds(0);
        actualDay.setMilliseconds(0);
        let currentDay = document.querySelectorAll(".lessons-hours")[dayIndex];
        currentDay.innerHTML = "";
        let busyValue = 0;
        
        for(let hourIndex = 0; hourIndex < 6; hourIndex++)
        {
            if(reservedLessonsNr[dayIndex * 6 + hourIndex] < nrTeachers)
            {   
              
                if(dayIndex != 0 || new Date(currentServerTime * 1000).getHours()  < parseInt(lessonsStartingHours[hourIndex]))
                {
                    let hourDiv = document.createElement('div');
                    let hourAnchor = document.createElement('a');
                    hourAnchor.id = "lessons-hours";
                    hourAnchor.className = "hourText";
                    hourAnchor.setAttribute("role","button");
                    hourAnchor.setAttribute("data-target","#exampleModalCenter");
                    hourAnchor.setAttribute("data-toggle","modal");
                    let month = date.getMonth() + 1;
                    if(actualDay.getDate() - todayDate.getDate() < 0)
                        month += 1;
                    hourAnchor.addEventListener("click", function(){
                        pressHour(lessonsStartingHours[hourIndex], daysAsNumber[dayIndex].innerHTML,month,teachers,allLessons);
                    }, false);
                    hourDiv.appendChild(hourAnchor);
                    currentDay.appendChild(hourDiv);
                    
                    let allHours = currentDay.querySelectorAll("#lessons-hours");
                    
                    allHours[allHours.length - 1].innerHTML = String(lessonsStartingHours[hourIndex]) + "-" + String(lessonsStartingHours[hourIndex] + 2);
                }
                else
                {
                    reservedLessonsNr[dayIndex * 6 + hourIndex] = nrTeachers;
                }
            }
            busyValue += reservedLessonsNr[dayIndex * 6 + hourIndex];
            
            // Update day of the week
            daysAsLetters[dayIndex].innerHTML = daysLetters[(dateDayLetter + dayIndex + 6 ) % 7];
            
            
        }
        // Update busy meter
        
        switch (Math.ceil(busyValue / nrTeachers)  ){
            case 0:
                daysCards[dayIndex].classList = "busy-meter busy-meter-green-1";
                break;
            case 1:
                daysCards[dayIndex].classList = "busy-meter busy-meter-yellow-1";
                break;
            case 2:
                daysCards[dayIndex].classList = "busy-meter busy-meter-yellow-2";
                break;
            case 3:
                daysCards[dayIndex].classList = "busy-meter busy-meter-orange-1";
                break;
            case 4:
                daysCards[dayIndex].classList = "busy-meter busy-meter-orange-2";
                break;
            case 5:
                daysCards[dayIndex].classList = "busy-meter busy-meter-red-1";
                break;
            case 6:
                daysCards[dayIndex].classList = "busy-meter  busy-meter-red-2";
                break;
            default:
                break;
        }
        
        
        // Update day of the month
        let trueDay = -1;
        
        if ( ((dateDayNumber + dayIndex) <= daysInMonth(date.getMonth(),date.getFullYear())))
        {
            trueDay = dateDayNumber + dayIndex;
        }    
        else
        {
            trueDay = dateDayNumber + dayIndex - daysInMonth(date.getMonth(),date.getFullYear());
        }
        if(trueDay < 10)
            daysAsNumber[dayIndex].innerHTML = "0" + trueDay;
        else
            daysAsNumber[dayIndex].innerHTML = trueDay;
    }
}


let confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", function(){
    
let daySelect = document.querySelector("#day-select");
let day = daySelect.innerHTML;

let hourSelect = document.querySelector("#hour-select");
let hour = hourSelect.innerHTML;

let teacherSelect = document.querySelector("#teacher-select");
let teacher = teacherSelect.options[teacherSelect.selectedIndex].value;

    confirmLesson(day,hour,teacher);
 }, false);

var clickedHour = -1;
var clickedDay = -1;
async function pressHour(startHour,day,month,teachers,allLessons)
{
    let obs = document.querySelector(".reserve-obs");
    let obs2 = document.querySelector(".teacher-obs");
    obs.style.display = "block";
    obs2.style.display = "none";
   

    let confirm = document.querySelector("#confirm-button");
    let dayModal = document.querySelector(".day-select");
    let hour = document.querySelector(".hour-select");
    let teacher = document.querySelector(".teacher-select");
    let price = document.querySelector(".price");
    let localHour = document.querySelector(".lesson-clock");
    let localHourText = document.querySelector(".local-hour");
    confirm.style.display = "block";
    dayModal.style.display = "block";
    hour.style.display = "block";
    teacher.style.display = "block";
    price.style.display = "block";
    localHour.style.display = "block";
    localHourText.style.display = "block";

    clickedHour = String(startHour) + "-" + String(startHour + 2);
    clickedDay = day;
    var actualDay = new Date();
    actualDay.setMonth(month - 1);
    actualDay.setDate(day);
    actualDay.setHours(parseInt(startHour )  );
    actualDay.setMinutes(0);
    actualDay.setSeconds(0);
    actualDay.setMilliseconds(0);
    
    let unixTimeStartDay = parseInt((actualDay.getTime() / 1000).toFixed(0));
    let unixTimeEndDay = parseInt(unixTimeStartDay) + 2 * 3600 + 1;
    // Get lessons for the current day
    
    let daySelect = document.querySelector("#day-select");
    if(parseInt(month) < 10)
    {
        month = "0" + String(month);
    }
    daySelect.innerHTML = "Ziua: " + String(clickedDay) + "/" + month;

    let hourSelect = document.querySelector("#hour-select");
    hourSelect.innerHTML = "Ora: " +  clickedHour;
    
    const endpoint_data = {
        method: "GET",
    };
    
    var teacherSelect = document.querySelector("#teacher-select");
    teacherSelect.options.length = 0;
    teacherSelect.options[teacherSelect.options.length] = new Option("Alege profesorul","Alege profesorul");
                   
    let thisLessonReservedTeachers = [];
    for(let i = 0; i < allLessons.length; i++)
    {
        if(allLessons[i]['start_date'] === unixTimeStartDay)
        {
            thisLessonReservedTeachers.push(allLessons[i]['professor_id']);
        }
    }
    console.log(teachers.length);
    for(let teacherIndex = 0; teacherIndex < teachers.length; teacherIndex++)
    {
        if(thisLessonReservedTeachers.indexOf(teachers[teacherIndex]['id']) === -1)
        {
            teacherSelect.options[teacherSelect.options.length] = new Option(teachers[teacherIndex]['name'], teachers[teacherIndex]['name']);
        }
        if(teachersIDs.length === 1)
        {
            if(teachers[teacherIndex]['id'] == teachersIDs[0])
            {
                teacherSelect.options[teacherSelect.options.length - 1].selected = true;
            }
        } 
    }
       
}
async function confirmLesson(day,hour,teacher)
{
    let obs = document.querySelector(".reserve-obs");
    let obs2 = document.querySelector(".teacher-obs");
    let modalCloseButton = document.querySelector("#modal-close");
    day = day.slice(6,11);
    hour = hour.slice(5,10);

    let month = -1;
    if(day.length === 4)
        month = "0" + day[3];
    else
        month = day[3] + day[4];
    day = day[0] + day[1];
    let teachers = await getTeachers();
    let teacherID = -1;
    for(let i = 0; i < teachers['data'].length; i++)
    {
        if(teachers['data'][i]['name'] === teacher)
            teacherID = teachers['data'][i]['id'];
    }
    if(hour[1] === "-")
    {
        hour = hour[0];
    }
    else
        hour = String(hour[0]) + String(hour[1]);
    let unixStartDate = Date.parse(String(day) + " " + monthsEng[month-1] + " " + String(date.getFullYear()) + " " + String(hour) + ":00:00 GMT") / 1000;
    let succes = document.querySelector(".succes");
    let modalBackdrop = document.querySelector(".modal-backdrop");
    if(teacherID != -1)
    {
        console.log(unixStartDate + new Date(unixStartDate * 1000).getTimezoneOffset() * 60);
        let addResponse = await addLesson(unixStartDate + new Date(unixStartDate * 1000).getTimezoneOffset() * 60,teacherID);
        console.log(addResponse);
        if(addResponse['message'] === "You do not have enough coins to reserve a lesson!")
        {
            
            modalCloseButton.click();
            Swal.fire({
                content: span,
                title: 'Cumpără monezi!',
                text: 'Nu ai destule monezi pentru a rezerva o lecție. Cumpără monezi acum!',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
        }
        else if(addResponse['message'] === "You can not reserve a lesson for two professors at the same time!")
        {
            modalCloseButton.click();
            Swal.fire({
                title: 'Atentie!',
                text: 'Ai deja o lecție rezervată pentru această dată și oră',
                icon: 'error',
                showConfirmButton: false,
                timer: 2500
              });


        }
        else if(addResponse['data'])
        { 
            modalCloseButton.click();
            Swal.fire({
                title: 'Succes!',
                text: 'Lecția a fost rezervată cu succes. Ați primit un mesaj de confirmare pe email',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
              });
            teachersIDs = [];
            generateTeachers();
            setCoinsValue();
        }
        else
        { 
            modalCloseButton.click();
            Swal.fire({
                title: 'Oops!',
                text: 'Rezervările sunt închise pentru moment, încearcă mai târziu.',
                icon: 'error',
                showConfirmButton: false,
                timer: 2500
          });
        }
    }
    else
    {
        obs.style.display = "none";
        obs2.style.display = "block";   
    }       
}                                         
