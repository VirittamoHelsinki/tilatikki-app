*** Settings ***
Library          SeleniumLibrary
Library          Telnet
Library          String
Library          BuiltIn
Library          RequestsLibrary
Library          Collections
Library          OperatingSystem
Resource         keywords.robot
Resource         variables.robot
Suite Setup      Open Browserwindow
Suite Teardown   Close Browser

*** Test Cases ***
# OK
Register new user
    [Tags]  register  valid
    Go To Registerationpage
    Enter Registeration Credentials      ${firstname}  ${lastname}  ${email}  ${pw}
	Click Register Button
    Wait Until Location Is Not           ${url}/register    2
    Location Should Be                   ${url}/login
