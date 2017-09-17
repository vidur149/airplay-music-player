var manageFile =( function()
{
	var songList=[],
	fileList=[],
	songlist=[],
	localList=[];
	
	function handleFiles(e)
	{
		fileList = e.target.files;
		console.log(fileList);
		console.log(e);
		//console.log('hello');	
			console.log(fileList.length);
			console.log('hello');
			readFile(fileList[0]);
	}
	function readFile(file) 
	{
		var reader = new FileReader();
		reader.onload = function(e) 
		{
			if (file.type.match("audio/mp3"))
			{
				songInfo={};
				songInfo['name']=file.name;
				console.log(file);
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
		console.log(songInfo); 
    }
    function updateLocalStorage()
	{
		//var c = JSON.parse(localStorage.getItem('songs'));
		// c.push(songList);
		localStorage.setItem('songs',JSON.stringify(songList));
	}
	function updateImg()
	{
		var i=0,
			j=0;
		songlist=document.getElementsByClassName('all_songs');
		//console.log(songList);
		localList=JSON.parse(localStorage.songs);
		//console.log(localList);
		for (i=0; i<localList.length; i++)
		{
			for(j=0;j<songlist.length;j++)
			{
				if(localList[i].name == songlist[j].innerHTML.split('<a')[0])
				{
					console.log('hey');
					//break;			
				}
			}
		}	
	}
	return ({
			init:function(id)
			{
				document.getElementById(id).addEventListener('change', handleFiles);
				updateImg();		
			}
	})
})();
