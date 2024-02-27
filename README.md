
# Kupanify Frontend


  Make sure to run the backend before running the   frontend

  https://github.com/yugandhar11458/Kupanify-Backend


The following are the instructions to run the Frontend:
    

## Run Locally

Clone the project

```bash
  git clone https://github.com/yugandhar11458/Kupanify-Frontend.git
```

Go to the project directory

```bash
  cd Coupons
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

  1. Create AWS EC2 instance with Amazon Linux of minimum tier of t2.medium.
  2. Connect to the AWS EC2 instance terminal.
  3. Install github
```bash
  sudo yum install git 
```
 4. Install docker
```bash
 sudo yum install -y docker 
 sudo service docker start 
 sudo docker –version 
```

 5. Install docker compose
```bash
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo docker-compose --version 
```

6. Install Jenkins
  ```bash
  sudo wget -O /etc/yum.repos.d/jenkins.repo \ 
  https://pkg.jenkins.io/redhat-stable/jenkins.repo 
```
```bash
 sudo dnf install java-11-amazon-corretto –y 
 sudo yum install jenkins –y 
 sudo systemctl enable jenkins 
 sudo systemctl start jenkins 
 sudo systemctl status jenkins     
```

Make sure to update the Environment variable in Dockerfile with the updated Backend IP address of the Kupanify-Bakcend IP address.
  - ENV VITE_REACT_APP_BACKEND_URL = http://123.45.67.89:8000 //replace with the new backend IP address

7. Jenkins 
  - Create jenkins user account and create new item.
  - Give the github url of the project in Project   URL and Source Code Management and add credentials
  - Add the following build steps
    ```bash
    docker build -t frontend:latest .
    docker-compose -f frontend.yaml up -d 
    ```
  - Build the item.
8. Now the Frontend is live on port 4000 i.e., IpAddress:4000.
