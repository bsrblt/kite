// import DataForm from "./DataForm";

// const DataSend = ({ onDataAdded, onDataFetched }) => {
//   const addFormDataHandler = async (formData, id) => {
//     try {
//       const response = await fetch(
//         `https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/obSessions/${formData.id}.json`,
//         {
//           method: "POST",
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         console.log("Data added successfully:", formData);
//         onDataAdded(formData);
//         onDataFetched();
//       } else {
//         console.log("Failed to add session to the database.");
//       }
//     } catch (error) {
//       console.error("Error adding session:", error.message);
//     }
//   };

//   return <DataForm onSaveFormData={addFormDataHandler} />;
// };

// export default DataSend;
