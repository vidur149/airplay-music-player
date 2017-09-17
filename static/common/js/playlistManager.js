var managePlaylist=(function()
{
	var i=2,
		songList=[],
		playlist=[],
		playLIST=[],
		sourceTag,
		liList=[],
		cont_div,
		loopControl=1,
		src,
		name,
		ele,
		j=0,
		s=0,
		commands = {
			'play' : playTrack,
			'next (track)':nextTrack,
			'previous (track)':previousTrack,
			'pause (track)':pauseTrack,
			'repeat (track)':loopTrack,
			'increase the volume':volumeUp,
			'decrease the volume':volumeDown,
			};
	function handledrop(e) 
	{
		songList=JSON.parse(localStorage.getItem('songs'));
		//console.log(songList);
		cont_div=this;
		e.preventDefault(); 
		e.stopPropagation();
		this.classList.add("content");
		this.classList.remove("enter2");
		this.innerHTML+=JSON.parse(localStorage.getItem('drag'));
		playList=[];
		liList=this.childNodes;
		for(j=0;j<liList.length;j++)
		{
			for(var k=0;k<songList.length;k++)
			{ 
				if(songList[k]['name'] == liList[j].innerHTML)
					{
						playList.push(songList[k]);
						break;
					}
  			}
		}
	}
	function dragOver(e) 
	{
		e.preventDefault(); 
		e.stopPropagation(); 
		e.dataTransfer.dropEffect = 'copy';
	}
	function dragEnter(e) 
	{
		this.classList.add("enter2");
		this.classList.remove("content");
	}
	function dragLeave(e) 
	{
		this.classList.add("content");
		this.classList.remove("enter2");
	}
	function create()
	{
		if(i>5)
		{
			window.alert('You cant create more playlists');
		}
		else
		{
			var cont=document.getElementsByClassName('content')
			var ele=document.getElementById('tab-'+(i-1));
			var tab=document.getElementById('tabs');
			var name=prompt('Enter the name of the playList');
			if(name== '')
				window.alert('Enter a name for the PlayList');
			else
			{	
				new_input=document.createElement('input');
				new_label=document.createElement('label');
				new_input.setAttribute('id','tab-'+i);
				new_input.setAttribute('class','input-'+i);
				new_input.setAttribute('name','radio-set');
				new_input.setAttribute('type','radio');
				new_label.setAttribute('for','tab-'+i);
				new_label.innerHTML=name || 'playlist '+i;
				tab.insertBefore(new_label,ele);
				tab.insertBefore(new_input,new_label);
				new_div=document.createElement('div');
				new_div.setAttribute('id','cont-'+i);
				new_div.setAttribute('class','input-'+i);
				cont[0].appendChild(new_div);
				new_div.addEventListener('dragover',dragOver); 
				new_div.addEventListener('dragenter',dragEnter);
				new_div.addEventListener('dragleave', dragLeave);
				new_div.addEventListener('drop',handledrop);
				for (var z=0;z<playlist.length;z++)
						{
							playlist[z].addEventListener('change',myFun);
						}
				i++;
			}
		}
	}
	function myFun()
		{	
			var className=this.getAttribute('class'),
			par=document.getElementsByClassName(className)[1],
			k=0;
			liList=par.childNodes;
			playList=[];
			cont_div=par;
			for(j=0;j<liList.length;j++)
			{		
				for(var k=0;k<songList.length;k++)
				{ 
					if(songList[k]['name'] == liList[j].innerHTML)
						playList.push(songList[k]);
  				}
			}
			for(z=0;z<liList.length;z++)
			{
				liList[z].style.backgroundColor='transparent';
			}
			s=0;
			liList[s].style.backgroundColor="rgb(124, 124, 124)";	
		}
	function playTrack()
	{
		var z;
		ele=document.getElementById('song');
		src=playList[s]['source'];
		name=playList[s]['name'];
		console.log(playList[s].image);
		console.log(playList[s]);
		back.style.backgroundImage='url' + '(' + playList[s]['image'] +')';
		sourceTag.setAttribute('src',src);
		for(z=0;z<liList.length;z++)
		{
			liList[z].style.backgroundColor='transparent';
		}
		liList[s].style.backgroundColor="rgb(124, 124, 124)";	
		ele.load();
		ele.play();
		if(ele.loop == true)
			liList[s].style.backgroundColor="black";	
		console.log(s);
		console.log(name);
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
		if((s+1)<j)
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
			liList[s].style.backgroundColor="rgb(124, 124, 124)";	
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
	return({
				init:function(id,id2,id3)
				{
					
					//console.log(songList);
					var createPlay=document.getElementById(id);
					var cont=document.getElementById(id2);
					createPlay.addEventListener('click',create);
					cont.addEventListener('dragover',dragOver); 
					cont.addEventListener('dragenter',dragEnter);
					cont.addEventListener('dragleave', dragLeave);
					cont.addEventListener('drop',handledrop)
					playlist=document.getElementsByTagName('input');	
					playlist[0].addEventListener('change',myFun);
					if(playlist[0].checked== true)
						myFun.bind(playlist[0]);
					sourceTag = document.getElementById(id3);
					play.addEventListener('click',playTrack);
					next.addEventListener('click',nextTrack);
					previous.addEventListener('click',previousTrack);
					pause.addEventListener('click',pauseTrack);
					loop.addEventListener('click',loopTrack);
					up.addEventListener('click',volumeUp);
					down.addEventListener('click',volumeDown);
		
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
