# Codes HTTP 

- Les réponses informatives (100 - 199)
- Les réponses de succès (200 - 299)
- Les messages de redirection (300 - 399)
- Les erreurs du client (400 - 499)
- Les erreurs du serveur (500 - 599)

1xx Informational
Code	Name	Description
100	Continue	The server has received the request headers and the client should proceed with the request.
101	Switching Protocols	The server is switching protocols according to the client's request.
2xx Success
Code	Name	Description
200	OK	The request has succeeded.
201	Created	The request has been fulfilled, resulting in the creation of a new resource.
202	Accepted	The request has been accepted for processing, but the processing has not been completed.
204	No Content	The server has successfully fulfilled the request, but there is no content to send back.
3xx Redirection
Code	Name	Description
300	Multiple Choices	The requested resource has multiple choices, each with different locations.
301	Moved Permanently	The requested resource has been permanently moved to a new location.
302	Found	The requested resource has been temporarily moved to a different location.
304	Not Modified	The client's cached version of the requested resource is up to date.
4xx Client Errors
Code	Name	Description
400	Bad Request	The server cannot process the request due to a client error.
401	Unauthorized	The client must authenticate itself to get the requested response.
403	Forbidden	The server understood the request, but refuses to authorize it.
404	Not Found	The requested resource could not be found on the server.
405	Method Not Allowed	The method specified in the request is not allowed for the resource.
5xx Server Errors
Code	Name	Description
500	Internal Server Error	The server encountered an unexpected condition that prevented it from fulfilling the request.
501	Not Implemented	The server does not support the functionality required to fulfill the request.
503	Service Unavailable	The server is currently unable to handle the request due to a temporary overload or maintenance.
