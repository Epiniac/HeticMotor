import bcrypt

password = "admin123"
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

print("Hash du mot de passe :", hashed.decode())
