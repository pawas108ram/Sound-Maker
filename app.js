class DrumKit{
    constructor(){
        this.pads=document.querySelectorAll('.pad');
        this.kickAudio=document.querySelector('.kick-sound');
        this.snareAudio=document.querySelector('.snare-sound');
        this.hihatAudio=document.querySelector('.hihat-sound');
        this.index=0;
        this.bpm=150;
        this.playButton=document.querySelector('.play');
        this.isPlaying=null;
        this.currentKick=`./sounds/kick-classic.wav`;
        this.currentSnare=`./sounds/snare-808.wav`;
        this.currentHihat=`./sounds/hihat-808.wav`;
        this.selects=document.querySelectorAll('select');
        this.muteBtns=document.querySelectorAll(".mute");
        this.tempoSlider=document.querySelector('.tempo-slider');

    }
    repeat(){
        let step=this.index%8;
        const activeBars=document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar=>{
            bar.style.animation=`playTrack 0.5s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
        
    }
    activePad(){
        this.classList.toggle('active');
        console.log(this);
    }
    start(){
        const interval=(60/this.bpm)*1000;
        
        if(!this.isPlaying){
        this.isPlaying=setInterval(()=>{
            this.repeat();
        },interval);
        
    }

        else{
        clearInterval(this.isPlaying);
        this.isPlaying=null;

    }

    }
    updateBtn(){
        if(this.isPlaying){
            console.log(this);
            this.playButton.textContent="Stop";
            this.playButton.classList.remove('active');
        }
        else{
            this.playButton.textContent="Play";
            this.playButton.classList.add('active');
        }
    }
    changeSound(e){
       const selectionElement=e.target.name;
       const selectionValue=e.target.value;
       switch(selectionElement){
        case 'kick-select':
            this.kickAudio.src=`${selectionValue}`;
            break;
        case 'snare-select':
            this.snareAudio.src=`${selectionValue}`;
            break;
        case 'hihat-select':
            this.hihatAudio.src=`${selectionValue}`;
            break;


       }
      
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
          switch (muteIndex) {
            case "0":
              this.kickAudio.volume = '0';
              break;
            case "1":
              this.hihatAudio.volume = 0;
              break;
            case "2":
              this.snareAudio.volume = 0;
              break;
          }
        } else {
          switch (muteIndex) {
            case "0":
              this.kickAudio.volume = 1;
              break;
            case "1":
              this.hihatAudio.volume = 1;
              break;
            case "2":
              this.snareAudio.volume = 1;
              break;
          }
        }

    
      

  
  }
  changeTempo(e){
    const tempoText=document.querySelector('.tempo-number');
    this.bpm=e.target.value
    tempoText.innerText=this.bpm ; 

  }
  updateTempo(){
    this.bpm=e.target.value
    clearInterval(this.isPlaying);
    this.isPlaying=null;
    const playBtn=document.querySelector('.play');
    if(playBtn.classList.contains('active')){
        this.start();
    }

  }
        
        
        
    }


const drumKit=new DrumKit();
drumKit.pads.forEach(pad=>{
    pad.addEventListener('click',drumKit.activePad);
    pad.addEventListener("animationend",function(){
        this.style.animation="";
    });
})
drumKit.playButton.addEventListener('click',()=>{
    drumKit.start();
    drumKit.updateBtn();
});
drumKit.selects.forEach(selectitem=>{
    selectitem.addEventListener('change',(e)=>{
        drumKit.changeSound(e);
    });
});
drumKit.muteBtns.forEach(muteBtn=>{
    muteBtn.addEventListener('click',function(e){
        drumKit.mute(e);
    })
});
drumKit.tempoSlider.addEventListener('input',function(e){
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change',function(e){
    drumKit.updateTempo(e);
});



