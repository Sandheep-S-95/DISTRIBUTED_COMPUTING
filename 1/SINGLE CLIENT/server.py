import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("localhost", 9999))
server.listen()

print("Server listening on localhost:9999")

client, addr = server.accept()
print(f"Client connected from {addr}")

done = False
while not done:
    msg = client.recv(1024).decode('utf-8')
    if msg == 'quit':
        done = True
    else:
        print(msg)
        client.send(input("Message: ").encode('utf-8'))

client.close()
server.close()