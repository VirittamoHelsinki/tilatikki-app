*** Settings ***

*** Variables ***
${tilatikki-local-url}  http://localhost:5173
${browser}	            chrome

${url}=                 ${tilatikki-local-url}

# testuser credentials
${firstname}            Teppo
${lastname}             Testoman
${email}                testoman@test.com
${pw}                   12345!abCmx
${pw2}                  ${pw}moi-
${short_pw}             abc1

# 'random' user-generator
@{r_firstnames}         Jeffrey  John  Bonnie  Marie  Joanna  Brian  Alexander  Andrew  Sharon  Jaime  Anne
@{r_lastnames}          Hopkins  Bowman  Simon  Mccoy  Hooper  Gonzalez  Scott  Gonzalez  Robinson  Ochoa  Hill
@{r_providers}          yahoo  gmail  luukku  google  fbi  supo  proton  outlook  aol  hel  edu.hel
@{r_tlds}               fi  com  net  co.uk  it  org  info  beer  de  gg  io  news  pizza  ski  tf  uno  vodka
