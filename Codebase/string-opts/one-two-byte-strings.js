// node --allow-natives-syntax one-two-byte-strings.js

%DebugPrint('hello'); // INTERNALIZED_ONE_BYTE_STRING_TYPE

%DebugPrint('привіт'); // INTERNALIZED_TWO_BYTE_STRING_TYPE
