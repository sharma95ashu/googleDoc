import React, { useCallback, useEffect, useRef } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./styles.css"
function TextEditor() {
  const wrapperRef = useCallback((wrapper) => {
    const editor =  document.createElement("div");
     if ( !wrapper) return

     wrapper.innerHTML = ""
     wrapper.append(editor)
    const quill = new Quill(editor, {
      theme: 'snow'
    });
  } , [])
   
 
  

  return (<div className='container' ref={wrapperRef}>

  </div> )

}

export default TextEditor