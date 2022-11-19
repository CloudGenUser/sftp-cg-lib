[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# sftp-cg-lib

https://github.com/CloudGenUser/sftp-component

## _1. Introduction_

This code has the objective to establish connection with a sftp server and depending of the flag it will make an diferent action.

Possible flags and their actions:

CREATEDIRECTORY - Create a directory in a specific path.
DELETEDIRECTORY - Delete the directory and their content.
DELETEFILE - Delete a file in a specific path.
DOWNLOADIRECTORY - Download the directory inside a sftp in a local machine.
GETFILE - Get the content of a file, a specific encoding can be requested.
GETLISTFILES - Get the list of files and directories inside a specific path.
RENAMEFILE - Rename a file inside a path.
SAVEFILE - Create a file inside the sftp server, the content of the file is a string that can have an specific encondig, you have to specify the enconding.
UPLOADIRECTORY - Take a directory for a local machine and save the content inside an sftp server.

Any other flag will be considered as an invalid value and will return a message error.

As components are used in the NXGP flows regardless that the library should be added on component code, when the flow is running, an exchange and some queues are created using the ID flow (assigned from NXGP).
> Before returning the response, the method will validate that the output JSON is a correct JSON, if it is correct the flow will continue the method will return the result otherwise the method will send an exception and the flow will stop (only with flag GETLISTFILES).

## _2.	Library usage

The library can be installed from npm page with the next:

**`npm install sftp-cg-lib`**, **`npm i sftp-cg-lib`** or **`yarn install sftp-cg-lib`**


### _2.1. CREATEDIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.
username: The username that have grants to connect with the sftp server.
nameDirectory: The name of the directory that will be created.
path: The full path where you want to create the directory.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.

- **Description:** This request will create a new directory inside the sftp server. Is posible to create a complete structure of directory in one request.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.
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

In case the directory exists you will have this message:

"\\newDir\\otherdir already exists"

```


### _2.2 DELETEDIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
nameDirectory: The name of the directory that will be deleted with all the content inside it.
path: The full path where you want to delete the directory.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.

- **Description:** This request will delete a directory with all the documents inside it.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

In case the directory does not exist you will have this message:

{
    "code": "ERR_BAD_PATH",
    "custom": true
}
```


### _2.3. DELETEFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
file: The name of the file that will be deleted.
path: The full path where you want to delete the file.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.

- **Description:** This request will delete a specific file in the sftp server.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

In case the file does not exist you will have this message:

{
    "code": 2,
    "custom": true
}
```


### _2.4. DOWNLOADIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path of the directory that we want to download inside the sftp.
nameDirectory: The path of the directory with the name that we want to create in our local machine. 
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.

- **Description:** This request will get a directory of the sftp and will save all the content inside our local machine.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

If the path of sftp servert that you are speficying does not existe you will have this message:

{
    "code": 5,
    "custom": true
}

```


### _2.5. GETFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path where is the file we want to get.
file: The name of the file that we wnt to get.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.
encoding: The encoding that we want to use to get the file, if this parameter is not sent base64 will be taken as default.

- **Description:** This request will get the content of a file in a string.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

- **Sample of a request without encoding (the default content will be get in base64):**
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

If you try to get a file that does no exist you will have this message:

{
    "code": 3,
    "custom": true
}

```


### _2.6. GETLISTFILES_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path where we want to get the list of files and directories.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.

- **Description:** This request will get a string in json format with all the files and directories inside the path specified.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

If you specify a path that does not exist you will have this message:

{
    "code": 5,
    "custom": true
}
```


### _2.7. RENAMEFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
path: The path where the file is.
file: The old name of the file we want to rename.
nameNewFile: The new name of the file we want.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.


- **Description:** This request will rename a file inside the sftp.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

if the file you want to rename does not exist you will have this message:

{
    "code": 2,
    "custom": true
}
```


### _2.8. SAVEFILE_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
content: The content of the file, we want to save.
path The path where the file will be saved.
file: The name and extension we want to use for the new file.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.
encoding: The encoding that we want to use to get the file, if this parameter is not sent base64 will be taken as default.

- **Description:** This request will save a file inside the sftp, the string with the content could be in severals formats, the parameter encoding sloud be specified in case of a content different to base64.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

If the file you want to create already existe, the current file will be rename adding the date in the name and the new file will be create with the name in the request.
```


### _2.9. UPLOADIRECTORY_

- **Args:** 
Needed:
flag: The string that contains the action to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
host: The host where you will connect, can be an url or ip.
path: The path where you will be working on.
port: The port where you will access to the sftp server.,
username: The username that have grants to connect with the sftp server.
nameDirectory: The path of the directory source we want to upload.
path: The path were the directory will be uploaded and the name of the new directory.
Optionals:
key: Parameter that have the path where is the key and the name of the key file that can establish connection with the sftp, if you use this parameter avoid to use the password parameter, in case you specify the two parameters this will have priority and the password will be ignored.
password: This parameter contains the password that can establish connection with the sftp.

- **Description:** This request will send the content of a local directory to the sftp server.
Once the request is sent, the answer will be a string in a JSon format with the result of the excecution.

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

if the local path does not exist you will have this message:

{
    "code": "ERR_BAD_PATH",
    "custom": true
}
```