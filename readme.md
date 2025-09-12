# 🌍 GloCulture

**GloCulture** is a global culture-sharing platform where users can **explore, post, and interact** with cultural experiences from around the world.  
From **food** to **festivals**, **art** to **traditions**, GloCulture connects people through authentic stories, media, and real-time cultural discovery.  

The platform also provides **personalized cultural suggestions** based on your **current location** and your **previously explored cultures**.

---

## ✨ Features

### 🛡 User Authentication  
- Secure **Signup** and **Signin** with **JWT-based authentication**.  
- Profile creation with **image upload** support.  

### 📸 Culture Posting  
- Create posts with **title**, **description**, **location (lat/lng)**.  
- Upload and associate **images** with your posts.  

### 🌏 Explore Page  
- Browse cultures by **country**, **category**, or **recommendations**.  
- Receive **real-time suggestions**.  

### ⚡ Real-Time Interaction  
- **Live updates** using **Socket.IO**.  
- Suggestions, likes, and comments appear **instantly**.  

### 📱 Responsive Design  
- Fully optimized for **mobile** and **desktop** experiences.  

---

## 🆕 Additional Features  

### 🗺 Culture Exchange Map  
Explore **global traditions, festivals, and customs** through an **interactive world map**.

### 📖 Heritage Story Vault  
Share and discover **personal cultural stories** from people worldwide.

### 📍 Live Location Tracking  
Get **real-time suggestions** for cultural spots, events, and festivals happening **near you**.

### 🤖 AI Summarize & Chat  
- Instantly **summarize cultural posts**.  
- Ask follow-up questions and chat with **AI for deeper insights**.

### 🌐 Global Culture Map  
A **worldwide view** showcasing **all cultures** and **suggested cultural experiences**.

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- React Hook Form
- Axios

**Backend:**
- Node.js
- Express.js
- MySQL (with `mysql2`)
- Socket.IO
- Multer (file uploads)
- bcrypt (password hashing)
- JWT (authentication)

# Install
```bash 
git clone  https://github.com/jhapa-dev/DAJ_PUBG_HACKATHON_Fluid.git
```

## Frontend
```bash
cd client
npm install 
npm run dev
```

## Backend
```bash
cd server
npm install
node server.js
```