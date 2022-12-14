[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# sftp-cg-lib

https://github.com/CloudGenUser/sftp-component

## _1. Introduction_

This code has the objective to stablish connection with a sftp server and depending of the flag it will make an diferent action.

Possible flags and their actions:

CREATEDIRECTORY - Create a directory in an specific path.
DELETEDIRECTORY - Delete the directory and their content.
DELETEFILE - Delete a file in an specific path.
DOWNLOADIRECTORY - Dowload the directory inside an sftp in a local machine.
GETFILE - Get the content of a file, an specific enconding can be requested.
GETLISTFILES - Get the list of files and directgories inside a specific path.
RENAMEFILE - Rename a file inside a path.
SAVEFILE - Create a file inside the sftp server, the content of the file is a string that can have an specific encondig, the enconding must be specified.
UPLOADIRECTORY - Take a directory for a local machine and save the content inside an sftp server.

Any other flag will be consider as an invalid value and will return a message error.

As components are used in the NXGP flows regardless that the library should be added on component code, when the flow is running, an exchange and some queues are created using the ID flow (assigned from NXGP).

## _2.	Library usage

The library can be installed from npm page with the next:

**`npm install sftp-cg-lib`**, **`npm i sftp-cg-lib`** or **`yarn install sftp-cg-lib`**


### _2.1. CREATEDIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.
username: The username that have grants to connect with the sftp server.
nameDirectory: The name of the directory that will be created.
path: The full path that will be used to create the directory.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.

- **Description:** This request will create a new directory inside the sftp server. Is posible to create a complete structure of directory in one request.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.
.
- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"CREATEDIRECTORY",
    "nameDirectory":"newDir/otherdir"
}

```

Resultant sample:

"\\newDir\\otherdir1 directory created"

In case the directory exists this message will be shown:

"\\newDir\\otherdir already exists"

```


### _2.2 DELETEDIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
nameDirectory: The nama of the directory that will be deleted with all the content inside it.
path: The full path that will be deleted the directory.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.

- **Description:** This request will delete a directory with all the documents inside it.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"DELETEDIRECTORY",
    "nameDirectory":"newDir"
}

```

Resultant sample:

"Successfully removed directory"

In case the directory does not exist this message will be shown:

{
    "code": "ERR_BAD_PATH",
    "custom": true
}
```


### _2.3. DELETEFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
file: The nama of the file that will be deleted.
path: The full path where the file that will be delete is.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.

- **Description:** This request will delete a specific file in the sftp server.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"DELETEFILE",
    "file":"file.txt"
}

```

Resultant sample:

"Successfully deleted \\file.txt"

In case the file does not exist this message will be shown:

{
    "code": 2,
    "custom": true
}
```


### _2.4. DOWNLOADIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path of the directory that will be download inside the sftp.
nameDirectory: The path of the directory with the name that will be created in the local machine. 
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.

- **Description:** This request will get a directory of the sftp and will save all the content inside the local machine.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"DOWNLOADIRECTORY",
    "nameDirectory":"C://Users//Documents"
}

```

Resultant sample:

"/ downloaded to C://Users//Documents"

If the path of sftp servert that was specified does not existe this message will be shown:

{
    "code": 5,
    "custom": true
}

```


### _2.5. GETFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path where is the file that will be get.
file: The name of the file that will be get.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.
encoding: The enconging that will be used to get the file, if this parameter is not sended base64 will be taken as default.

- **Description:** This request will get the content of a file in a string.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request without encoding (the default countent will be get in base64):**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"GETFILE",
    "file":"test.txt"
}

```

Resultant sample:

{
    "filename": "test.txt",
    "content": "dGVzdCBvZiBhIHNmdHAgY29tcG9uZW50"
}
```

- **Sample of a request with encoding:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"GETFILE",
    "file":"test.txt",
    "encoding": "utf8"
}

```

Resultant sample:

{
    "filename": "test.txt",
    "content": "test of a sftp component"
}

If a file that does not exist is tryed to be get this message will be shown:

{
    "code": 3,
    "custom": true
}

```


### _2.6. GETLISTFILES_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path where will be get the list of files and directories.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.

- **Description:** This request will get a string in json format with all the files and directories inside the path specified.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"GeTLiSTFILES"
}

```

Resultant sample:

[
    {
        "type": "-",
        "name": "vista.txt",
        "size": 5,
        "modifyTime": 1660166815000,
        "accessTime": 1660166815000,
        "rights": {
            "user": "rw",
            "group": "rw",
            "other": "rw "
        },
        "owner": 0,
        "group": 0,
        "longname": "-rw-rw-rw   1     root     root         5 Aug 10 16:26 vista.txt"
    },
    {
        "type": "-",
        "name": "Xp.txt",
        "size": 8,
        "modifyTime": 1660166684000,
        "accessTime": 1660166674000,
        "rights": {
            "user": "rw",
            "group": "rw",
            "other": "rw "
        },
        "owner": 0,
        "group": 0,
        "longname": "-rw-rw-rw   1     root     root         8 Aug 10 16:24 Xp.txt"
    }
]

If a path that does not exist is specified this message will be shown:

{
    "code": 5,
    "custom": true
}
```


### _2.7. RENAMEFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path where the file is.
file: The old name of the file that will be renamed.
nameNewFile: The new name of the file that will be used.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.


- **Description:** This request will rename a file inside the sftp.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"RENAMEFILE",
    "file":"testOldName.txt", 
    "nameNewFile":"testNewName.txt"
}

```

Resultant sample:

"Successfully renamed \\testOldName.txt to \\testNewName.txt"

if the file that will be renamed does not exist this message will be shown:

{
    "code": 2,
    "custom": true
}
```


### _2.8. SAVEFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
content: The content of the file, that will be saved.
path The path where the file will be saved.
file: The name and extension that will be used for the new file.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.
encoding: The enconging that will be used to get the file, if this parameter is not sended base64 will be taken as default.

- **Description:** This request will save a file inside the sftp, the string with the content could be in severals formats, the parameter encoding sloud be specified in case of a content different to base64.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request no enconding specified so the content should be base64:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"SAVEFILE",
	"content":"dGVzdCBvZiBhIHNmdHAgY29tcG9uZW50",
    "file":"testNewFile.txt"
}

```

Resultant sample:

"Uploaded data stream to \\testNewFile.txt"
```

- **Sample of a request with enconding:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"SAVEFILE",
	"content":"Hello world.",
    "file":"testNewFile.txt",
    "enconding":"utf8"
}

"Uploaded data stream to \\testNew.txt"

```

Resultant sample:

"Uploaded data stream to \\testNewFile.txt"

If the file that will be created already existe, the current file will be rename adding the date in the name and the new file will be create with the name in the request.
```


### _2.9. UPLOADIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where where the connection will be stablished, can be a url or ip.
path: The path that will be used to work on.
port: The port that is open to access to the sftp server.,
username: The username that have grants to connect with the sftp server.
nameDirectory: The path of the directory source that will be uploaded.
path: The path where the directory will be uploaded and the name of the new directory.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can stablish connection with the sftp, if this parameter is used avoid to use the password parameter, in case the two parameters are specified this will have priority and the password will be ignored.
password: This parameter contains the password that can stablish connection with the sftp.

- **Description:** This request will send the content of a local directory to the sftp server.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"localhost", 
	"port":22, 
	"username":"admin", 
	"password":"admin", 
    "path":"/",
    "flag":"UPLOADIRECTORY",
    "localDirectory":"C://Users//Documents"
}

```

Resultant sample:

"C://Users////Documents// uploaded to /"

if the local path does not exist this message will be shown:

{
    "code": "ERR_BAD_PATH",
    "custom": true
}
```