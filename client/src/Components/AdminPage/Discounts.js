import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Discounts.css";
import * as FaIcons from "react-icons/fa"

function Discount() {
  const [code, setCode] = useState("");
  const [percentOff, setPercentOff] = useState("");
  const [currCodes, setCurrCodes] = useState([]);
  const def = "";

  const addDiscountCode = () => {
    let good = true;
    currCodes.forEach((item) => {
      if (item.codes.toLowerCase() === code.toLowerCase()) good = false;
    });

  

    if (code != "" && percentOff != "" && good === true) {
      Axios.post("http://localhost:3001/discountCodes", {
        function: "add",
        disCode: code,
        disOff: percentOff,
      }).then((res) => {
        if (res.success) alert("Success!");
      });
      setCode(2);
    } else alert("ERROR: Invalid Code / Duplicate");
  };

  const removeDiscount = (code) => {
    Axios.post("http://localhost:3001/deleteCode", {code: code})
    setCode("sdfds")
  }

  useEffect(() => {
    Axios.post("http://localhost:3001/discountCodes", { function: "get" }).then(
      (res) => {
        setCurrCodes(res.data);
      }
    );
  }, [code]);

  return (
    <>
      <div className="CreateDiscountContainer">
        <h2>Create a Discount Code</h2>
        <input
          className="discountInput"
          defaultValue={def}
          type="text"
          placeholder="Discount Code"
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          className="discountInput"
          defaultValue={def}
          type="number"
          placeholder="Discount"
          max={100}
          min={0}
          onChange={(e) => {
            if (e.target.value > 100) setPercentOff(100);
            else if (e.target.value < 0) setPercentOff(0);
            else setPercentOff(e.target.value);
          }}
        />
        <button onClick={() => addDiscountCode()}>Create Code</button>
      </div>

      <div className="DiscountCodesContainer">
        <h2>Active Discount Codes</h2>

        {currCodes.map((item) => (
          <h3>
            {item.codes} - %{item.discount}
            <span className="spa" onClick={() => removeDiscount(item.codes)}>
            <FaIcons.FaWindowClose />
            </span>
          </h3>
        ))}

        <div className="DiscountCodes"></div>
      </div>
    </>
  );
}
export default Discount;
