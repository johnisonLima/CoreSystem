import pyautogui
import time

# A cada comando ele vai esperar 1 segundo
pyautogui.PAUSE = 0.2

# Aperta a tecla windowns
pyautogui.hotkey('alt', 'tab')

pyautogui.click(x=944, y=237)

# nome
pyautogui.write('John')
pyautogui.press('tab')
# sobrenome
pyautogui.write('Doe')
pyautogui.press('tab')
# email
pyautogui.write('john.doe@example.com')
pyautogui.press('tab')
# status
pyautogui.click(x=1026, y=392)
pyautogui.click(x=942, y=449)
pyautogui.press('tab')
# cep
pyautogui.write('04571220561')
pyautogui.press('tab')
# estado
pyautogui.write('Sao Paulo')
pyautogui.press('tab')
# cidade
pyautogui.write('Sao Paulo')
pyautogui.press('tab')
# bairro
pyautogui.write('Centro')
pyautogui.press('tab')
# Numero
pyautogui.write('356')
pyautogui.press('tab')
# complemento
pyautogui.write('Apto 101')
pyautogui.press('tab')
# logradouro
pyautogui.write('Rua Exemplo')
pyautogui.press('tab')
# telefone 1
pyautogui.write('77988413654')
# tipo 1
pyautogui.click(x=816, y=698)
pyautogui.click(x=828, y=804)
# telefone 2
pyautogui.click(x=1054, y=696)
pyautogui.click(x=510, y=739)
pyautogui.write('7734213030')
# tipo 2
pyautogui.click(x=791, y=738)
pyautogui.click(x=794, y=794)
# senha
pyautogui.click(x=507, y=819)
pyautogui.write('123456')
pyautogui.press('tab')
# repetir senha
pyautogui.write('123456')

# pyautogui.click(x=1086, y=851)
