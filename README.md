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

git clone https://github.com/your-username/EMAIL_WRITER_AI.git
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

## Contact

For any inquiries or support, please contact:

### Email: vishnudharshan2003@gmail.com
### GitHub: VISHNUDHARSHAN


