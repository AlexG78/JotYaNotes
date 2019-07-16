var notepadFlag = 0;
var notepadCount = 0;


// Function used to count words when passed text
function countWords()
{
	function numOfWords(contents)
	{
		var matchedWord = contents.match(/\S+/g);
		return {words : matchedWord ? matchedWord.length : 0};
	}
	
	var textContent = document.getElementById("noteBox");
	var showWordCount = document.getElementById("wordCount");
	textContent.addEventListener("input", function()
	{
		var numWords = numOfWords(this.value);
		showWordCount.innerHTML = ("Words: "+ numWords.words);
	}, false);
}

// Function used to add a notepad to the user's account
function addNotepad()
{
	
	if(notepadCount == 0)
	{
		$("#notepadTextArea").show();
		$("#deleteButton").removeClass("disabled");
	}
	
	notepadCount = notepadCount + 1;
	notepadNumber = "notepad" + notepadCount;
	notepadFlag = notepadCount;
	htmlBlock = '<button id="'+notepadNumber+'" type="button" class="btn btn-light navButtons" onclick="gotoNotepad(\'' + notepadFlag + '\')"><div id="'+notepadNumber+'">Notepad ' + notepadFlag +'</div></button>'
	$("#notesPane").append(htmlBlock);
	$("#subHeading").text("Notepad " + notepadFlag);
}

// Function used to save the notes to an account
function saveNotepad()
{
	if($("#welcomeMessage").is(":visible")) 
	{
		var notepadName = document.getElementById("subHeading").innerHTML;
		document.getElementById("notepad" + notepadFlag).innerHTML = notepadName;
		
		var currentDate = new Date();
		
		var date = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();

		var hour = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		
		var dateString = date + "/" +(month + 1) + "/" + year + " @ " + hour + ":" + minutes;	
		$("#lastModified").text("Last Modified " + dateString);
	}
	else
	{
		alert("Please login to save your notepad.");
	}
}

// Function used to rename notepad titles
function renameNotepad()
{
	var notepadName = document.getElementById("newNotepadName");
	subHeading.innerHTML = (notepadName.value);
}

// Function used to delete a notepad from a user's account
function deleteNotepad()
{
	if(notepadCount == 0)
	{
		alert("Cannot delete note.");
	}
	else
	{
		var selectedNotepad = "notepad" + notepadFlag;
		$('#'+selectedNotepad).remove();
		notepadCount = notepadCount - 1;
		$("#notepadTextArea").hide();
		if(notepadCount == 0)
		{
			$("#deleteButton").removeClass("disabled");
		}
	}
}

// Function that selects the notepad the user clicks on.
function gotoNotepad(flag)
{
	notepadFlag = flag;
	var noteName = document.getElementById("notepad" + notepadFlag).innerHTML;
	document.getElementById("subHeading").innerHTML = noteName;
	loadNotepad(notepadFlag);
}

// Function that loads the title and content of the notepad from the database
function loadNotepad(notepadFlag)
{
	$("#notepadTextArea").show();
}

// Function that takes the user's credentials and logs them into the website. It also retrieves their saved notes.
function login(id, pass)
{
	$("#saveButton").removeClass("disabled");
	$("#loginButton").hide();
	$("#notepadTextArea").hide();
	for(i = 0; i < notepadCount + 1; i++)
	{
		$('#notepad'+i).remove();
	}
	notepadCount = 0;
	
	$("#welcomeMessage").show();
	
	$("#logoutButton").css(
	{	
		"width": "100%",
		"margin-top": "30%" 
	});
	
	$("#addNotepadButton").removeClass("disabled");
	$("#logoutButton").show();
	
	var usernameInput = $("#" + id).val();
	$("#welcomeMessage").text("Welcome " + usernameInput + "!");
}

// Function that takes the user's credentials and then adds them to the login database.
function createAccount()
{
	if($("#createPasswordInput").val().length < 8)
	{
		alert("Please enter a password with a minimum of 8 characters.");
	} 
	else if($("#createPasswordInput").val() != $("#repeatPasswordInput").val())
	{
		alert("Passwords do not match");
	}
	else
	{
		login("createUsernameInput", "createPasswordInput");
	}
}

// Function that logs the user out of the website and removes any open notes.
function logout()
{
	$("#saveButton").addClass("disabled");
	$("#logoutButton").hide();
	$("#welcomeMessage").hide();
	
	for(i = 0; i < notepadCount + 1; i++)
	{
		$('#notepad'+i).remove();
	}
	$("#notepadTextArea").hide();
	notepadCount = 0;
	$("#loginButton").show();
	$("#addNotepadButton").removeClass("disabled");
}


