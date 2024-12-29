import React, { useEffect, useState, useMemo, useCallback } from "react";
import { lazy, Suspense } from "react";
import InputSearch from "../../components/common/InputSearch";
import TableHead from "../../components/common/TableHead";
import useCategoryStore from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const AddMainCategory = lazy(() =>
  import("../../components/Dashboard/Category/AddMainCategory")
);
const AddSubCategory = lazy(() =>
  import("../../components/Dashboard/Category/AddSubCategory")
);

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState("All");
  const {
    categories,
   
    subCategories,
    fetchCategories,
    fetchSubCategories,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [fetchCategories, fetchSubCategories]);

  const navigate = useNavigate();

  const handleEdit = useCallback(
    (id, type) => {
      if (type === "category") {
        navigate(`/admin/edit-category/${id}`);
      } else if (type === "subCategory") {
        navigate(`/admin/edit-sub-category/${id}`);
      }
    },
    [navigate]
  );

  const categoriesData = useMemo(
    () => [...categories, ...subCategories],
    [categories, subCategories]
  );

  const filteredCategories = useMemo(() => {
    return categoriesData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoriesData, searchTerm]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const header = ["Category Name", "Action"];
  const menu = ["All", "Add Main Category", "Add Sub Category"];

  return (
    <section className="w-11/12 mx-auto">
      <div className="flex mt-8 items-center justify-center gap-10 w-10/12 mx-auto my-4 border-b-2">
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveMenu(item)}
            className={`md:font-bold pb-2 ${
              activeMenu === item
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {activeMenu === "All" && (
        <>
          <div className="mt-4">
            <InputSearch
              placeholder="Search For Categories.."
              value={searchTerm}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <div className="overflow-auto">
            <table className="table-auto w-full mt-10">
              <TableHead header={header} />
              {filteredCategories?.map((item) => (
                <tbody key={item._id}>
                  <tr className="border-r border-l border-gray-300 border-b">
                    <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent capitalize border-b border-l border-r border-gray-300">
                      {item.name}
                    </td>
                    {/* <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                      {item.status}
                    </td> */}
                    <td className="text-center text-dark font-medium text-secondary py-5  px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                      {/* <button
                        onClick={() =>
                          handleDelete(
                            item._id,
                            item.category ? "subCategory" : "category"
                          )
                        }
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg mr-2"
                      >
                        Delete
                      </button> */}
                      <button
                        className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg shadow-md"
                        onClick={() =>
                          handleEdit(
                            item._id,
                            item.category ? "subCategory" : "category"
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      )}
      {activeMenu === "Add Main Category" && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddMainCategory />
        </Suspense>
      )}
      {activeMenu === "Add Sub Category" && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddSubCategory />
        </Suspense>
      )}
    </section>
  );
};

export default Categories;
