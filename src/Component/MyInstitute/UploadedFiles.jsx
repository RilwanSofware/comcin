import React from "react";
import { FaFilePdf, FaEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";

export default function UploadedFiles() {
  const files = Array(4).fill({
    name: "Filename.pdf",
    size: "13mb",
    date: "12.09.2019 - 12:53 PM",
  });

  return (
    <div className="bg-white rounded-lg">
      <div className="px-6 py-2 border-b border-[#E9EEEA] ">
        <h3 className="text-lg font-semibold text-gray-800">
          Uploaded Files
        </h3>
      </div>
      <ul className="space-y-4">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 rounded shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FaFilePdf className="text-green-600 bg-[#E6EFE6] p-1 text-3xl rounded-[10px]" />
              <div>
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">{file.date}</div>
            <div className="flex gap-3 text-[#0F5FC2]">
              <FaEye className="cursor-pointer" />
              <RiDeleteBin7Line className="cursor-pointer text-[#B20B0B]" />

              <FiEdit3 className="cursor-pointer text-[#0A8625]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
