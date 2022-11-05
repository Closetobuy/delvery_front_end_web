import React, { useState, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";
const Admins = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  var adminStruct = [];

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/v1/users", {
          signal: controller.signal,
        });
        // console.log(response.data);
        adminList(response.data);
        // response.data
        // adminList

        isMounted && setUsers(response.data);
      } catch (e) {
        console.error(e);
        // navigate('/login', { state: {from: location}, replace:true });
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  function adminList(adminData) {
    // {
    //   EmployeeID: 1,
    //   Name: 'Nancy Davolio',
    //   Title: 'Sales Representative',
    //   HireDate: '01/02/2021',
    //   Country: 'USA',
    //   ReportsTo: 'Carson',
    //   EmployeeImage:
    //   avatar3,
    // },

    console.log(adminData.results);

    // const adminList = users.results;
    // console.log(adminList);

    adminData.results.forEach((admin) => {
      adminStruct.push({
        EmployeeID: 1,
        Name: admin.name,
        Title: "Sales Representative",
        HireDate: admin.role,
        Country: "USA",
        ReportsTo: "Carson",
        EmployeeImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png",
      });
    });
    console.log(employeesData);
    console.log(adminStruct);
    // for (var key of adminData) {
    //   console.log(key + " -- > " + adminData[key]);
    // }
    return adminStruct;
  }

  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Admins" />
      {users ? (
        <GridComponent
          dataSource={adminList(users)}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {employeesGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      ) : (
        <h1> Loading </h1>
      )}
    </div>
  );
};

export default Admins;
