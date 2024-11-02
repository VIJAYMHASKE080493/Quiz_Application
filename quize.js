function data()
{
const username = document.getElementById("username").value
const EmailID = document.getElementById("EmailID").value
const Password = document.getElementById("Password").value


if(username==""||EmailID==""||Password=="")
    {alert("All field are mandatary")
    return false;
    }
    else if(username.lenght<10||username.lenght>10)
    {alert("Number should be of 10 digit ! please")
            return false; 
    }
    else if(EmailID.lenght<10||EmailID.lenght>10)
    {alert("Number should be of 10 digit ! please")
            return false; 
    }
    else if(Password.lenght<10||Password.lenght>10)
    {alert("Number should be of 10 digit ! please")
            return false; 
    }
    {
        true;
        
    }
}