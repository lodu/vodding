# Vodding - The Ultimate Streaming Experience 🚀

![GitHub repo size](https://img.shields.io/github/repo-size/lodu/vodding?style=for-the-badge&color=blueviolet)
![GitHub stars](https://img.shields.io/github/stars/lodu/vodding?style=for-the-badge&color=blueviolet)
![GitHub forks](https://img.shields.io/github/forks/lodu/vodding?style=for-the-badge&color=blueviolet)
![GitHub issues](https://img.shields.io/github/issues/lodu/vodding?style=for-the-badge&color=blueviolet)
![GitHub license](https://img.shields.io/github/license/lodu/vodding?style=for-the-badge&color=blueviolet)

## ✨ Introduction

Welcome to **Vodding**, the ultimate streaming experience! Vodding is a blazing fast component for the revolutionary Vodding application. Stream like never before! 🎉

## 🎯 Features

- **Real-time Chat**: Engage with your audience through real-time chat.
- **Stream Recording**: Automatically record streams for later viewing.
- **WebSocket Support**: Seamless WebSocket integration for real-time updates.
- **Twitch Integration**: Connect with Twitch to enhance your streaming experience.

## 🛠️ Setup

### Prerequisites

- [Docker](https://www.docker.com) - Containerization platform.

### Development Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/lodu/vodding.git
    cd vodding
    ```

2. **Create a `.env` file**:

    Copy the `example.env` file to `.env` and fill in the required environment variables.

    ```bash
    cp example.env .env
    ```

3. **Run Docker for development**:

    ```bash
    docker-compose -f docker-compose.dev.yaml up --build
    ```

### Production Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/lodu/vodding.git
    cd vodding
    ```

2. **Create a `.env` file**:

    Copy the `example.env` file to `.env` and fill in the required environment variables.

    ```bash
    cp example.env .env
    ```

3. **Run Docker for production**:

    ```bash
    docker-compose up --build
    ```

## 🚀 How It Works

### Architecture

Vodding consists of two main services:

- **App Service**: Handles the backend logic, including Twitch integration, chat logging, and stream recording.
- **Web Service**: Serves the frontend application, providing a luxurious user interface for the ultimate streaming experience.

### Key Components

- **Twitch Integration**: Uses the Twurple library to connect with Twitch and handle events such as stream online/offline.
- **WebSocket Support**: Utilizes Socket.IO for real-time communication between the server and clients.
- **Stream Recording**: Uses Streamlink to record streams automatically when a streamer goes live.
- **Real-time Chat**: Logs chat messages and provides real-time updates to the frontend.

## 📚 Documentation

For detailed documentation, please refer to the [official documentation](https://github.com/lodu/vodding).

## 🤝 Contributing

We welcome contributions! Please read our [contributing guidelines](https://github.com/lodu/vodding/blob/main/CONTRIBUTING.md) for more information.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/lodu/vodding/blob/main/LICENSE) file for details.

## 💬 Contact

For any inquiries, please contact [Ludo](mailto:ludo@lodu.dev).

---

Made with ❤️ by [Ludo](https://github.com/lodu)

