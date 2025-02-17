from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Configuração do WebDriver
driver = webdriver.Edge()
driver.maximize_window()


# 1. Abrir a aplicação
driver.get("http://localhost:3000")  # Altere se necessário
time.sleep(2)  # Aguarda carregamento

# 2. Realizar Login (Caso seja necessário para adicionar transações)
try:
    email_input = driver.find_element(By.NAME, "email")
    password_input = driver.find_element(By.NAME, "password")

    email_input.send_keys("leanderrxcampos@gmail.com")  # Altere conforme necessário
    password_input.send_keys("leander123")
    password_input.send_keys(Keys.RETURN)
    time.sleep(3)  # Aguarda redirecionamento
except:
    print("Login não necessário.")

# 3. Localizar e preencher o formulário de nova transação
desc_input = driver.find_element(By.NAME, "desc")
amount_input = driver.find_element(By.NAME, "amount")
expense_input = driver.find_element(By.ID, "rExpenses")
date_input = driver.find_element(By.NAME, "date")
category_input = driver.find_element(By.NAME, "category")

# Preenchendo os campos
desc_input.send_keys("Teste Selenium")
amount_input.send_keys("500")
date_input.send_keys("02-17-2025")
expense_input.click()
category_input.send_keys("Alimentação")

# 4. Clicar no botão "Adicionar Transação"
add_button = driver.find_element(By.ID, "add-transaction")  # Ajuste conforme necessário
add_button.click()
time.sleep(3)  # Espera processamento

# 5. Verificar se a transação foi adicionada na tabela
try:
    transaction = driver.find_element(By.XPATH, "//td[contains(text(), 'Teste Selenium')]")
    print("Teste de adicionar transação passou!")
except:
    print("Falha ao adicionar transação!")

# Fechar o navegador
driver.quit()
