import { useRef } from "react";
import "./OrderSuccess.css";

const FilterOrder = (props) => {
  const dayStart = useRef();
  const monthStart = useRef();
  const yearStart = useRef();
  const dayEnd = useRef();
  const monthEnd = useRef();
  const yearEnd = useRef();

  const currentYear = new Date().getFullYear();

  const filterOrderHandler = () => {
    const dayStartvalue = dayStart.current.value;
    const monthStartvalue = monthStart.current.value;
    const yearStartvalue = yearStart.current.value;
    const dayEndvalue = dayEnd.current.value;
    const monthEndvalue = monthEnd.current.value;
    const yearEndvalue = yearEnd.current.value;

    if (
      dayStartvalue === "0" ||
      monthStartvalue === "0" ||
      yearStartvalue === "0" ||
      dayEndvalue === "0" ||
      monthEndvalue === "0" ||
      yearEndvalue === "0"
    ) {
      return alert("Please input correct date!");
    }

    const startFilter = `${yearStartvalue}-${monthStartvalue}-${dayStartvalue}`;
    const endFilter = `${yearEndvalue}-${monthEndvalue}-${dayEndvalue}`;

    if (Date.parse(startFilter) > Date.parse(endFilter)) {
      return alert("Date start must be less !");
    }

    props.onFilterOrder({
      start: startFilter,
      end: endFilter,
    });
  };

  return (
    <div className="order-success">
      <div className="start-filter">
        <h5 className="title">Start</h5>
        <select name="day" ref={dayStart}>
          <option value="0">Day</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select name="month" ref={monthStart}>
          <option value="0">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select name="year" ref={yearStart}>
          <option value="0">Year</option>
          <option value={currentYear - 1}>{currentYear - 1}</option>
          <option value={currentYear}>{currentYear}</option>
        </select>
      </div>
      <div className="end-filter">
        <h5 className="title">End</h5>
        <select name="date" ref={dayEnd}>
          <option value="0">Day</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select name="month" ref={monthEnd}>
          <option value="0">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select name="year" ref={yearEnd}>
          <option value="0">Year</option>
          <option value={currentYear - 1}>{currentYear - 1}</option>
          <option value={currentYear}>{currentYear}</option>
        </select>
      </div>
      <div className="action-filter">
        <button className="title" onClick={filterOrderHandler}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterOrder;
