var managePlaylist=(function()
{
		'use strict';
		var user,
		playlist=[],
		sourceTag,
		liList=[],
		liName=[],
		loopControl=1,
		src,
		ele,
		size,
		s=0,
		media_url,
		z,
		wavesurfer;
	function myFun()
		{	
			var className=this.getAttribute('class'),
			par=document.getElementsByClassName(className)[1],
			k=0;
			console.log(par);
			liList=par.children;
			for(z=1;z<liList.length;z++)
			{
				liList[z].style.backgroundColor='transparent';
				liName[z]=liList[z].innerHTML.split('<a')[0];
			}
			size=liList.length;
			s=1;
			liList[s].style.backgroundColor="rgb(60, 60, 60)";	
		}
	function playTrack()
	{
		media_url = document.body.getAttribute('data-media-url');
		var z;
		ele=document.getElementById('song');
		console.log(liName[s]);
		src=media_url + "songs/" +user+ '/' + liName[s] ;
		sourceTag.setAttribute('src',src);
		for(z=0;z<liList.length;z++)
		{
			liList[z].style.backgroundColor='transparent';
		}
		liList[s].style.backgroundColor="rgb(60, 60, 60)";	
		ele.load();
		ele.play();
		if(ele.loop == true)
			liList[s].style.backgroundColor="black";	
		console.log(s);
		var pro=document.getElementById('progress');
		ele.onloadedmetadata = function() 
		{	
			var int=setInterval(function() { 
						if(ele.currentTime <= ele.duration)
						{
							pro.style.width=((ele.currentTime/ele.duration)*100) + '%';
							pro.innerHTML=Math.ceil((ele.currentTime/ele.duration)*100)+ '%'
						}
						else
						{
							clearInterval(int);
						}
						 
					}, 500);
		}
		ele.addEventListener('ended',nextTrack);
	}
	function pauseTrack()
	{
		ele.pause();		
	}
	function nextTrack()
	{	
		if((s+1)<size)
		{
			s=s+1;
			playTrack();
		}
		else
			alert('no more songs');
	}
	function previousTrack()
	{
		if(s>0)
		{
			s=s-1;
			playTrack();
		}
		else
			alert('no more songs');
	}
	function loopTrack()
	{
		
		if(loopControl == 1)
		{
			ele.loop=true;
			liList[s].style.backgroundColor="black";	
			loopControl = 2;
		}
		else
		{
			ele.loop=false;
			liList[s].style.backgroundColor="rgb(60, 60, 60)";	
			loopControl = 1;
		}
	}
	function volumeUp()
	{
	    if(ele.volume >= 1)    
	    	window.alert("Max Volume");
	    else
	    {
	    	ele.volume+=0.1;
	        volume.innerHTML=(Math.ceil(ele.volume*10));
	    }
	}
	function volumeDown()
	{
	    if(ele.volume < 0)    
	    	window.alert("Max Volume");
	    else
	    {
	    	ele.volume-=0.1;
	        volume.innerHTML=(Math.ceil(ele.volume*10));
	    }
	}
	function handleWave() 
	{
		console.log('zz');
    	var options = {
        	container     : document.querySelector('#progress'),
        	waveColor     : 'violet',
        	progressColor : 'purple',
        	cursorColor   : 'navy'
    				};
    	if (location.search.match('scroll')) 
    	{
        	options.minPxPerSec = 100;
        	options.scrollParent = true;
    	}
    	// Init
    	wavesurfer.init(options);
    	// Load audio from URL
    	wavesurfer.load('/media/songs/1/sugar.mp3');
    	// Regions
    	if (wavesurfer.enableDragSelection) 
    	{
        	wavesurfer.enableDragSelection({color: 'rgba(0, 255, 0, 0.1)'});
    	}
    	wavesurfer.on('ready', function () 
    	{
    		//wavesurfer.play();
		});
		wavesurfer.on('error', function (err) 
		{
    		console.error(err);
		});
		// Do something when the clip is over
		wavesurfer.on('finish', function () 
		{
    		console.log('Finished playing');
		});
	} 
	return({
				init:function(id)
				{
					playlist=document.querySelectorAll('input[type="radio"]')
					for (var z=0;z<playlist.length;z++)
					{
						playlist[z].addEventListener('change',myFun);
						if(playlist[z].checked== true)
							myFun.bind(playlist[z]);
					}	
					var a = document.getElementsByTagName('article');
					user=a[0].getAttribute('data-user');
					sourceTag = document.getElementById(id);
					play.addEventListener('click',playTrack);
					next.addEventListener('click',nextTrack);
					previous.addEventListener('click',previousTrack);
					pause.addEventListener('click',pauseTrack);
					loop.addEventListener('click',loopTrack);
					up.addEventListener('click',volumeUp);
					down.addEventListener('click',volumeDown);
					wavesurfer=Object.create(WaveSurfer);
					if(wavesurfer)
					{
						console.log('zz');
					}
					handleWave();
				}
		});
})();
