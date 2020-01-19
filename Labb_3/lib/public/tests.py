from selenium import webdriver

browser = webdriver.Firefox()
browser.get('file:///home/andmo435/Desktop/TDP013/gittat/Labb 1/index.html')

#assert 'hej' in browser.title
text = browser.find_element_by_id('text-box')
postbutton = browser.find_element_by_id('send-btn')

#Test_1 - Skriva meddelande 0 < chars < 141
print("------Skriva meddelande 0 < chars < 141------")
st = 'Testar att skriva något i rutan'
text.send_keys(st)
postbutton.click()
msg = browser.find_element_by_class_name("msg")
assert msg.text == st

#Test_2 - Skriva meddelande char = 0
print("")
print("------Skriva meddelande char = 0------")
text.send_keys("")
postbutton.click()
assert browser.find_element_by_id("errorbox")
rm = browser.find_element_by_name('okaybtn')
rm.click()

#Test_3 - Skriva meddelande char > 140
print("")
print("------Skriva meddelande char > 140------")
text.send_keys("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
postbutton.click()
assert browser.find_element_by_id("errorbox")
rm = browser.find_element_by_name('okaybtn')
rm.click()

#Test_4 - Ta bort error
print("")
print("------Ta bort error------")
for i in range(4):
    text.send_keys("")
    postbutton.click()
removebuttons = browser.find_elements_by_name('okaybtn')

for button in removebuttons:
    button.click()


try:
    assert browser.find_element_by_id("errorbox")
except:
    print("Success!")


#Test_5 - Kronologiskt fallande
print("")
print("------Kronologiskt fallande------")

text.send_keys("Ett meddelande")
postbutton.click()
text.send_keys("Senaste meddelandet")
postbutton.click()
msg = browser.find_element_by_class_name("msg")
assert msg.text == "Senaste meddelandet"


#Test_6 - Läsa meddelanden
print("")
print("------Läsa meddelanden------")
removebuttons = browser.find_elements_by_name('btn')
n = 0
for button in removebuttons:
    n += 1
    print("Read message",n)
    button.click()
#Test_7 - Tydlig skillnad mellan lästa och olästa

print("")
print("------Skillnad mellan lästa och olästa------")

text.send_keys("Fler meddelanden")
postbutton.click()
text.send_keys("Fler meddelanden")
postbutton.click()
r_msg = browser.find_elements_by_name('read_msg')
u_msg = browser.find_elements_by_name('unread_msg')
print("Lästa meddelanden:",len(r_msg),"Olästa meddelanden:", len(u_msg))
assert len(r_msg) == 3 and len(u_msg) == 2



browser.close()

"""
#text.send_keys('Testar att skriva något i rutan')
postbutton.click()


postbutton.click()

removebuttons = browser.find_elements_by_name('okaybtn')

for button in removebuttons:
    button.click()
"""
