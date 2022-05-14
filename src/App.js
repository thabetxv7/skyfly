import './App.css';
import React, {useState} from "react";
/*--Library--*/
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*--Images--*/
import bgImg from './assets/flights_3.svg'
import searchIcon from './assets/icons/icons8-search.svg'
/*--Database--*/
import country from './database/country.json'
import flight from './database/flights.json'

function App() {
    const [PriceMin, setPriceMin] = useState('');
    const [PriceMax, setPriceMax] = useState('');
    const [Depart, setDepart] = useState('');
    const [Return, setReturn] = useState('');
    const [listFlight, setListFlight] = useState(<div/>);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const listCountry = country.map(c => <option key={c}>{c}</option>);

    function filterFlight() {
        const flightTemp = flight.filter(f => (moment(startDate).isSameOrBefore(f.duration.to) && moment(endDate).isSameOrAfter(f.duration.from)) &&
            f.location.from === Depart && f.location.to === Return &&
            (PriceMax ? f.price <= PriceMax : true) && (PriceMax ? f.price >= PriceMin : true)
        );
        console.log(flightTemp)
        setListFlight((flightTemp.map(c =>
                <div key={c.company + c.duration.from + c.location.from + c.location.to}
                     style={{zIndex: -1}}
                     className="shadow-sm card p-0 col-12 lh-lg d-flex flex-row">
                    <div>
                        <img className="rounded-2" src="https://placeimg.com/180/180/nature"/>
                    </div>
                    <div className="py-2 ps-3">
                        <div><b>Company:</b> {c.company}</div>
                        <div>
                            <b>Location:</b> {c.location.from} - {c.location.to}
                        </div>
                        <div>
                            <b>Date:</b> {moment(c.duration.from).format("LL")} - {moment(c.duration.to).format("LL")}
                        </div>
                        <div>
                            <b>Time:</b> {moment(c.duration.from).format("LT")} - {moment(c.duration.to).format("LT")}

                        </div>
                        <div><b>Price:</b> {c.price}{c.currency}</div>
                    </div>
                    <div className="ms-auto d-flex align-items-end">
                        <button className="btn btn-outline-primary me-2 mb-2">Apply Now</button>
                    </div>
                </div>
            ))
        );

    }

    return (<div className="App">
        <header className="App-header">
            <img src={bgImg} alt="flight"/>
            <div className={'filters shadow container rounded-2 border px-3 pt-4 pb-3'}
                 style={{transform: 'translateY(-70px)'}}>
                <div className={'row mb-3'}>
                    <div className={'col text-center'}>
                        <input
                            type="text"
                            className={'form-control'}
                            placeholder={'Depart'}
                            list={'departList'}
                            value={Depart}
                            onChange={(date) => setDepart(date.target.value)}
                        />
                        <datalist id={'departList'}>
                            {listCountry}
                        </datalist>
                    </div>
                    <div className={'col text-center'}>
                        <input
                            type="text"
                            className={'form-control'}
                            placeholder={'Return'}
                            value={Return}
                            list={'returnList'}
                            onChange={(date) => setReturn(date.target.value)}
                        />
                        <datalist id={'returnList'}>
                            {listCountry}
                        </datalist>
                    </div>
                    <div className={'col text-center'}>
                        <DatePicker
                            className={'form-control'}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={Date.now()}
                        />
                    </div>
                    <div className={'col text-center'}>
                        <DatePicker
                            className={'form-control'}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>
                    <div className={'col d-flex text-center'}>
                        <input
                            type="number"
                            className={'form-control rounded-0'}
                            placeholder={'min'}
                            value={PriceMin}
                            onChange={(date) => setPriceMin(date.target.value)}
                        />
                        <input
                            type="number"
                            className={'form-control rounded-0'}
                            placeholder={'max'}
                            value={PriceMax}
                            onChange={(date) => setPriceMax(date.target.value)}
                        />
                    </div>
                </div>
                <div className={'text-center position-relative mx-auto w-50'}>
                    <button
                        onClick={filterFlight}
                        style={{'width': '110px', 'left': 0, 'right': 0, top: "-50%"}}
                        disabled={false}
                        className={'btn btn-primary position-absolute mx-auto rounded-pill pe-3'}>
                        <img src={searchIcon} alt="search" className={'me-2'} width={'20px'}/>
                        Search
                    </button>
                </div>
            </div>
            <div className={'flight container'}>
                <div className="row gap-3">{listFlight}</div>
            </div>
        </header>
    </div>);
}

export default App;
