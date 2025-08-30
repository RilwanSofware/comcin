import React from "react";
import { FaFilePdf, FaEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";

export default function UploadedFiles({ files }) {
  if (!files) return null;

  const fileMap = [
    { label: "Certificate of Registration", key: "certificate_of_registration" },
    { label: "Operational License", key: "operational_license" },
    { label: "Constitution", key: "constitution" },
    { label: "Annual Report", key: "latest_annual_report" },
    { label: "Letter of Intent", key: "letter_of_intent" },
    { label: "Board Resolution", key: "board_resolution" },
    { label: "Passport Photograph", key: "passport_photograph" },
    { label: "Other Supporting Document", key: "other_supporting_document" },
  ];

  console.log(files);

  return (
    <div className="bg-white rounded-lg">
      <div className="px-6 py-2 border-b border-[#E9EEEA] ">
        <h3 className="text-lg font-semibold text-gray-800">Uploaded Files</h3>
      </div>
      <ul className="space-y-4 p-4">
        {fileMap.map(({ label, key }) => {
          const fileUrl = files[key];
          if (!fileUrl) return null; // skip missing files

          const isImage = fileUrl.endsWith(".jpg") || fileUrl.endsWith(".png");
          const fileName = fileUrl.split("/").pop();
          console.log("https://backend.comcin.com.ng/", fileUrl);
          return (
            <li
              key={key}
              className="flex justify-between items-center p-3 rounded shadow-sm border"
            >
              <div className="flex items-center gap-3">
                <FaFilePdf className="text-green-600 bg-[#E6EFE6] p-1 text-3xl rounded-[10px]" />
                <div>
                  <p className="font-medium text-gray-800">{label}</p>
                  <p className="text-sm text-gray-500">{fileName}</p>
                </div>
              </div>
              <div className="flex gap-3 text-[#0F5FC2]">
                <a
                  href={"https://backend.comcin.com.ng/" + fileUrl}
                  target="_blank"
                  // rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  <FaEye className="cursor-pointer" />
                </a>
                <RiDeleteBin7Line className="cursor-pointer text-[#B20B0B]" />
                <FiEdit3 className="cursor-pointer text-[#0A8625]" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
