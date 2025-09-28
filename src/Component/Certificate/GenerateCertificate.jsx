import React, { useCallback, useRef, useState } from "react";
import certificateTemplate from "../../assets/Certificate.png";
import html2canvas from "html2canvas";
import { set } from "react-hook-form";
import { ImSpinner } from "react-icons/im";

const GenerateCertificate = ({ name, date, reg }) => {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const onButtonClick = useCallback(() => {
    setIsLoading(true);
    if (ref.current === null) {
      setIsLoading(false);
      return;
    }

    html2canvas(ref.current, { useCORS: true, scale: 1 })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [ref]);

  return (
    <div className="py-5 relative">
      <div id="container" className="h-[400px] w-[600px] relative bg-red-500">
        <img src={certificateTemplate} alt="" height={400} />
        <div id="content" className="absolute h-[100%] w-[100%] top-0 left-0 ">
          <h1 className="absolute mt-[215px] ml-10 text-3xl font-bold text-gray-800">
            {" "}
            {name}
          </h1>
          <p className="absolute ml-[480px] mt-[42px] font-semibold text-[11px]">
            {date}
          </p>
          <p className="absolute ml-[520px] mt-[160px] font-semibold text-[11px]">
            {reg}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={onButtonClick}
          className="mt-5 px-4 py-2 text-white bg-[#0A8625] rounded-lg my-5 mx-auto"
        >
          {isLoading ? "Downloading..." : "Download Certificate"}
        </button>
      </div>
      <div className=" opacity-0 ">
        <div
          id="container"
          ref={ref}
          className="h-[400px] w-[600px] relative bg-red-500"
        >
          <img src={certificateTemplate} alt="" height={400} />
          <div
            id="content"
            className="absolute h-[100%] w-[100%] top-0 left-0 "
          >
            <h1 className="absolute mt-[205px] ml-10 text-3xl font-bold text-gray-800">
              {" "}
              {name}
            </h1>
          
            <p className="absolute ml-[480px] mt-[35px] font-semibold text-xs">
              {date}
            </p>
            <p className="absolute ml-[520px] mt-[153px] font-semibold text-xs">
              {reg}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
