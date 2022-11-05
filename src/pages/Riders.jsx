import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

const Riders = () => {
  const [riders, setRiders] = useState();
  const axiosPrivate = useAxiosPrivate();
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRiders = async () => {
      try {
        const response = await axiosPrivate.get("/v1/riders", {
          signal: controller.signal,
        });
        console.log(response.data);
        // adminList(response.data);
        // response.data
        // adminList

        isMounted && setRiders(response.data);
      } catch (e) {
        console.error(e);
        // navigate('/login', { state: {from: location}, replace:true });
      }
    };

    getRiders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  function riderList(riderData) {
    var riderStruct = [];

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

    // console.log(riderData.results);

    // const adminList = users.results;
    // console.log(adminList);

    riderData.results.forEach((rider) => {
      riderStruct.push({
        CustomerID: 1,
        CustomerName: rider.name,
        CustomerEmail: rider.email,
        CustomerImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png",
        ProjectName: "Rider",
        HireDate: rider.birthDate,
        Status: "Active",
        StatusBg: "#8BE78B",
        Weeks: "40",
        Budget: "$2.4k",
        Location: "India",
      });
    });

    console.log(riderStruct);
    // for (var key of adminData) {
    //   console.log(key + " -- > " + adminData[key]);
    // }
    return riderStruct;
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Riders" />
      {riders ? (
        <GridComponent
          dataSource={riderList(riders)}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      ) : (
        <h1> Loading </h1>
      )}
    </div>
  );
};

export default Riders;
