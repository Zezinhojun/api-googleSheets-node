# GoogleSheets api with node.js

This project is a backend application developed in Node.js that consumes Google Sheets API to perform CRUD operations while adhering to SOLID principles. It leverages modern technologies to ensure security, scalability, and maintainability.

## Objective

The primary objective of this project is to provide a CRUD application using Node.js that integrates with Google Sheets, following SOLID principles to facilitate effective data handling and manipulation.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **TypeScript**: Typed superset of JavaScript.
- **Express**: Web framework for Node.js.
- **MongoDB (with Mongoose)**: NoSQL database for data persistence.
- **JWT**: JSON Web Tokens for authentication.
- **Google Sheets API**: Integration with Google Sheets.
- **Jest**: Testing framework.
- **Docker**: Containerization for development and deployment.
- **SOLID Principles**: Software architecture principles for scalable and maintainable code.

## Main Features

- **User Authentication**: Uses JWT for authenticating and authorizing users.
- **Google Sheets Integration**: Allows reading and writing data to Google Sheets.
- **CRUD Operations**: Implements CRUD endpoints for resources.
- **Unit Testing**: Ensures code quality with comprehensive unit tests.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
2. **Install dependencies**:
   ```sh
   npm install
3. **Environment configuration**:
Copy the environment variables from `.env.example` to `.env` and fill in the required values.
4. **Run the project**:
   ```sh
   npm run dev

# Google Sheets API Configuration

To use the Google Sheets API, follow these steps:

1. Go to the Google Cloud Console.
2. Navigate to APIs & Services > Credentials.
3. Create credentials and select OAuth Client ID.
4. Choose Web application as the application type, name it, and create.
5. Download the JSON file and rename it to `credentials.json`.
6. Place the `credentials.json` file in the root of your project.
7. In your Google Sheets, copy the part of the URL between `d/` and `/edit` and add it to your environment variables.

## Testing

You can verify the application functionality by testing with the endpoints provided.

To run unit tests, use the command:
   npm run test

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Author

Developed by [zezinhojun](https://github.com/zezinhojun). Feel free to reach out for collaboration or inquiries.


