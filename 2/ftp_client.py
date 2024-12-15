import ftplib
HOSTNAME = "192.168.98.24"
USERNAME = "user"
PASSWORD = "pwd"
ftp_server = ftplib.FTP(HOSTNAME, USERNAME, PASSWORD)
ftp_server.encoding = "utf-8"
filename = "OK.TXT"
with open(filename, "rb") as file:
    ftp_server.storbinary(f"STOR {filename}", file)
ftp_server.dir()
ftp_server.quit()
