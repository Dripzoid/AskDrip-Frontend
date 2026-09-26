# AskDrip — AI Fashion Assistant

<p align="center">
  <img src="./public/logo-dark.png" alt="AskDrip" width="180" />
</p>

<p align="center">
  <strong>AI-powered fashion intelligence for personalized styling, outfit discovery, color matching, and product recommendations.</strong>
</p>

<p align="center">
  <em>Part of the Dripzoid technology ecosystem.</em>
</p>

<p align="center">
  React · Vite · Tailwind CSS · Axios · AI Services · Dripzoid API
</p>

---

## ✨ Overview

**AskDrip** is an AI-powered fashion assistant built as part of the **Dripzoid ecosystem**.

Instead of forcing users to navigate through traditional product filters, AskDrip allows them to communicate their fashion intent naturally.

For example:

> "Suggest an outfit for college."

> "What colors go well with black cargo pants?"

> "Suggest a streetwear outfit under ₹3000."

AskDrip transforms these natural-language requests into specialized fashion-AI workflows and can return both **conversational guidance and relevant Dripzoid products**. 

### Core capabilities

* 💬 Conversational fashion assistance
* 👕 Outfit generation
* 🎨 Color matching
* 🛍️ Product recommendations
* 🧠 Specialized AI workflows
* 💾 Persistent conversations
* 🔐 Authenticated user sessions
* 🌓 Light and dark themes
* 📱 Responsive interface
* 🔗 AI-to-commerce product discovery

---

# 🎯 Product Vision

Traditional fashion commerce generally starts with:

```text
Category
   ↓
Filters
   ↓
Products
   ↓
User selects
```

AskDrip explores a different interaction model:

```text
User Intent
     ↓
Natural Language
     ↓
Fashion Intelligence
     ↓
Personalized Response
     ↓
Relevant Products
```

The long-term direction is to evolve AskDrip from a conversational assistant into an **AI fashion intelligence layer** connecting:

```text
User Intent
      +
Fashion Knowledge
      +
Personal Preferences
      +
Product Catalog
      +
Conversation History
      +
Visual Understanding
      ↓
Personalized Fashion Intelligence
```

---

# 🏗️ Architecture

AskDrip follows a **frontend + AI backend + commerce backend** architecture. The frontend is intentionally separated from model infrastructure and acts as the interaction layer between the user, AI services, and the Dripzoid ecosystem. 

```text
                              ┌──────────────────────┐
                              │        USER          │
                              │  Web / Mobile Web    │
                              └──────────┬───────────┘
                                         │
                                         ▼
                         ┌─────────────────────────────┐
                         │      ASKDRIP FRONTEND       │
                         │                             │
                         │ React 19                   │
                         │ Vite 8                     │
                         │ Tailwind CSS 4             │
                         │ Axios                      │
                         │ React Context              │
                         └──────────────┬──────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                         ▼                             ▼
              ┌────────────────────┐        ┌────────────────────┐
              │    DRIPZOID API    │        │  ASKDRIP BACKEND   │
              │                    │        │                    │
              │ Authentication     │        │ AI Chat            │
              │ User Sessions      │        │ Outfit Generation  │
              │ Conversations      │        │ Color Matching     │
              │ Messages           │        │ Recommendations    │
              │ User Data          │        │ AI Processing      │
              └─────────┬──────────┘        └──────────┬─────────┘
                        │                              │
                        │                              ▼
                        │                   ┌────────────────────┐
                        │                   │ AI / Fashion Data  │
                        │                   │                    │
                        │                   │ Product Knowledge  │
                        │                   │ Fashion Intelligence│
                        │                   │ Recommendation Logic│
                        │                   └────────────────────┘
                        │
                        ▼
              ┌────────────────────┐
              │ DRIPZOID COMMERCE  │
              │                    │
              │ Products           │
              │ Images             │
              │ Pricing            │
              │ Categories         │
              └────────────────────┘
```

### Architectural principle

The browser **does not directly implement or expose AI model infrastructure**.

Instead:

```text
Frontend
   ↓
API Layer
   ↓
AI Backend
   ↓
AI / Fashion Intelligence
```

while commerce-related information flows through the Dripzoid platform.

---

# 🧩 Core Design Principles

## 1. Conversational First

Users describe what they want naturally instead of navigating through complicated forms.

## 2. Specialized AI

Fashion tasks can be routed to specialized capabilities:

```text
                    AskDrip
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   General Chat    Outfit AI     Color AI
                                     
                       │
                       ▼
                Recommendation AI
```

## 3. Persistent Conversations

Users can return to previous conversations instead of starting from zero every time.

## 4. Product-Aware Responses

AI responses can include actual Dripzoid products, allowing conversational intelligence to connect directly with commerce.

## 5. Separation of Concerns

The frontend handles:

* UI
* Application state
* Authentication state
* Conversation state
* API communication
* AI response rendering
* Product rendering

The backend handles:

* AI inference
* Fashion intelligence
* Product retrieval
* Business logic
* Authentication
* User data
* Conversation persistence

This separation is explicitly reflected in the existing architecture. 

---

# ⚙️ Technology Stack

| Technology           | Role                                     |
| -------------------- | ---------------------------------------- |
| **React 19**         | UI framework                             |
| **Vite 8**           | Development and production build tooling |
| **Tailwind CSS 4**   | Styling system                           |
| **Axios**            | HTTP communication                       |
| **React Markdown**   | AI response rendering                    |
| **Lucide React**     | Interface icons                          |
| **Framer Motion**    | Animation                                |
| **React Context**    | Global application state                 |
| **JavaScript / JSX** | Application development                  |

The frontend technology stack and repository organization are documented in the current project README. 

---

# 📁 Project Structure

```text
AskDrip-Frontend/
│
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── logo-dark.png
│   └── logo-light.png
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── ChatInput.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── Header.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── ProductCarousel.jsx
│   │   ├── QuickActions.jsx
│   │   ├── Sidebar.jsx
│   │   └── TypingIndicator.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ChatContext.jsx
│   │   ├── ConversationContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   └── ChatPage.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   ├── conversationService.js
│   │   └── dripzoidApi.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# 🧠 Application Architecture

React Context is used to separate global application responsibilities.

```text
React Application
│
├── ThemeProvider
│
├── AuthProvider
│
├── ConversationProvider
│
├── ChatProvider
│
└── App
```

### State domains

```text
AuthContext
│
├── User
├── Session
├── Authentication State
└── Login / Logout

ConversationContext
│
├── Conversations
├── Active Conversation
├── Conversation Loading
└── Sidebar State

ChatContext
│
├── Messages
├── AI Mode
├── AI Endpoint
├── Chat Loading
└── AI Interaction

ThemeContext
│
└── Light / Dark Theme
```

---

# 🔐 Authentication Architecture

Authentication is managed through:

```text
src/context/AuthContext.jsx
```

The frontend communicates with the Dripzoid API and uses authenticated sessions with:

```javascript
withCredentials: true
```

### Authentication lifecycle

```text
Application Start
       │
       ▼
AuthProvider
       │
       ▼
GET /api/auth/me
       │
       ├───────────────┐
       │               │
       ▼               ▼
Authenticated      401 / Error
       │               │
       ▼               ▼
Load User        Unauthenticated
```

The authentication context exposes functionality including:

```text
user
setUser
loading
authStatus
isAuthenticated
login()
logout()
refreshUser()
restoreSession()
```

---

# 🔑 Authentication API

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Current User

```http
GET /api/auth/me
```

### Logout

```http
POST /api/auth/logout
```

---

# 💬 Conversation Architecture

Conversation management is handled by:

```text
src/context/ConversationContext.jsx
```

It manages:

* Conversation history
* Active conversation
* Conversation creation
* Conversation selection
* Conversation deletion
* Conversation renaming
* Sidebar state
* Loading states
* New-chat initialization

### Conversation lifecycle

```text
User opens AskDrip
       │
       ▼
Load conversations
       │
       ▼
ConversationContext
       │
       ▼
Sidebar
       │
       ├── New conversation
       ├── Select conversation
       ├── Rename conversation
       └── Delete conversation
```

---

# 🗂️ Conversation API

### Get conversations

```http
GET /api/v1/askdrip/conversations
```

### Create conversation

```http
POST /api/v1/askdrip/conversations
```

```json
{
  "title": "College Outfit"
}
```

### Get messages

```http
GET /api/v1/askdrip/conversations/:conversationId/messages
```

### Delete conversation

```http
DELETE /api/v1/askdrip/conversations/:conversationId
```

### Rename conversation

```http
PATCH /api/v1/askdrip/conversations/:conversationId
```

```json
{
  "title": "New Conversation Name"
}
```

---

# 🤖 AI Architecture

AskDrip currently exposes four logical AI capabilities:

```text
                ASKDRIP AI
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
     General      Outfit      Color
       Chat         AI         AI
        │
        └──────────────┐
                       ▼
                Recommendation
                       AI
```

These are mapped through:

```text
src/services/chatService.js
```

---

## General Chat

```http
POST /api/v1/chat
```

Used for general fashion conversations.

---

## Outfit Generation

```http
POST /api/v1/outfit
```

Example:

```text
"Suggest an outfit for college."
```

---

## Color Matching

```http
POST /api/v1/color-match
```

Example:

```text
"What colors go with black cargo pants?"
```

---

## Recommendations

```http
POST /api/v1/recommendation
```

Example:

```text
"Suggest streetwear under ₹3000."
```

---

# 🔄 AI Request Lifecycle

```text
                    USER
                      │
                      ▼
                  ChatInput
                      │
                      ▼
                 ChatContext
                      │
                      ▼
                chatService
                      │
                      ▼
                AskDrip API
                      │
                      ▼
                AI Processing
                      │
              ┌───────┴────────┐
              │                │
              ▼                ▼
         AI Response       Products
              │                │
              └───────┬────────┘
                      ▼
                 ChatContext
                      │
              ┌───────┴────────┐
              │                │
              ▼                ▼
        MessageBubble    ProductCarousel
```

---

# 📦 AI Response Contract

The frontend supports structured AI responses containing text and products.

```json
{
  "response": "Here is a suggested outfit...",
  "products": []
}
```

This allows AskDrip to move beyond a plain chatbot interface.

Instead of:

```text
AI → Text
```

the system can support:

```text
AI
├── Explanation
├── Recommendations
├── Products
└── Commerce Actions
```

---

# 🛍️ Product Intelligence

One of the key architectural features of AskDrip is its connection between AI-generated responses and the Dripzoid product ecosystem.

```text
User Intent
     │
     ▼
AI Backend
     │
     ├── Understand request
     ├── Generate fashion response
     └── Identify relevant products
              │
              ▼
         Product Data
              │
              ▼
       ProductCarousel
              │
              ▼
       Dripzoid Commerce
```

A product can contain:

```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Product description",
  "subcategory": "Shirts",
  "price": 1499,
  "originalPrice": 1999,
  "images": [
    "https://..."
  ]
}
```

The frontend also supports discount calculation when valid pricing information is provided.

---

# 🖥️ User Interface

The interface is composed of focused React components.

| Component         | Responsibility          |
| ----------------- | ----------------------- |
| `Header`          | Application navigation  |
| `Sidebar`         | Conversation history    |
| `ChatWindow`      | Main chat interface     |
| `ChatInput`       | User prompt composition |
| `MessageBubble`   | User/AI messages        |
| `ProductCarousel` | Product recommendations |
| `QuickActions`    | AI mode selection       |
| `TypingIndicator` | AI processing state     |

---

# ⚡ Quick Actions

Users can directly choose specialized AI capabilities:

```text
+
├── Outfit
├── Color Match
└── Recommendation
```

This gives users an explicit way to guide the AI workflow.

---

# ✍️ Chat Experience

The chat composer supports:

* Multiline input
* Enter-to-send
* Shift + Enter for multiline text
* Send action
* Loading states
* Specialized modes
* Responsive behavior
* Auto-growing textarea

---

# 🧾 AI Message Rendering

AI responses are rendered through:

```text
MessageBubble.jsx
```

Supported functionality includes:

* User messages
* Assistant messages
* Markdown
* Product recommendations
* Copy interaction
* Timestamps
* Assistant controls

Markdown rendering is provided through:

```text
react-markdown
```

---

# ⏳ AI Processing Experience

Instead of displaying a generic:

```text
Loading...
```

AskDrip provides contextual processing states.

### General

```text
Analyzing your request...
Understanding your intent...
Generating insights...
```

### Outfit

```text
Creating outfit combinations...
Matching tops and bottoms...
Building a stylish outfit...
```

### Color

```text
Finding matching colors...
Building a color palette...
Checking complementary shades...
```

### Recommendations

```text
Creating personalized recommendations...
Analyzing fashion preferences...
Curating recommendations for you...
```

This gives the user feedback while the AI service is processing.

---

# 🎨 Theme System

AskDrip supports:

```text
☀️ Light Mode
🌙 Dark Mode
```

Theme state is managed through:

```text
src/context/ThemeContext.jsx
```

The preference is persisted locally.

The main theme variables are defined in:

```text
src/index.css
```

The visual system intentionally follows a minimal monochrome design language.

---

# 🔌 API Architecture

AskDrip uses two primary Axios clients.

## AskDrip AI API

```text
src/services/api.js
```

Base URL:

```text
https://askdrip-backend.onrender.com/api/v1
```

Responsibilities:

```text
AI Chat
Outfit Generation
Color Matching
Recommendations
```

## Dripzoid API

```text
src/services/dripzoidApi.js
```

Base URL:

```text
https://api.dripzoid.com
```

Responsibilities:

```text
Authentication
Sessions
Users
Conversations
Messages
Conversation Management
```

---

# 🧱 Service Layer

The frontend separates API communication from presentation logic.

```text
src/services/

├── api.js
├── authService.js
├── chatService.js
├── conversationService.js
└── dripzoidApi.js
```

### `api.js`

AskDrip AI API client.

### `dripzoidApi.js`

Authenticated Dripzoid API client.

### `authService.js`

Authentication operations.

### `chatService.js`

AI operations.

### `conversationService.js`

Conversation persistence operations.

This service-oriented approach reduces coupling between UI components and backend APIs.

---

# 🔐 Security Model

The frontend is intentionally designed without AI model credentials or private infrastructure secrets.

```text
Browser
   │
   ▼
Public APIs
   │
   ▼
Backend
   │
   ├── Authentication
   ├── Business Logic
   ├── AI Infrastructure
   ├── Database
   └── Private Credentials
```

### Important principle

Private credentials should remain **server-side**.

Never expose credentials such as:

```text
AI API keys
Database passwords
JWT signing secrets
Cloud credentials
Private service tokens
```

inside a Vite frontend.

Environment variables prefixed with `VITE_` are intended for browser-visible configuration and **must not be treated as secrets**.

---

# 🌍 Environment Configuration

For deployment flexibility, API URLs can be configured through environment variables.

```env
VITE_DRIPZOID_API_URL=https://api.dripzoid.com
VITE_ASKDRIP_API_URL=https://askdrip-backend.onrender.com/api/v1
```

Recommended local configuration:

```text
.env
.env.local
```

These files should not be committed when they contain sensitive values.

A public repository can provide:

```text
.env.example
```

with non-sensitive configuration placeholders.

---

# 🛡️ Backend Authorization Requirements

The frontend may send identifiers such as:

```json
{
  "userId": "USER_ID",
  "conversationId": "CONVERSATION_ID",
  "prompt": "..."
}
```

These identifiers should **not be treated as proof of authorization by the backend**.

The backend should derive the authenticated user from the active session and verify ownership before allowing operations such as:

```text
Read conversation
Read messages
Rename conversation
Delete conversation
Send messages
Access user data
```

This keeps authorization server-side rather than relying on browser-controlled values.

---

# 📱 Responsive Architecture

AskDrip is designed for:

```text
Desktop
Tablet
Mobile Browser
```

Responsive behavior covers:

* Sidebar
* Chat layout
* Product carousel
* Input area
* Conversation history
* Navigation
* Mobile sidebar interactions

---

# 🚀 Local Development

## Requirements

```text
Node.js
npm
Git
```

## Clone

```bash
git clone <repository-url>
cd AskDrip-Frontend
```

## Install

```bash
npm install
```

## Start development server

```bash
npm run dev
```

---

# 🏭 Production Build

```bash
npm run build
```

Production output:

```text
dist/
```

Preview the production build:

```bash
npm run preview
```

---

# 🧹 Linting

```bash
npm run lint
```

---

# 🚢 Deployment Model

AskDrip is designed so the frontend and backend can be deployed independently.

```text
                         INTERNET
                            │
                            ▼
                    ASKDRIP FRONTEND
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       DRIPZOID API                  ASKDRIP BACKEND
             │                             │
             │                             ├── AI Processing
             │                             ├── Recommendations
             │                             └── Fashion Logic
             │
             ├── Authentication
             ├── Conversations
             └── User Data
                            │
                            ▼
                    DRIPZOID ECOSYSTEM
```

This separation allows the frontend, AI services, and commerce platform to evolve independently.

---

# 🔬 Current Interaction Model

The current AI interaction follows a request/response architecture:

```text
Prompt
  │
  ▼
HTTP Request
  │
  ▼
Backend Processing
  │
  ▼
AI Inference
  │
  ▼
HTTP Response
  │
  ▼
Frontend Rendering
```

The architecture can later evolve toward streaming and multimodal interactions without requiring a complete frontend rewrite.

---

# 🔮 Future Architecture

The current system provides a foundation for several possible extensions.

## Multimodal Fashion Intelligence

```text
Image
  │
  ▼
Visual Understanding
  │
  ▼
Fashion Analysis
  │
  ├── Clothing Detection
  ├── Color Analysis
  ├── Style Analysis
  └── Outfit Suggestions
  │
  ▼
Product Recommendations
```

Potential user experience:

> Upload an outfit → AskDrip understands it → identifies clothing → suggests improvements → finds relevant products.

---

# 👤 Personalized Fashion Profiles

Future personalization could combine:

```text
User
 │
 ├── Preferences
 ├── Previous Conversations
 ├── Favorite Styles
 ├── Budget
 ├── Sizes
 └── Purchase History
        │
        ▼
Personalized Fashion Intelligence
```

---

# 🔁 Recommendation Feedback Loop

A future recommendation engine can learn from user interactions:

```text
Recommendation
      │
      ▼
User Interaction
      │
      ├── View
      ├── Click
      ├── Save
      ├── Purchase
      └── Ignore
      │
      ▼
Preference Signal
      │
      ▼
Improved Personalization
```

---

# 🎙️ Multimodal & Voice Direction

The architecture can eventually expand beyond text:

```text
                 USER
                  │
       ┌──────────┼──────────┐
       │          │          │
       ▼          ▼          ▼
      Text       Image      Voice
       │          │          │
       └──────────┼──────────┘
                  ▼
             Fashion AI
                  │
                  ▼
       Personalized Experience
```

---

# 🧠 Architectural Decisions

## React Context

The current application uses React Context rather than introducing a larger external state-management system.

This keeps the state model lightweight while separating:

```text
Authentication
Conversations
Chat
Theme
```

---

## Service-Oriented API Layer

API requests are isolated into service modules.

Instead of:

```text
Component
   ↓
Direct API Request
```

the application follows:

```text
Component
   ↓
Context
   ↓
Service
   ↓
API
```

This makes backend contract changes easier to isolate.

---

## Backend AI Separation

The browser does not directly communicate with model infrastructure.

This keeps:

* Model configuration
* Inference logic
* AI credentials
* Backend infrastructure

server-side.

---

## Structured AI Responses

AskDrip is not limited to:

```text
AI → Text
```

The response architecture can support:

```text
AI
├── Text
├── Products
├── Recommendations
└── Future structured actions
```

This is important for connecting conversational AI with commerce.

---

# 📊 Current Capabilities

| Capability                 | Status |
| -------------------------- | ------ |
| React application          | ✅      |
| Vite build pipeline        | ✅      |
| Tailwind CSS               | ✅      |
| Authentication integration | ✅      |
| Session restoration        | ✅      |
| Conversation persistence   | ✅      |
| Conversation selection     | ✅      |
| Conversation deletion      | ✅      |
| General AI chat            | ✅      |
| Outfit mode                | ✅      |
| Color matching             | ✅      |
| Recommendation mode        | ✅      |
| Markdown responses         | ✅      |
| Product cards              | ✅      |
| Product links              | ✅      |
| Responsive UI              | ✅      |
| Light mode                 | ✅      |
| Dark mode                  | ✅      |
| AI processing states       | ✅      |
| Quick actions              | ✅      |
| Mobile sidebar             | ✅      |

These capabilities reflect the current frontend status documented in the repository. 

---

# 🗺️ Roadmap

The architecture is intentionally positioned for future expansion.

### AI & Personalization

* [ ] Multimodal image-based fashion analysis
* [ ] AI-powered wardrobe analysis
* [ ] Personalized fashion profiles
* [ ] Advanced recommendation ranking
* [ ] User preference learning

### Commerce

* [ ] Saved outfits
* [ ] Outfit boards
* [ ] Product wishlists
* [ ] Richer product explanations
* [ ] Recommendation feedback loops

### Interaction

* [ ] Voice interaction
* [ ] Streaming AI responses
* [ ] Multimodal conversations

### Platform

* [ ] Improved observability
* [ ] Automated API contract validation
* [ ] Production environment configuration
* [ ] Advanced analytics

The current repository already identifies these areas as potential future development directions. 

---

# 🔗 Relationship With Dripzoid

AskDrip is not an isolated chatbot.

It is an AI layer within the broader **Dripzoid technology ecosystem**.

```text
                         DRIPZOID
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
      Commerce           AskDrip        Platform APIs
                            │
                            ▼
                      Fashion AI
                            │
                            ▼
                  Product Intelligence
```

Dripzoid provides the commerce ecosystem while AskDrip provides the conversational AI interaction layer.

---

# 🧭 Long-Term Direction

The broader goal is to make fashion discovery more **intent-driven**.

Instead of asking:

> "Which category should I search?"

the user should eventually be able to say:

> "I'm going to a college event tonight. I want something minimal, comfortable, and under ₹3,000."

The system can then combine:

```text
Intent
+
Context
+
Personal Preferences
+
Fashion Knowledge
+
Product Catalog
+
Conversation History
```

to produce a personalized result.

That is the direction behind AskDrip's architecture.

---

# 🧪 Engineering Philosophy

AskDrip is designed as a **modular AI product**, not merely a chatbot UI.

The architecture separates:

```text
                    ASKDRIP
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
        UI             API            AI
        │              │              │
    Components     Services       AI Modes
    Context        Auth           Fashion Logic
    Pages          Conversations  Recommendations
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                  COMMERCE
                       │
                       ▼
                Dripzoid Platform
```

This allows individual layers to evolve independently.

For example:

* UI can evolve without rewriting AI logic.
* AI models can change without redesigning the UI.
* Authentication can evolve independently.
* Recommendation logic can become more sophisticated.
* New AI capabilities can be added as new service contracts.
* Commerce integrations can evolve independently of the conversation interface.

---

# 👨‍💻 Author

**Yuvateja Sainadh Kasukurthi**

**Applied AI Engineer & Systems Architect**
**Co-Founder & Full-Stack Developer — Dripzoid**

### Selected Projects

* **AskDrip** — AI Fashion Assistant
* **Dripzoid** — Fashion Commerce Platform
* **VoiceShield** — Real-Time AI Voice Impersonation Detection Framework

---

# 📌 Repository Scope

This repository contains the **AskDrip frontend application**.

It documents:

```text
UI Architecture
State Management
API Integration
Authentication Integration
Conversation Architecture
AI Service Contracts
Product Rendering
Frontend Deployment
```

The internal implementation of AI models, private infrastructure, databases, and backend credentials is intentionally kept outside the frontend repository.

---

# 🔒 Security

Please do not commit:

```text
.env
.env.local
.env.production
Private API keys
Database credentials
JWT secrets
Cloud credentials
Private service tokens
SSH/private keys
```

Public frontend configuration should contain only values that are safe to expose to a browser.

If you discover a security issue, report it privately to the project maintainers rather than publishing credentials or exploit details.

---

# 📄 License

This project is part of the **Dripzoid technology ecosystem**.

All rights reserved unless otherwise specified by the repository owner.

---

<p align="center">
  <strong>AskDrip — Talk to your fashion.</strong>
</p>

<p align="center">
  Built with AI · React · Fashion Intelligence · Dripzoid
</p>

---

For the **Chaya/co-founder conversation**, I would use this version in the public repository. It gives a technically capable person enough information to understand the system without exposing your backend implementation or credentials.
