# CV Summary Generator

CV Summary Generator is an AI-powered tool that creates concise summaries from CV/resume text using Groq's language model.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting a Groq API Key](#getting-a-groq-api-key)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- AI-powered CV summarization
- Real-time streaming of generated summaries
- User-friendly interface built with Next.js and shadcn/ui
- Responsive design for various screen sizes

## Prerequisites

- Node.js (v20.17.0 or later recommended)
- pnpm (v8 or later)
- Groq API key

## Installation

1. Clone the repository:


2. Install dependencies:
**IMPORTANT**: This project uses Next.js 15 and React 19, which may break some Shadcn dependencies. Always use pnpm for package management to ensure compatibility.


```bash
pnpm install

```



3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Groq API key:

4. Open your browser and navigate to `http://localhost:3000`

5. Paste your CV text into the input field and click "Generate Summary" to see the AI-generated summary.

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: React components, including UI components from shadcn/ui
- `/public`: Static assets
- `/styles`: Global styles and Tailwind CSS configuration

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Groq API (via LangChain)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Getting a Groq API Key

To use the CV Summary Generator, you'll need a Groq API key. Follow these steps to obtain one:

1. Visit the Groq website at [https://www.groq.com/](https://www.groq.com/).
2. Click on the "Sign Up" or "Get Started" button to create an account.
3. Complete the registration process by providing the required information.
4. Once your account is created and verified, log in to your Groq dashboard.
5. Navigate to the API section or look for an option to generate an API key.
6. Create a new API key and copy it.
7. Paste the API key into your `.env.local` file as shown in the Installation section.


```plaintext
GROQ_API_KEY=your_api_key_here

```

**Note**: Keep your API key confidential and do not share it publicly. If you're deploying the application, make sure to use environment variables or secrets management to securely store your API key.

## Usage

1. Start the development server:


```bash
pnpm dev
```