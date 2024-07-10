*** Settings ***
Library     SeleniumLibrary
Library     Telnet
Library     String
Library     BuiltIn
Library     RequestsLibrary
Library     Collections
Library     OperatingSystem
Resource    variables.robot


*** Keywords ***
Open Browserwindow
    # for debugging
	# Set Selenium Speed   0.1

	Set Selenium Implicit Wait    2
    Open Browser         ${url}     ${browser}


Go To Frontpage
    Go To                ${url}


Close Browserwindow
    Close Browser


Go To Registerationpage
    Go To                            ${url}/register
    Wait Until Element Is Visible    xpath=//*[@id="name"]              2
    Wait Until Element Is Visible    xpath=//*[@id="surname"]           2
    Wait Until Element Is Visible    xpath=//*[@id="email"]             2
    Wait Until Element Is Visible    xpath=//*[@id="password"]          2
    Wait Until Element Is Visible    xpath=//*[@id="confirmPassword"]   2


Go To Settingspage
	Click Element                  xpath=//*[@id="root"]/div/header/div/div[2]/button
	Wait Until Element Is Visible  xpath=/html/body/div[2]/div[3]/ul/li[1]       2
	Click Element                  xpath=/html/body/div[2]/div[3]/ul/li[1]
	Location Should Be             ${url}/settings


Enter Registeration Credentials
    [Arguments]        ${firstname}  ${lastname}  ${email}  ${pw}
    Input Text         xpath=//*[@id="name"]              ${firstname}
    Input Text         xpath=//*[@id="surname"]           ${lastname}
    Input Text         xpath=//*[@id="email"]             ${email}
    Input Password     xpath=//*[@id="password"]          ${pw}
    Input Password     xpath=//*[@id="confirmPassword"]   ${pw}
    Sleep              0.5


Go To Loginpage
    Go To                            ${url}/login
    Wait Until Element Is Visible    xpath=//*[@id="email"]           2
    Wait Until Element Is Visible    xpath=//*[@id="password"]        2


Go To Reservationpage
    Go To Schoolpage From Logo
	Wait Until Element Is Visible  xpath=//*[@id="root"]/div/div/div/div[1]/div/button    2
	Click Element                  xpath=//*[@id="root"]/div/div/div/div[1]/div/button
	Location Should Contain        reservations


Go To Schoolpage From Logo
	Wait Until Element Is Visible  xpath=//*[@id="root"]/div/header/div/div[1]   2
	Click Element                  xpath=//*[@id="root"]/div/header/div/div[1]
	Location Should Be             ${url}/schools


Enter Login Credentials
    [Arguments]        ${email}  ${pw}
    Input Text         xpath=//*[@id="email"]             ${email}
    Input Password     xpath=//*[@id="password"]          ${pw}


Login User Detailed
    [Arguments]                 ${email}  ${pw}  ${new_firstname}  ${new_lastname}
    Go To Loginpage
	Enter Login Credentials     ${email}  ${pw}
	Click Login Button
	Wait Until Location Is Not  ${url}/login     2
	Location Should Be          ${url}/schools
	Page Should Contain         ${new_firstname} ${new_lastname}


Logout User Detailed
	Click Element                  xpath=//*[@id="root"]/div/header/div/div/button
	Wait Until Element Is Visible  xpath=/html/body/div[2]/div[3]/ul/li[2]    2
	Click Element                  xpath=/html/body/div[2]/div[3]/ul/li[2]
	Location Should Be             ${url}/login


Click Login Button
	Click Button    xpath=//*[@id="root"]/div/main/div[2]/form/button


Click Register Button
    Click Button    xpath=//*[@id="root"]/div/main/div[2]/form/button


Click Update Information Button
    Click Button    xpath=//*[@id="root"]/div/div/div[3]/div[2]/div/div[1]/form/button


Create Random User
    ${current_time}=  Evaluate   time.time()  time
    Evaluate          random.seed(${current_time})  random
    ${firstname}=     Evaluate   random.choice(@{r_firstnames})   random
	${lastname}=      Evaluate   random.choice(@{r_lastnames})    random
	${provider}=      Evaluate   random.choice(@{r_providers})    random
	${tld}=           Evaluate   random.choice(@{r_tlds})         random
	${email}=         Evaluate   '${firstname}.${lastname}@${provider}.${tld}'.lower()
	${user}=          Create Dictionary  firstname=${firstname}  lastname=${lastname}  provider=${provider}  tld=${tld}  email=${email}
	[Return]          ${user}


Select First Building In Filter
	Wait Until Element Is Visible  xpath=//*[@id="building-multiple-checkbox"]    2
	Click Element                  xpath=//*[@id="building-multiple-checkbox"]
    Wait Until Element Is Visible  xpath=//*[@id="menu-"]/div[3]                  2
	Click Element                  xpath=//*[@id="menu-"]/div[3]/ul/li
	Press Keys                     xpath=//*[@id="building-multiple-checkbox"]    ESCAPE


Select First Floor In Filter
	Wait Until Element Is Visible  xpath=//*[@id="floor-select"]        2
	Click Element                  xpath=//*[@id="floor-select"]
	Wait Until Element Is Visible  xpath=//*[@id="menu-"]/div[3]        2
	Click Element                  xpath=//*[@id="menu-"]/div[3]/ul/li


Select Next Month In Filter
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div[2]/div[1]/form/div[2]/div/div/div/div/button              2
	Click Element                    xpath=//*[@id="root"]/div/div[2]/div[1]/form/div[2]/div/div/div/div/button
	Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[2]/button[2]                         2
	Click Element	                 xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[2]/button[2]
	Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[2]/button[2]    2
	Click Element 	                 xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[2]/button[2]


Select Starttime In Filter
    Wait Until Element Is Visible  xpath=//*[@id="starttime-select"]        2
	Click Element                  xpath=//*[@id="starttime-select"]
    Wait Until Element Is Visible  xpath=//*[@id="menu-"]/div[3]            2
	Scroll Element Into View       xpath=//*[@id="menu-"]/div[3]/ul/li[25]
    Click Element                  xpath=//*[@id="menu-"]/div[3]/ul/li[25]


Select Endtime In Filter
    Wait Until Element Is Visible    xpath=//*[@id="endtime-select"]           2
	Click Element                    xpath=//*[@id="endtime-select"]
	Wait Until Element Is Visible    xpath=//*[@id="menu-"]/div[3]             2
	Scroll Element Into View         xpath=//*[@id="menu-"]/div[3]/ul/li[29]
	Click Element                    xpath=//*[@id="menu-"]/div[3]/ul/li[29]


Select Twelve To One Timeslot In Filter
    Select Starttime In Filter
	Select Endtime In Filter


Select First Room In Filter
	Wait Until Element Is Visible    xpath=//*[@id="classroom-select"]    2
	Click Element                    xpath=//*[@id="classroom-select"]
	Wait Until Element Is Visible    xpath=//*[@id="menu-"]/div[3]        2
	Click Element                    xpath=//*[@id="menu-"]/div[3]/ul/li


Select Groupsize Five In Filter
	Wait Until Element Is Visible    xpath=//*[@id="groupsize-select"]    2
	Click Element                    xpath=//*[@id="groupsize-select"]
	Wait Until Element Is Visible    xpath=//*[@id="menu-"]/div[3]        2
	Click Element                    xpath=//*[@id="menu-"]/div[3]/ul/li


Select All Filters
    Select First Building In Filter
	Select First Floor In Filter
	Select Next Month In Filter
	Select Twelve To One Timeslot In Filter
	Select First Room In Filter
	Select Groupsize Five In Filter


Validate Empty Filters
    Element Text Should Be         xpath=//*[@id="building-multiple-checkbox"]  ${EMPTY}
	Element Text Should Be         xpath=//*[@id="floor-select"]         ${EMPTY}
	Element Text Should Be         xpath=//*[@id="starttime-select"]     ${EMPTY}
    Element Should Not Be Visible  xpath=//*[@id="endtime-select"]
	Element Text Should Be         xpath=//*[@id="classroom-select"]     ${EMPTY}
	Element Text Should Be         xpath=//*[@id="groupsize-select"]     ${EMPTY}


Filter Clear Button
    Click Button   xpath=//*[@id="root"]/div/div[2]/div[1]/form/div[6]/button


Filter Search Button
    Click Button        xpath=//*[@id="root"]/div/div[2]/div[1]/form/button




