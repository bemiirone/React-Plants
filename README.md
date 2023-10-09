# Plant List Application

## **Overview**
The Plant List application is a user-friendly React web application designed for managing and displaying a collection of plants. Leveraging a modern design backed by Tailwind CSS, the application seamlessly combines aesthetics with functionality. The application is structured around components and is written in TypeScript, ensuring type safety and enhancing the developer experience.

## **Features**

1. **Plant Listing**
   - The main screen displays a grid of plants, with each entry showing an image, name, family, and year.
   - The plants are displayed in a responsive grid format, adapting to different screen sizes for optimal user experience.

2. **Plant Filtering**
   - Users can quickly filter plants by name, family, or year using a filter input field.
   - As users type, the list dynamically updates to reflect the matching results.

3. **Plant Addition**
   - A modal pops up to provide a user interface for adding a new plant..
   - The form ensures that all required fields are filled before submission.

4. **Plant Detail & Editing**
   - By clicking on a plant's name, users can view detailed information in an overlay modal.
   - This modal allows for inline editing of the plant's properties, except for the image.
   - Once editing is done, users can either save the changes or cancel to revert back.

5. **Plant Deletion**
   - Each plant entry comes with a delete button, allowing users to easily remove plants from the list.

6. **Responsive Design**
   - The application uses Tailwind CSS, ensuring a responsive and modern design that adapts to various device screen sizes.

## **Technical Implementation**

- The application uses React hooks extensively, particularly `useState` and `useEffect`, for managing state and side effects respectively.
- For fetching and managing plant data, service functions are defined, abstracting away the data operations.
- The application benefits from TypeScript's type safety, enhancing code reliability and developer experience.
- The application is architected around modular components like `PlantFilter` and `PlantDetail`, promoting code reusability and separation of concerns.
- Tailwind CSS is integrated for styling, offering utility classes that simplify the design process.

## **Conclusion**
The Plant List application is a testament to the power and flexibility of React combined with TypeScript. With its user-centric features and modern design, it provides an efficient and enjoyable way for users to manage and view their plant collections.

## **Instructions**

- Clone Repo
- Navigate to the api folder an run `npm install` the run command `npm start`. This will start the api server
- Navigate back to the root folder and repeat the above steps to start the app.
- View the app on localhost:400
