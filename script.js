// let wavesurfer;

// document.addEventListener("DOMContentLoaded",function(){wavesurfer = WaveSurfer.create({
//   container     : '#waveform',
//   waveColor     : 'black',
//   interact      : false,
//   cursorWidth   : 0,
//   plugins: [
//     WaveSurfer.microphone.create()
//   ]
// });


// // navigator.webkitGetUserMedia({audio:true, video:true}, function(stream){
    
// //     })

// wavesurfer.microphone.on('deviceReady', function(stream) {
//     console.log('Device ready!', stream);
//     audioContext = new webkitAudioContext();
//     analyser = audioContext.createAnalyser();
//     microphone = audioContext.createMediaStreamSource(stream);
//     javascriptNode = audioContext.createJavaScriptNode(2048, 1, 1);

//     analyser.smoothingTimeConstant = 0.3;
//     analyser.fftSize = 1024;

//     microphone.connect(analyser);
//     analyser.connect(javascriptNode);
//     javascriptNode.connect(audioContext.destination);

//     javascriptNode.onaudioprocess = function() {
//         var array =  new Uint8Array(analyser.frequencyBinCount);
//         analyser.getByteFrequencyData(array);
//         var values = 0;
//         var length = array.length;
//         var length = array.length;
//         for (var i = 0; i < length; i++) {
//             values += array[i];
//         }
//         console.log(length+"|||"+values)
//     }
    
// });
// wavesurfer.microphone.on('deviceError', function(code) {
//     console.warn('Device error: ' + code);
// });
// wavesurfer.microphone.start();

// })

// // navigator.webkitGetUserMedia({audio:true, video:true}, function(stream){
// //     // audioContext = new webkitAudioContext(); deprecated  OLD!!
// //     audioContext = new AudioContext(); // NEW!!
// //     analyser = audioContext.createAnalyser();
// //     microphone = audioContext.createMediaStreamSource(stream);
// //     javascriptNode = audioContext.createJavaScriptNode(2048, 1, 1);

// //     analyser.smoothingTimeConstant = 0.3;
// //     analyser.fftSize = 1024;

// //     microphone.connect(analyser);
// //     analyser.connect(javascriptNode);
// //     javascriptNode.connect(audioContext.destination);

// //     //canvasContext = $("#canvas")[0].getContext("2d");
// //     canvasContext = document.querySelector("canvas");
// //     canvasContext= canvasContext.getContext("2d");

// //     javascriptNode.onaudioprocess = function() {
// //         var array =  new Uint8Array(analyser.frequencyBinCount);
// //         analyser.getByteFrequencyData(array);
// //         var values = 0;

// //         var length = array.length;
// //         for (var i = 0; i < length; i++) {
// //             values += array[i];
// //         }

// //         var average = values / length;
// //         console.log(average)
// //         canvasContext.clearRect(0, 0, 60, 130);
// //         canvasContext.fillStyle = '#00ff00';
// //         canvasContext.fillRect(0,130-average,25,130);
// //     }

// // }  
// // );


class Microphone{
    constructor(){
        this.initialized=false;
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream){
            this.audioContext=new AudioContext();
            this.microphone=this.audioContext.createMediaStreamSource(stream);
            this.analyser=this.audioContext.createAnalyser();
            this.analyser.fftSize=512;
            const bufferLength=this.analyser.frequencyBinCount;
            this.dataArray=new Uint8Array(bufferLength);
            this.microphone.connect(this.analyser);
            this.initialized=true;
        }.bind(this)).catch(function(e){
            alert(e)
        });
    }
    getVolume(){
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples=[...this.dataArray].map(e=>e/128 - 1);
        let sum=0;
        for(let i=0;i<normSamples.length;i++){
            sum+=normSamples[i] **2;
        }
        let volume=Math.sqrt(sum/normSamples.length);
        return volume
    }
}

let spikesIn5Secs=0
setInterval(()=>{
    if(spikesIn5Secs>7){
        alert("Baby is Crying!")
    }
},5000)



let a=new Microphone()
setInterval(()=>{
    let b=a.getVolume()
    if(b>0.09){
        console.log("spike in volume")
        spikesIn5Secs+=1    
    };
},50)



















