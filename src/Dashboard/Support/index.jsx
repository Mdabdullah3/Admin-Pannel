import React, { useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import useReportStore from "../../store/ReportStore";
import { SERVER } from "../../config";

const Supports = () => {
  const { reports, fetchReports, deleteReport } = useReportStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDelete = (id) => {
    deleteReport(id);
  };

  const header = ["Product Image", "Report Type", "Message", "Action"];

  return (
    <section>
      <div className="p-10 bg-gray-100 h-screen">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        <table className="min-w-full bg-white border border-gray-200 mt-10">
          <thead>
            <tr>
              {header.map((head, index) => (
                <th
                  key={index}
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={`${SERVER}${report?.image?.secure_url}`}
                        className="w-20 h-20 "
                        alt="Report img"
                      />
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap border-b border-gray-200">
                      {report?.title}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap border-b border-gray-200">
                      {report?.message}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap border-b border-gray-200">
                      <Link to={`/admin/support-details/${report?._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          View
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleDelete(report?._id)}
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-3 px-6 text-center whitespace-nowrap border-b border-gray-200"
                >
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Supports;
