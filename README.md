# db2CodeDescription
Project that find a db2 sql erro code, showing his name, explanation and other informations about it.

# Error entity structure model
 ```
 {
	"errors": [{
		"id": 1,
		"code": "-007",
		"description": "STATEMENT CONTAINS THE ILLEGAL CHARACTER invalid-character",
		"explanation": "The specified invalid-character is not a valid character in SQL statements.",
		"system_action": "The statement cannot be processed.",
		"programmer_response": "Correct the syntax and resubmit the statement.",
		"sql_state": 42601,
		"searchs": 0
	}]
}
 ```
