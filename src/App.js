import React, { useEffect } from "react";
import { Button, Form, Tab, Table, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import numberToWords from "number-to-words";

const App = () => {
  const [goldWeight, setGoldWeight] = React.useState("");
  const [goldRate, setGoldRate] = React.useState(6000);
  const [makingCharges, setMakingCharges] = React.useState(0);
  const [gst, setGst] = React.useState(0);
  const [totalValue, setTotalValue] = React.useState(0);
  const [wastage, setWastage] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  const today = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date =
    today.getDate() + "-" + month[today.getMonth()] + "-" + today.getFullYear();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=7da5e5084ee47355daff05afbc17f2cb&base=INR&currencies=XAU', {});
  //       const data = await response.json();
  //       setGoldRate(data.rates.XAU);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const resetValues = () => {
    setGoldWeight("");
    setGoldRate(6000);
    setMakingCharges(0);
    setGst(0);
    setTotalValue(0);
    setWastage(0);
    setDiscount(0);
    setIsFormSubmitted(false);
  };

  const calculateValueInINR = () => {
    const weightInGrams = goldWeight;

    let rate, discount;

    if (weightInGrams > 10 && weightInGrams <= 20) {
      discount = weightInGrams * goldRate * 0.01;
      rate = weightInGrams * goldRate;
    } else if (weightInGrams > 20 && weightInGrams <= 50) {
      discount = weightInGrams * goldRate * 0.02;
      rate = weightInGrams * goldRate - discount;
    } else {
      discount = weightInGrams * goldRate * 0;
      rate = weightInGrams * goldRate - discount;
    }

    const makingCharges = rate * 0.1;
    const gst = Math.round(rate * 0.03);
    const totalValue = rate + makingCharges + gst;
    const wastage = weightInGrams * 0.03;

    setGoldRate(rate);
    setGoldWeight(weightInGrams);
    setMakingCharges(makingCharges);
    setGst(gst);
    setTotalValue(totalValue);
    setWastage(wastage);
    setDiscount(discount);
    setIsFormSubmitted(true);
  };

  console.log(totalValue);
  console.log(goldRate);

  return (
    <React.Fragment>
      <marquee class="scroll" behavior="scroll" direction="left">
        Gold Rates: ₹6000/- per gram | Making Charges: 5% - 20%  | GST: 3% | Wastage:
        3% | Discount: 0.01% Applicable(For morethan 10 Grams ) | Gold Rate
        Valid Till {date}
      </marquee>
      <div className="col-md-4 mx-auto border rounded px-3 py-3 mt-3">
        <h3 className="text-center theme">Gold Calculator</h3>
        <Form>
          <Form.Label>Gold Weight</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Gold Weight"
              name="weight"
              value={goldWeight}
              onChange={(e) => setGoldWeight(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2">Grams</InputGroup.Text>
          </InputGroup>
          <Form.Group className="mb-3">
            <Form.Label>Gold Rate(Today)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Gold Rate"
              name="price"
              value="6000"
              onChange={(e) => setGoldRate(e.target.value)}
              disabled
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={calculateValueInINR}
            disabled={isFormSubmitted}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={resetValues} className="ms-2">
            Reset
          </Button>
        </Form>
      </div>
      <div className="col-md-8 mx-auto mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Gold Weight</th>
              <th>Gold Cost</th>
              <th>Making Charges</th>
              <th>Wastage(in grams)</th>
              <th>Discount</th>
              <th>GST</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{goldWeight}</td>
              <td>{goldRate}</td>
              <td>{makingCharges}</td>
              <td>{wastage}</td>
              <td>{discount}</td>
              <td>{gst}</td>
              <td>{totalValue}</td>
            </tr>
          </tbody>
        </Table>
        <div>Amount in Words: {numberToWords.toWords(totalValue)}</div>
      </div>

      <div className="text-center mt-5 pt-5 theme">
        Developed Based On Indian Gold Market Standards
      </div>
    </React.Fragment>
  );
};

export default App;
