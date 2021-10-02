prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeimage(){
    Webcam.snap(function(data){
        document.getElementById("result").innerHTML= '<img id="imagereseult" src="'+data+'">';
    })
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ou80FTUYB/model.json", modelloaded);

function modelloaded(){
    console.log("model loaded!");
}


function speak1(){
var synth = window.speechSynthesis;
Text1 = "The first prediction is " + prediction_1;
Text2 = "And the second prediction is " + prediction_2;
var speech = new SpeechSynthesisUtterance(Text1 + Text2);
synth.speak(speech);
}

function identifyemotion(){
img =document.getElementById("imagereseult");
classifier.classify(img, imagefinal);
}

function imagefinal(error, results){
   if(error){
    console.error(error);
   }
   else{
       console.log(results);
       document.getElementById("emotion_name").innerHTML = results[0].label;
       document.getElementById("emotion_name2").innerHTML = results[1].label;
       prediction_1= results[0].label;
       prediction_2= results[1].label;
       speak1();
      
       if(results[0].label == "Happy"){
           document.getElementById("emotion_update").innerHTML = "&#128512;";
}
else if (results[0].label == "Angry"){
    document.getElementById("emotion_update").innerHTML = "&#128544;";
}

else if(results[0].label=="Crying") {
    document.getElementById("emotion_update").innerHTML = "&#128549;";
}

else if (results[0].label=="Sad"){
    document.getElementById("emotion_update").innerHTML = "&#128542;";
}

if(results[1].label == "Happy"){
    document.getElementById("emotion_update2").innerHTML = "&#128512;";

}

else if(results[1].label == "Angry"){
    document.getElementById("emotion_update2").innerHTML = "&#128544;";
}

else if(results[1].label == "Crying"){
    document.getElementById("emotion_update2").innerHTML = "&#128549;";

}

else if (results[1].label == "Sad"){ 
    document.getElementById("emotion_update2").innerHTML = "&#128542;";
}

   }

}