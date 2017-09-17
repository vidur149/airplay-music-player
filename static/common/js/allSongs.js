var myMusicPlayer=(function()
{ 
	var dropZone,
		songList=[],
		url,
		songInfo={},
		media_url,
		liList=[];
		/*	*/
	function dragOver(e) 
	{
		e.preventDefault(); 
		e.stopPropagation(); 
		e.dataTransfer.dropEffect = 'copy';
	}
	function dragEnter(e) 
	{
		this.setAttribute('class','enter');

	}
	function dragLeave(e) 
	{
		this.setAttribute('class','drop');
	}
	function dropHandle(e) 
	{
		e.preventDefault(); 
		e.stopPropagation();
		this.setAttribute('class','drop');
		var fileList = e.dataTransfer.files;
		if (fileList.length > 0) 
		{
			for(var i=0;i<fileList.length;i++)
			{
				readFile(fileList[i]);
			}
		}
	}
	function readFile(file) 
	{
		media_url = document.body.getAttribute('data-media-url');
		var reader = new FileReader();
		var new_li=document.createElement('li');
		reader.onload = function(e) 
		{
			if (file.type.match("audio/mp3"))
			{
				songInfo={};
				songInfo['name']=file.name;
				//console.log(file);
				songInfo['source']=media_url + "Mymusic/" +file.name ;
				console.log(songInfo['source'])
				url=file.name;
				ID3.loadTags(url, function() 
				{
        			showTags(url);
      			}, 
      			{
					tags: ["title","artist","album","picture"],
        			dataReader: FileAPIReader(file)
      			});
				songList.push(songInfo);
				new_li.innerHTML=file.name;
				new_li.setAttribute('name',file.name);
				new_li.setAttribute('draggable',true);	
				liList.push(new_li);			
				dropZone.appendChild(new_li);
				new_li.addEventListener('dragstart',dragStart);
			}
		};
    	reader.readAsDataURL(file);
	}
	function showTags(url) 
	{
      	var tags = ID3.getAllTags(url);
      	//console.log(tags);
      	songInfo['artist']= tags.artist || "";
      	songInfo['album'] = tags.album || "";
      	var image = tags.picture;
      	if (image) 
      	{
        	var base64String = "";
        	for (var i = 0; i < image.data.length; i++) 
        	{
            	base64String += String.fromCharCode(image.data[i]);
        	}
        	var base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
        	songInfo['image']=base64 || 'none';
      	}
      	updateLocalStorage();
		//console.log(songInfo); 
    }
	function dragStart(e)
	{
		e.dataTransfer.dropEffect = 'copy';
		e.dataTransfer.effectAllowed = 'copy'
   	 	localStorage.setItem('drag',JSON.stringify(this.outerHTML));
	}
	function updateLocalStorage()
	{
		localStorage.setItem('songs',JSON.stringify(songList));
		localStorage.setItem('list',JSON.stringify(liList));
	}
	function print()
	{
		updateLocalStorage();
			console.log(songList);
			console.log(liList);
	}
	return({
			init:function(id1)
			{	
				dropZone = document.getElementById(id1);
				dropZone.addEventListener('dragover',dragOver); 
				dropZone.addEventListener('dragenter',dragEnter);
				dropZone.addEventListener('dragleave', dragLeave);
				dropZone.addEventListener('drop', dropHandle);
		}/*,
		*/
		});
})();
