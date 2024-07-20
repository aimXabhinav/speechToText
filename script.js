const searchForm = document.querySelector('#search-form');

const SpeechRecognition =  window.webkitSpeechRecognition;
if(SpeechRecognition){
    const recogonition = new SpeechRecognition();
    recogonition.continuous = true;
    const micButton = searchForm.querySelector('button');
    const micIcon = micButton.firstElementChild;

    micButton.addEventListener('click',(e) =>{
        e.preventDefault();
        if(micIcon.classList.contains("fa-microphone")){
            recogonition.start();
        }
        else if(micIcon.classList.contains("fa-microphone-slash")){
            recogonition.stop();
        }
    });


    recogonition.addEventListener('start',(e)=>{
        console.log("start speech recogonition");
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
    });

    recogonition.addEventListener('end',(e)=>{
        console.log("stop speech recogonition");
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
    })

    recogonition.addEventListener('result',(e)=>{
        const detectedText = e.results[e.resultIndex][0].transcript;
        const instruction = detectedText.toLowerCase().trim();
        if( instruction === "stop recording"){
            recogonition.stop();
            searchForm.q.value = "";
        }else if(!searchForm.q.value){
            searchForm.q.value = detectedText;
        }else{
            if(detectedText === "go"){
                searchForm.submit();
            }else if(detectedText === 'reset input'){
                searchForm.q.value = "";
            }else{
                searchForm.q.value = detectedText;
            }
        }
    });

}else{
    const button = searchForm.querySelector('button');
    button.remove();
    console.log("Speech Recoginition is not supported");
}




