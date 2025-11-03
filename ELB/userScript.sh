#!/bin/bash

# Update package list
apt-get update -y

# Install Nginx
apt-get install -y nginx

# Get instance metadata (private IP)
INSTANCE_IP=$(hostname -I | awk '{print $1}')

# Get instance ID from metadata service
INSTANCE_ID=$(ec2-metadata --instance-id | cut -d " " -f 2)

# Create custom HTML page
cat > /var/www/html/index.html <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ELB Demo - Instance $INSTANCE_ID</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 600px;
            animation: fadeIn 0.8s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        h1 {
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        .info-box {
            background: #f8f9fa;
            border-left: 5px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        .value {
            color: #333;
            font-size: 1.5em;
            font-weight: bold;
            word-break: break-all;
        }
        .badge {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            margin-top: 20px;
            font-size: 0.9em;
        }
        .footer {
            margin-top: 30px;
            color: #999;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 AWS ELB Demo</h1>
        <div class="badge">Load Balancer Test Server</div>
        
        <div class="info-box">
            <div class="label">Instance IP Address</div>
            <div class="value">$INSTANCE_IP</div>
        </div>
        
        <div class="info-box">
            <div class="label">Instance ID</div>
            <div class="value">$INSTANCE_ID</div>
        </div>
        
        <div class="footer">
            <p>✅ Nginx is running successfully</p>
            <p>Refresh to verify load balancing</p>
        </div>
    </div>
</body>
</html>
EOF

# Restart Nginx to ensure it's running
systemctl restart nginx
systemctl enable nginx

# Create a simple status file for health checks
echo "OK" > /var/www/html/health.html