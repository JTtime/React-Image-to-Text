import React from "react";
import Tesseract from "tesseract.js";
import "./styles.css";
import { MDBBtn } from "mdb-react-ui-kit";
import companyLogo from "../src/Perform-OCR-using-C.jpg";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [text, setText] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  const newTask = () => {
    setText("");
  };

  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100, 10));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };

  return (
    <div className="container" style={{ height: "90vh" }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <div className="heading d-flex">
              <h1 className="text-center py-5 mx-5">Image To Text</h1>
              <img className="OCRimg" src={companyLogo} />
            </div>
          )}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{" "}
              </progress>{" "}
              <p className="text-center h-25 py-0 my-0">
                Converting:- {progress} %
              </p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Convert"
              />
            </>
          )}
          {!isLoading && text && (
            <>
              <textarea
                className="form-control w-100 my-5"
                rows="30"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>

              <MDBBtn
                rounded
                color="success"
                className="d-flex align-items-center justify-content-center h-25"
                onClick={newTask}
              >
                Convert Another file
              </MDBBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
