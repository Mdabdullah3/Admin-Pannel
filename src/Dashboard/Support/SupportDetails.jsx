import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useReportStore from "../../store/ReportStore";
import { FaTrash } from "react-icons/fa";
import { SERVER } from "../../config";

const ReportDetails = () => {
  const { id } = useParams();
  const { report, fetchReportById, deleteReport } = useReportStore();

  useEffect(() => {
    fetchReportById(id);
  }, [fetchReportById, id]);

  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteReport(id);
    navigate("/admin/supports");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Report Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{report?.title}</h2>
        <div className="mb-4">
          <img
            src={`${SERVER}${report?.image?.secure_url}`}
            alt="Report"
            className="w-40 h-40 rounded-lg"
          />
        </div>
        <p className="text-gray-700 font-semibold capitalize">
          Report Type: {report?.title}
        </p>
        <p className="text-gray-700 mb-4 capitalize">{report?.message}</p>
        <p className="text-gray-600 capitalize">{report?.description}</p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FaTrash className="inline mr-2" /> Delete Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
