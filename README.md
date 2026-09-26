# AskDrip — AI Fashion Assistant

<p align="center">
  <img src="./public/logo-light.png" alt="AskDrip" width="180" />
</p>

<p align="center">
  <strong>AI-powered fashion intelligence built for personalized styling, outfit discovery, color matching, and product recommendations.</strong>
</p>

<p align="center">
  React · Vite · Tailwind CSS · Axios · Dripzoid API · AskDrip AI
</p>

---

## Overview

**AskDrip** is an AI-powered fashion assistant developed as part of the Dripzoid ecosystem.

The platform combines conversational AI with fashion-specific capabilities to help users:

- Discover complete outfits
- Match colors
- Get personalized styling advice
- Discover relevant fashion products
- Maintain persistent conversations
- Continue previous fashion discussions
- Interact with specialized AI modes

AskDrip is designed around the idea that fashion assistance should be conversational rather than limited to traditional product filtering.

Instead of navigating through multiple filters, a user can simply describe what they want:

> "Suggest an outfit for college."

or:

> "What colors go well with black cargo pants?"

or:

> "Suggest a streetwear outfit under ₹3000."

AskDrip converts these natural-language requests into specialized AI workflows.

---

# Product Architecture

AskDrip follows a **frontend + AI backend + commerce backend** architecture.

```text
                         ┌──────────────────────┐
                         │       User           │
                         │  Web / Mobile Web    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   AskDrip Frontend   │
                         │                      │
                         │ React 19             │
                         │ Vite 8               │
                         │ Tailwind CSS v4       │
                         │ Axios                │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┴──────────────────┐
                 │                                     │
                 ▼                                     ▼
      ┌──────────────────────┐              ┌──────────────────────┐
      │   Dripzoid API       │              │  AskDrip Backend     │
      │                      │              │                      │
      │ Authentication       │              │ AI Chat              │
      │ User Sessions        │              │ Outfit Generation    │
      │ Conversations        │              │ Color Matching       │
      │ Messages             │              │ Recommendations      │
      │ User Data            │              │ AI Processing        │
      └──────────┬───────────┘              └──────────┬───────────┘
                 │                                     │
                 │                                     ▼
                 │                          ┌──────────────────────┐
                 │                          │ AI / Fashion Data    │
                 │                          │                      │
                 │                          │ Product Knowledge    │
                 │                          │ Fashion Intelligence │
                 │                          │ Recommendation Logic │
                 │                          └──────────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Dripzoid Commerce     │
      │ Platform              │
      │                      │
      │ Products             │
      │ Product Images       │
      │ Pricing              │
      │ Categories           │
      └──────────────────────┘
