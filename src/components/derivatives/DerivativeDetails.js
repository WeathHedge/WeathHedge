import React from "react";
import "../../styles/derivative/TempDerivative.css";

function DerivativeDetails() {
  return (
    <div className="col-11 mx-auto">
      <div
        className="my-3 accordion accordion-box-border"
        id="accordionExample"
      >
        <div className="accordion-item mb-3 accordion-box-border">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed btn rounded-pill shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              1. What is a derivative contract?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <li className="accordion-list-item">
                A derivative contract is a financial instrument whose value is
                derived from the value of an underlying asset, index, rate, or
                other reference point.
              </li>
            </div>
          </div>
        </div>

        <div className="accordion-item mb-3 accordion-box-border">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed btn rounded-pill shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              2. What is HDD and CDD?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <li className="accordion-list-item">
                <b>HDD (Heating Degree Day)</b>
                <div>
                  A heating degree day (HDD) is a measurement designed to
                  quantify the demand for energy needed to heat a building. It
                  is the number of degrees that a day's average temperature is
                  below 65° Fahrenheit (18° Celsius), which is the temperature
                  below which buildings need to be heated. The price of weather
                  derivatives traded in the winter is based on an index made up
                  of monthly HDD values.
                </div>
              </li>
              <li className="accordion-list-item">
                <b>CDD (Cooling Degree Day)</b>
                <div>
                  A cooling degree day (CDD) is a measurement designed to
                  quantify the demand for energy needed to cool buildings. It is
                  the number of degrees that a day's average temperature is
                  above 65° Fahrenheit (18° Celsius).
                </div>
              </li>
            </div>
          </div>
        </div>
        <div className="accordion-item mb-3 accordion-box-border">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed btn rounded-pill shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              3. How HDD/CDD are calculated?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <li className="accordion-list-item">
                <b>HDD (Heating Degree Day)</b>
                <div>
                  Subtract the average of a day's high and low temperatures from
                  65. For example, if the day's average temperature is 50° F,
                  its HDD is 15. If that day's average is above 65, the result
                  is set to zero. If every day in a 30-day month had an average
                  temperature of 50° F, the month's HDD value would be 450 (15 x
                  30)
                </div>
              </li>
              <li className="accordion-list-item">
                <b>CDD (Cooling Degree Day)</b>
                <div>
                  Subtract 65 from the average of a day's high and low
                  temperatures. For example, if the day's average temperature is
                  75° F, its CDD is 10. If that day's average is below 65, the
                  result is set to zero. Meanwhile, if every day in a 30-day
                  month had an average temperature of 75° F, the month's CDD
                  value would be 300 (10 x 30).
                </div>
              </li>
            </div>
          </div>
        </div>
        <div className="accordion-item mb-3 accordion-box-border">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed btn rounded-pill shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              4. What is the strike value?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <li className="accordion-list-item">
                A strike value is a reference level in a weather derivative
                contract that is used to determine the payout. A higher strike
                price will make the contract more expensive, but it will also
                protect you from more losses if the weather is unexpectedly
                warm. A lower strike price will make the contract cheaper, but
                you will also be exposed to more losses if the weather is
                unexpectedly cold.
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DerivativeDetails;
