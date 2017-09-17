var managePlaylist=(function()
{
		'use strict';
		var user,
		playlist=[],
		liList=[],
		liName=[],
		playControl=1,
		src,
		ele,
		size,
		s=0,
		media_url,
		z,
		volume=1,
		wavesurfer,
		buttonControl=1,
		commands = {
			'play' : playTrack,
			'next (track)':nextTrack,
			'previous (track)':previousTrack,
			'pause (track)':playTrack,
			'increase the volume':volumeUp,
			'decrease the volume':volumeDown,
			'mute':mute,
			'full volume':maxVol,
			};
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
			var singla=document.querySelector('#progress');
			singla.innerHTML=' ';
			handleWave();
		}
	function getSrc()
	{
		media_url = document.body.getAttribute('data-media-url');
		ele=document.getElementById('song');
		console.log(liName[s]);
		src=media_url + "songs/" +user+ '/' + liName[s] ;
		//sourceTag.setAttribute('src',src);
		for(z=0;z<liList.length;z++)
		{
			liList[z].style.backgroundColor='transparent';
		}
		liList[s].style.backgroundColor="rgb(60, 60, 60)";
		return(src);	
		//ele.addEventListener('ended',nextTrack);
	}
	function playTrack()
	{
		wavesurfer.playPause();
		if(playControl == 1)
		{
			play.style.visibility='hidden';
			pause.style.display='block';
			playControl = 2;
		}
		else
		{
			pause.style.display='none';
			play.style.visibility='visible';
			playControl = 1;
		}
		
	}
	function nextTrack()
	{	
		if((s+1)<size)
		{
			s=s+1;
			var singla=document.querySelector('#progress');
			singla.innerHTML=' ';
			handleWave();
		}
		else
			alert('no more songs');
	}
	function previousTrack()
	{
		if(s>0)
		{
			s=s-1;
			var singla=document.querySelector('#progress');
			singla.innerHTML=' ';
			handleWave();
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
	    if( volume >= 1)
	    	window.alert("Max Volume");
	    else
	    {
	    	volume+=0.1;
	    	wavesurfer.setVolume(volume);
	    }
	}
	function volumeDown()
	{
	    if( volume <= 0)    
	    	window.alert("Min Volume");
	    else
	    {
	    	volume-=0.1;
	    	wavesurfer.setVolume(volume);
	    }
	}
	function mute()
	{
		wavesurfer.setVolume(0);
	}
	function maxVol()
	{
		wavesurfer.setVolume(1);
	}
	function handleWave() 
	{
		console.log('zz');
    	var options = {
        	container     : document.querySelector('#progress'),
        	waveColor     : 'orange',
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
    	wavesurfer.load(getSrc());
    	// Regions
    	if (wavesurfer.enableDragSelection) 
    	{
        	wavesurfer.enableDragSelection({color: 'rgba(0, 255, 0, 0.1)'});
    	}
		wavesurfer.on('error', function (err) 
		{
    		console.error(err);
		});
		// Do something when the clip is over
	} 
	function handleClick(e)
	{
		e.stopPropagation();
		if(buttonControl == 1)
		{
			buttons.style.display='flex';
			buttonControl=2;
			this.style.top='-63px'
		}
		else
		{
			buttons.style.display='none';
			this.style.top='1px'
			buttonControl=1;
		}	
	}
	return({
				init:function()
				{
					playlist=document.querySelectorAll('input[type="radio"]')
					for (var z=0;z<playlist.length;z++)
					{
						playlist[z].addEventListener('change',myFun);
					}	
					//myFun.bind(playlist);
					var a = document.getElementsByTagName('article');
					user=a[0].getAttribute('data-user');
					play.addEventListener('click',playTrack);
					pause.addEventListener('click',playTrack);
					next.addEventListener('click',nextTrack);
					previous.addEventListener('click',previousTrack);
					up.addEventListener('click',volumeUp);
					down.addEventListener('click',volumeDown);
					wavesurfer=Object.create(WaveSurfer);
					wavesurfer.on('ready', function () 
    				{
    					var timeline = Object.create(WaveSurfer.Timeline);
    					timeline.init({
        								wavesurfer: wavesurfer,
        								container: document.querySelector('#timeline'),
        								primaryColor: 'black',
        								secondaryColor: 'black',
        								primaryFontColor: 'black',
        								secondaryFontColor: 'black',
        								fontSize:'20'
    								});
    					wavesurfer.play();
					});
					wavesurfer.on('finish', function () 
					{
    					nextTrack();
					});
					tog.addEventListener('click',handleClick);
				},
				voice:function()
				{
					if(annyang)
					{		
						annyang.addCommands(commands);
						annyang.setLanguage('en-IN');
						annyang.start();
						annyang.debug();		
					}						
				}
		});
})();
