from selenium import webdriver
import time
from selenium.webdriver.common.by import By
import time


#För att värkligen se att testerna fungerar, ta bort profil och user från db innan körning

"""
browser = webdriver.Firefox()
browser.get('http://localhost:3000/')
#Test för att skapa ett konto vid namn TestPersonA

button = browser.find_element_by_id('register_link')
time.sleep(1)
button.click()

textbox = browser.find_element_by_id('username_input')
str = "TestPersonA"
textbox.send_keys(str)
time.sleep(1)

textbox = browser.find_element_by_id('email_input')
str = "TestPersonA@gmail.com"
textbox.send_keys(str)
time.sleep(1)

textbox = browser.find_element_by_id('password1_input')
str = "123456"
textbox.send_keys(str)
time.sleep(1)

textbox = browser.find_element_by_id('password2_input')
str = "123456"
textbox.send_keys(str)
time.sleep(1)

#For now skip reg and go to login
#Får error här men inte om vi skulle köra manuelt, av någon anledning

register_button = browser.find_element_by_id('submit_button')
register_button.click()
time.sleep(5)

browser.close()

"""


#Test för att logga in på kontot med namn TestPersonA
browser = webdriver.Firefox()
browser.get('http://localhost:3000/')


button = browser.find_element_by_id('login_link')
time.sleep( 1 )
button.click()

textbox = browser.find_element_by_id('email_input')
str = "TestPersonA@gmail.com"
textbox.send_keys(str)
time.sleep(1)

input = browser.find_element_by_id('email_input').get_attribute('value')


time.sleep(1)


textbox = browser.find_element_by_id('password_input')
str = "123456"
input = browser.find_element_by_id('password_input').get_attribute('value')
textbox.send_keys(str)
time.sleep(1)

button = browser.find_element_by_id('login_btn')
button.click()
time.sleep(2)



# Testa att lägga en post på sin egen sida
textbox = browser.find_element_by_id('post_text')
str = "test5"
textbox.send_keys(str)
button = browser.find_element_by_id('submit_post')
button.click()


#Om det finns ett bra sätt att få ut texten här sliper vi använda value
test = browser.find_element(By.XPATH, '//p[@id="test5"]')
time.sleep(2)


#Testa att gå till Profiles, gå in på en profil och sedan gå tillbaka till dashboard
button = browser.find_element_by_id('profiles_link')
button.click()
time.sleep(2)
button = browser.find_element_by_id('testA')
button.click()
time.sleep(2)
button = browser.find_element_by_id('dashboard_link')
button.click()
time.sleep(2)

#Testar att gå in på en profil, lägga till den personen som vän och kolla om
# den finns i friends på våran egen sida
button = browser.find_element_by_id('profiles_link')
button.click()
time.sleep(1)
button = browser.find_element_by_id('alex')
button.click()
time.sleep(1)
button = browser.find_element_by_id('add_friend')
button.click()
time.sleep(1)
button = browser.find_element_by_id('dashboard_link')
button.click()

#här vill vi egentligen hitta texten men alla försök har misslyckats
friend = browser.find_element(By.XPATH, '//div[text()="alex"]')
print("Add was succesfull")
time.sleep(2)


#Testar att logga ut in igen och ut fast från profiles vilket bör göra att vi är
# kvar på profiles

button = browser.find_element_by_id('logout')
button.click()
time.sleep(2)

textbox = browser.find_element_by_id('email_input')
str = "TestPersonA@gmail.com"
textbox.send_keys(str)
time.sleep(1)

input = browser.find_element_by_id('email_input').get_attribute('value')
time.sleep(1)

textbox = browser.find_element_by_id('password_input')
str = "123456"
input = browser.find_element_by_id('password_input').get_attribute('value')
textbox.send_keys(str)
time.sleep(1)

button = browser.find_element_by_id('login_btn')
button.click()
time.sleep(1)

button = browser.find_element_by_id('profiles_link')
button.click()
time.sleep(2)
button = browser.find_element_by_id('logout')
button.click()
time.sleep(1)

browser.close()

#----------------------------------------------------------------------

browser = webdriver.Firefox()
browser.get('http://localhost:3000/')
#Testa att göra ett konto med fel lössen så att en alert kommer upp
#testa även så att email already exists alert kommer upp
button = browser.find_element_by_id('register_link')
button.click()
time.sleep(1)

textbox = browser.find_element_by_id('username_input')
str = "TestPersonA"
textbox.send_keys(str)
time.sleep(1)

textbox = browser.find_element_by_id('email_input')
str = "TestPersonA@gmail.com"
textbox.send_keys(str)
time.sleep(1)

textbox = browser.find_element_by_id('password1_input')
str = "123456"
textbox.send_keys(str)
time.sleep(1)

textbox = browser.find_element_by_id('password2_input')
str = "1234567"
textbox.send_keys(str)
time.sleep(1)

register_button = browser.find_element_by_id('submit_button')
register_button.click()
time.sleep(1)

alert = browser.find_element(By.XPATH, '//div[text()="Passwords dont match"]')
print(alert)
print("alert was found")


browser.find_element_by_id('password2_input').clear()
textbox = browser.find_element_by_id('password2_input')
str = "123456"
textbox.send_keys(str)
time.sleep(1)

register_button = browser.find_element_by_id('submit_button')
register_button.click()
time.sleep(1)

alert = browser.find_element(By.XPATH, '//div[text()="That email already exists"]')
print(alert)
print("alert was found")
time.sleep(2)

browser.close()

#Testa att göra en post på någon annans sida
browser = webdriver.Firefox()
browser.get('http://localhost:3000/')

button = browser.find_element_by_id('login_link')
time.sleep( 1 )
button.click()
textbox = browser.find_element_by_id('email_input')
str = "TestPersonA@gmail.com"
textbox.send_keys(str)
time.sleep(1)
input = browser.find_element_by_id('email_input').get_attribute('value')
time.sleep(1)
textbox = browser.find_element_by_id('password_input')
str = "123456"
input = browser.find_element_by_id('password_input').get_attribute('value')
textbox.send_keys(str)
time.sleep(1)
button = browser.find_element_by_id('login_btn')
button.click()
time.sleep(1)

button = browser.find_element_by_id('profiles_link')
button.click()
time.sleep(2)
button = browser.find_element_by_id('testA')
button.click()
time.sleep(2)

textbox = browser.find_element_by_id('post_text')
str = "testing"
textbox.send_keys(str)
button = browser.find_element_by_id('submit_post')
button.click()
test = browser.find_element(By.XPATH, '//p[@id="testing"]')
print("testing was found")

button = browser.find_element_by_id('logout')
button.click()
time.sleep(1)

browser.close()
