#!/bin/bash

# Update system packages
sudo apt-get update -y

# Upgrade existing packages
sudo apt-get upgrade -y

# Install nginx
sudo apt-get install nginx -y

# Start nginx service
sudo systemctl start nginx

# Enable nginx to start on boot
sudo systemctl enable nginx

# Check nginx status
sudo systemctl status nginx --no-pager

# Log completion
echo "User data script completed successfully at $(date)" | sudo tee /var/log/userdata.log
