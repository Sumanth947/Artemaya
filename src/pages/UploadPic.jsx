// src/pages/UploadPic.jsx
import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs'; // Import TensorFlow.js

const UploadPic = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedDish, setPredictedDish] = useState('');
  const [userInputDish, setUserInputDish] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState('');
  const [model, setModel] = useState(null);

  // Load the model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel('/path/to/tfjs_model/model.json'); // Update the path to your model
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile && model) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(selectedFile);
      img.onload = async () => {
        const tensorImg = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([150, 150]) // Resize to match model input shape
          .expandDims(0) // Add batch dimension
          .toFloat()
          .div(tf.scalar(255)); // Normalize to [0, 1]

        const predictions = model.predict(tensorImg);
        const predictedClass = predictions.dataSync()[0] > 0.5 ? 'Kanji and Asthram' : 'Other'; // Adjust based on your classes
        setPredictedDish(predictedClass);
      };
    }
  };

  const handleConfirmDish = () => {
    // Nutritional information logic based on user input
    if (userInputDish) {
      const nutritionalMessage = get_nutritional_message(userInputDish);
      setNutritionalInfo(nutritionalMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Upload Your Picture</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {selectedFile && <p className="mt-2">Selected file: {selectedFile.name}</p>}
      
      {predictedDish && (
        <div className="mt-4">
          <p className="font-bold">The model predicted: {predictedDish}.</p>
          <p>Is this correct? (yes/no)</p>
          <input
            type="text"
            placeholder="Type the correct dish name"
            value={userInputDish}
            onChange={(e) => setUserInputDish(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleConfirmDish}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Confirm Dish
          </button>
        </div>
      )}

      {nutritionalInfo && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Nutritional Information:</h2>
          <p>{nutritionalInfo}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPic;