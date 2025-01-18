# EMAIL_WRITER_AI

## Overview

This project is an AI-powered email writer that integrates with Gmail via a Chrome extension. It enables users to craft AI-generated email replies by clicking an AI-REPLY button added to Gmail's interface. The application uses a Spring Boot backend to process the text and tone of the reply, interacts with Gemini AI via an API, and seamlessly integrates the generated reply into Gmail.

## Features

* AI-Powered Replies: Generate intelligent email responses based on the provided text and tone.
* Customizable Tones: Choose from predefined tones such as professional, humorous, friendly, and harsh.
* Seamless Gmail Integration: Interact with Gmail through a Chrome extension to fetch and inject email content.
* Spring Boot Backend: A robust server-side application for processing input and interacting with the Gemini AI API.

## Prerequisites

### Backend Requirements

* Java 17 or higher
* Maven 3.6+
* Spring Boot

### Frontend Requirements

* Chrome Browser
* Chrome Extension Development Environment

### API Requirements

* Gemini AI API Key
* API URL for Gemini AI

## Installation

### 1. Clone the Repository

git clone https://github.com/VISHNUDHARSHAN/EMAIL_WRITER_AI.git
cd ai-reply-email-writer

### 2. Backend Setup

1. Navigate to the backend folder: 
    cd backend
2. Install dependencies:
    mvn clean install
3. Configure application.properties with the Gemini AI API details:
    gemini.api.url=YOUR_API_URL
    gemini.api.key=YOUR_API_KEY
4. Run the Spring Boot application:
5. mvn spring-boot:run

### 3. Chrome Extension Setup

1. Navigate to the chrome-extension folder:
2. cd chrome-extension
    Open Chrome and navigate to chrome://extensions/.
3. Enable Developer mode.
4. Click on Load unpacked and select the chrome-extension folder.


## API Details

### Endpoint: /api/email/generate
### Method: POST
### Request Body:
{
  "emailcontent": "<text-to-reply>",
  "tone": "<tone>"
}

## OUTPUT
The front page after clicking the reply button for a mail:

![Screenshot (1369)](https://github.com/user-attachments/assets/62f4ba7d-6d34-4e9e-bae2-e4bc04b59f86)

Tone selection:

![Screenshot (1370)](https://github.com/user-attachments/assets/04efc1c9-a6e9-4687-889a-624d77c6e6fa)

Response Generation:

![Screenshot (1372)](https://github.com/user-attachments/assets/c4784192-363f-4067-9264-a9ec7c84960e)


## Contact

For any inquiries or support, please contact:

### Email: vishnudharshan2003@gmail.com
### GitHub: VISHNUDHARSHAN


