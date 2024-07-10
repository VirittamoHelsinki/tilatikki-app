
Go To Registerationpage
    Go To                            ${url}/register
    Wait Until Element Is Visible    xpath=//*[@id="name"]              2
    Wait Until Element Is Visible    xpath=//*[@id="surname"]           2
    Wait Until Element Is Visible    xpath=//*[@id="email"]             2
    Wait Until Element Is Visible    xpath=//*[@id="password"]          2
    Wait Until Element Is Visible    xpath=//*[@id="confirmPassword"]   2


Enter Registeration Credentials
    [Arguments]        ${firstname}  ${lastname}  ${email}  ${pw}
    Input Text         xpath=//*[@id="name"]              ${firstname}
    Input Text         xpath=//*[@id="surname"]           ${lastname}
    Input Text         xpath=//*[@id="email"]             ${email}
    Input Password     xpath=//*[@id="password"]          ${pw}
    Input Password     xpath=//*[@id="confirmPassword"]   ${pw}
    Sleep              0.5


Click Register Button
    Click Button    xpath=//*[@id="root"]/div/main/div[2]/form/button

