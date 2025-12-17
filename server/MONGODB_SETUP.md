# MongoDB Setup Guide

The OFFO Launch Platform backend requires MongoDB to run. You have several options:

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

**Best for:** Production, development, no local installation needed

1. **Create Free Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP address

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update .env File**
   ```env
   MONGODB_URI=mongodb+srv://username:your_password@cluster0.xxxxx.mongodb.net/offo-launch?retryWrites=true&w=majority
   ```
   Replace:
   - `username` with your database username
   - `your_password` with your database password
   - `cluster0.xxxxx` with your actual cluster address
   - `/offo-launch` is your database name

7. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```

## Option 2: Local MongoDB Installation

**Best for:** Offline development, full control

### Windows

1. **Download MongoDB**
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select "Windows" and download the MSI installer

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool)

3. **Verify Installation**
   ```bash
   # Open Command Prompt or PowerShell
   mongod --version
   ```

4. **Start MongoDB Service**
   ```bash
   # MongoDB should start automatically as a Windows Service
   # To manually start:
   net start MongoDB

   # To check status:
   sc query MongoDB
   ```

5. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/offo-launch
   ```

6. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```

### macOS

1. **Install with Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB**
   ```bash
   brew services start mongodb-community
   ```

3. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/offo-launch
   ```

4. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```

### Linux (Ubuntu/Debian)

1. **Import MongoDB Public Key**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```

2. **Create List File**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

3. **Install MongoDB**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

4. **Start MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/offo-launch
   ```

6. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```

## Option 3: Docker (Cross-Platform)

**Best for:** Containerized development, consistency across environments

1. **Install Docker Desktop**
   - Download from [Docker.com](https://www.docker.com/products/docker-desktop)
   - Install and start Docker

2. **Run MongoDB Container**
   ```bash
   docker run -d \
     --name mongodb-offo \
     -p 27017:27017 \
     -e MONGO_INITDB_DATABASE=offo-launch \
     -v mongodb-data:/data/db \
     mongo:latest
   ```

3. **Verify Container is Running**
   ```bash
   docker ps
   ```

4. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/offo-launch
   ```

5. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```

6. **Useful Docker Commands**
   ```bash
   # Stop MongoDB
   docker stop mongodb-offo

   # Start MongoDB
   docker start mongodb-offo

   # Remove container (data persists in volume)
   docker rm mongodb-offo

   # Remove data volume (WARNING: deletes all data)
   docker volume rm mongodb-data
   ```

## Verifying MongoDB Connection

After starting MongoDB, verify the connection:

1. **Check MongoDB is Running**
   ```bash
   # Try connecting with mongo shell
   mongosh mongodb://localhost:27017/offo-launch
   ```

2. **Start Your Server**
   ```bash
   cd C:/Dev/offo-risk-score-mvp/server
   npm run dev
   ```

3. **Look for Success Message**
   ```
   📊 MongoDB connected: ✅
   ```

## Troubleshooting

### Connection Refused Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solutions:**
- Ensure MongoDB service is running
- Check firewall isn't blocking port 27017
- Verify connection string in .env is correct
- For Atlas: check IP whitelist includes your IP

### Authentication Failed
```
MongoServerError: Authentication failed
```

**Solutions:**
- Verify username and password in connection string
- Ensure password is URL-encoded (spaces = %20, @ = %40, etc.)
- Check database user has correct permissions

### Network Timeout
```
MongooseServerSelectionError: Server selection timed out
```

**Solutions:**
- For Atlas: check network access allows your IP
- Verify internet connection
- Try increasing timeout in connection options

## Recommended: MongoDB Compass

MongoDB Compass is a free GUI tool for viewing and managing your database:

1. **Download** from [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. **Install** and open
3. **Connect** using your connection string
4. **View** your data visually

**Connection Strings:**
- Local: `mongodb://localhost:27017`
- Atlas: Use the connection string from Atlas

## Quick Start Recommendation

**For beginners:** Use MongoDB Atlas (Option 1)
- No installation required
- Free tier is generous
- Works from anywhere
- Production-ready

**For experienced developers:** Use Docker (Option 3)
- Clean, isolated environment
- Easy to reset
- Version control
- Works identically across all platforms

## Support

If you encounter issues:
1. Check MongoDB is running: `mongosh mongodb://localhost:27017`
2. Verify .env has correct MONGODB_URI
3. Check server logs for specific error messages
4. Review MongoDB Atlas network settings (if using Atlas)

For more help: support@offolab.com
