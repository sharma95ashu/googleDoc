// src/App.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import * as XLSX from 'xlsx';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
    setText('');
  };

  // Perform OCR and extract text
  const extractText =  async () => {
    console.log(image , "chek image");
    
    if (image) {
      // setLoading(true);
      const check = await  Tesseract.recognize(image, 'eng', {
        // logger: (m) => console.log(m),
      })
      console.log(check , "check");
      
        // .then(({ data: { text } }) => {
        //   console.log(text ,  "text");
          
        //   setText(text);
        //   setLoading(false);
        // })
        // .catch((error) => {
        //   console.error("OCR Error:", error);
        //   setLoading(false);
        // });
    }
  };

  // Export text to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([{ Extracted_Text: text }]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TextData');
    XLSX.writeFile(workbook, 'ExtractedData.xlsx');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Image to Excel Text Extractor</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={extractText} disabled={!image || loading}>
        {loading ? 'Extracting...' : 'Extract Text'}
      </button>
      <div style={{ margin: '20px' }}>
        <h3>Extracted Text</h3>
        <textarea
          rows="10"
          cols="50"
          readOnly
          value={text}
          style={{ resize: 'none' }}
        ></textarea>
      </div>
      {text && (
        <button onClick={exportToExcel}>Export to Excel</button>
      )}
    </div>
  );
}

export default App;
