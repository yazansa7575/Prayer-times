let setting = document.getElementById("setting");
let settings_info = document.getElementById("settings_info");
let exit = document.getElementById("exit");

let isShow =false;
setting.addEventListener('click',function(){
    settings_info.style.display="block";
    
    isShow = true;
})
exit.addEventListener('click',function(){
    settings_info.style.display="none";
    isShow = false;
})
let city =document.getElementById("city");
let citychoose =document.getElementById("citychoose");

citychoose.addEventListener('change',function(){
    let date = new Date()
    let dayToday = date.getDate()
    axios.get(`http://api.aladhan.com/v1/calendarByAddress?method=${city.value}&address=${citychoose.value}&month=${date.getMonth()+1}&year=${date.getFullYear()}`)
    .then(response => {
        let sections =document.getElementById("sections");
        let timeOfSalah = response.data.data[ dayToday].timings;
        
        let content = 
        `
        <div class="sec sec1">
                <div class="center_info">
                    <div class="title">
                        الفجر
                    </div>
                    <div class="date">
                            ${timeOfSalah.Fajr}
                    </div>
                </div>
            </div>
            <div class="sec sec2">
                <div class="center_info">
                    <div class="title">
                        الشروق
                    </div>
                    <div class="date">
                        ${timeOfSalah.Sunrise}
                    </div>
                </div>
            </div>
            <div class="sec sec3">
                <div class="center_info">
                    <div class="title">
                        الظهر
                    </div>
                    <div class="date">
                        ${timeOfSalah.Dhuhr}
                    </div>
                </div>
            </div>
            <div class="sec sec4">
                <div class="center_info">
                    <div class="title">
                        العصر
                    </div>
                    <div class="date">
                        ${timeOfSalah.Asr}
                    </div>
                </div>
            </div>
            <div class="sec sec5">
                <div class="center_info">
                    <div class="title">
                        المغرب
                    </div>
                    <div class="date">
                        ${timeOfSalah.Maghrib}
                    </div>
                </div>
            </div>
            <div class="sec sec6">
                <div class="center_info">
                    <div class="title">
                        العشاء
                    </div>
                    <div class="date">
                    ${timeOfSalah.Isha}
                    </div>
                </div>
            </div>  


        `
        sections.innerHTML="";
        sections.innerHTML +=content;
        settings_info.classList.add("animationForSetting")
        setTimeout(()=>{
            settings_info.style.display="none";
            settings_info.classList.remove("animationForSetting")

        },1000)
        document.getElementById("date").innerHTML=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        document.getElementById("time").innerHTML=`${date.getHours()}:${date.getMinutes()}`
        document.getElementById("date").style.display="block";

    })
    .catch((error)=>{
        alert("error.. please try again")
        location.reload()
    })
    
})  
