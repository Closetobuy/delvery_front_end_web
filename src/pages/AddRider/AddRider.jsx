import React, { useState, useEffect, useRef } from "react";
import { Header } from "../../components";
import { UseStepperContextProvider } from "../../contexts/StepperContext";
import StepperControl from "../../components/Stepper/StepperControl";
import Stepper from "../../components/Stepper/Stepper";
import {
  AccountInformation,
  BankDetails,
  LegalInformation,
  Final,
} from "../../components/Stepper/Steps";

const AddRider = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Basic Info", "Legal Info", "Bank Info", "Upload"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <AccountInformation />;
      case 2:
        return <LegalInformation />;
      case 3:
        return <BankDetails />;
      case 4:
        return <Final />;
      default:
        <AccountInformation />;
    }
  };

  const handleChange = (direction) => {
    let newStep = currentStep;
    if (direction === "home") {
      newStep = 1;
    } else {
      direction === "next" ? newStep++ : newStep--;
    }

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="m-2 md:m-10 sm:p-8 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Add" title="Rider" />
      <Stepper steps={steps} currentStep={currentStep}></Stepper>

      <div className="mt-10 py-10 px-5">
        <UseStepperContextProvider>
          {displayStep(currentStep)}
        </UseStepperContextProvider>
      </div>

      {/* <button onClick={() => refresh()}>Refresh</button> */}
      {/* <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {/* {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent> */}
      <StepperControl
        handleChange={handleChange}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
};

export default AddRider;
