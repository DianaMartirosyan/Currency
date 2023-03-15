import ComboBox from "../combobox/ComboBox";
import styles from './CurrencyConverter.module.css';
import Input from '@mui/material/Input';
import { useState, useEffect } from 'react';
import CurrencyRow from "../currencyRow/CurrencyRow";
import CountryInfo from "../countryInfo/CountryInfo";
import LinearProgress from '@mui/material/LinearProgress';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };




function CurrencyConverter() {

    const [data, setData] = useState({});
    const [newData, setNewData] = useState({
        first: null,
        second: null
    });
    const [selectedValue, setSelectedValue] = useState('USD');
    const [selectedValueSecond, setSelectedValueSecond] = useState('AMD');
    const [firstInputValue, setFirstInputValue] = useState('');
    const [secondInputValue, setSecondInputValue] = useState('');
    const [firstInput, setFirstInput] = useState(0);
    const [secondInput, setSecondInput] = useState(0);
    const [isChangedFirstInput, setIsChangedFirstInput] = useState(false);
    const [isChangedSecondInput, setIsChangedSecondInput] = useState(false);
    const [lastData, setLastData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [lastDate, setLastDate] = useState();
    const [nextDate, setNextDate] = useState();


    {/* Change first input's value, count */ }
    const handleChangeCount = (e) => {
        setFirstInputValue(e.target.value)
        setIsChangedFirstInput(true)
        setIsChangedSecondInput(false)
    };

    {/* Change second input's value, count */ }
    const handleChangeCountSecond = (e) => {
        setSecondInputValue(e.target.value)
        setIsChangedFirstInput(false)
        setIsChangedSecondInput(true)
    };


    useEffect(() => {
        try {
            setLoading(true)
            fetch('https://open.er-api.com/v6/latest/USD')
                .then((response) => response.json())
                .then((data) => (setData(data.rates),
                    setLastDate((data.time_last_update_utc).slice(5, 22)),
                    setNextDate((data.time_next_update_utc).slice(5, 22))

                ))

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }, []);


    {/* Get lastData from ComboBox, for sending CountryInfo */ }
    const getDataForInfo = (lastData) => {
        setLastData(lastData)
    }


    {/* Select currency from first option */ }
    const handleChange = (newValue) => {
        setSelectedValue(newValue.currency);
    };

    {/* Select currency from second option */ }
    const handleChangeSecond = (newValue) => {
        setSelectedValueSecond(newValue.currency);
    }


    {/* Get request for first option's selected currency */ }
    useEffect(() => {
        try {
            setLoading(true)
            fetch(` https://open.er-api.com/v6/latest/${selectedValue} `)
                .then((response) => response.json())
                .then((data) => setNewData({ ...newData, first: data.rates }))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }, [data, selectedValue]);


    {/* Get request for second option's selected currency */ }
    useEffect(() => {
        try {
            setLoading(true)
            fetch(` https://open.er-api.com/v6/latest/${selectedValueSecond} `)
                .then((response) => response.json())
                .then((data) => setNewData({ ...newData, second: data.rates }))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }, [selectedValueSecond]);



    {/* Calculation with entered count and selected currency */ }
    useEffect(() => {
        if (newData.first && newData.second) {
            const firstValue = firstInputValue * newData.first[selectedValueSecond]
            const secondValue = secondInputValue * newData.second[selectedValue]
            setFirstInput(secondValue.toFixed(3))
            setSecondInput(firstValue.toFixed(3))
        }
    });

    const toggleInvers = () => {
        setCheck(!check)
    }


    return (
        <>
            {loading ? <LinearProgress /> :
                <div className={styles.main_container}>

                    <h4 className={styles.main_title}> CURRENCY CONVERTER </h4>
                    <div className={styles.currency_date}> Currency:
                        <div> Last update: {lastDate}</div>
                        <div> Next update: {nextDate}</div>
                    </div>

                    <div className={styles.inner_container}>
                        <div className={styles.currency_converter_section}>
                            {/* ComboBox Left*/}
                            <div className={styles.left_combobox}>
                                <ComboBox
                                    onChange={handleChange}
                                    getData={getDataForInfo}
                                    data={data}
                                    notSelectedValue={selectedValue} />
                                <Input
                                    className={styles.numeric_input}
                                    fullWidth={true}
                                    type="number"
                                    onChange={handleChangeCount}
                                    value={isChangedSecondInput ? firstInput : firstInputValue}
                                />
                            </div>
                            <div className={styles.arrow_up_down_icon}>
                                <SwapVertIcon />
                            </div>
                            {/* ComboBox Right*/}
                            <div className={styles.right_combobox}>
                                <ComboBox
                                    onChange={handleChangeSecond}
                                    getData={getDataForInfo}
                                    data={data}
                                    notSelectedValue={selectedValueSecond} />
                                <Input
                                    className={styles.numeric_input}
                                    fullWidth={true}
                                    type="number"
                                    onChange={handleChangeCountSecond}
                                    value={isChangedFirstInput ? secondInput : secondInputValue}
                                />
                            </div>

                        </div>

                        <div className={styles.info_section}>
                            <h3 className={styles.info_section_title}> A country whose currency is the  </h3>
                            <div className={styles.info_section_countries}>
                                <h5>{selectedValue} </h5>
                                <h5> {selectedValueSecond} </h5>
                            </div>
                            {/* CountryInfo Component*/}
                            <CountryInfo
                                data={lastData}
                                currencies={data}
                                selectedValue={selectedValue}
                                selectedValueSecond={selectedValueSecond}
                            />
                        </div>
                    </div>

                    <div className={styles.currencyRow_main}>
                        {/*CurrencyRow*/}
                        <div className={styles.currencyRow_title_block}>
                            <h3 className={styles.currencyRow_title}>Find conversions in the currency of your selected </h3>
                        </div>
                        <div className={styles.inverse_block}>
                            <div>Inverse</div>
                            <Switch {...label} onClick={toggleInvers} />
                        </div>


                        <div className={styles.currency_list_container}>

                            <div className={styles.currency_list_section}>

                                <CurrencyRow
                                    newData={newData}
                                    selectedValue={selectedValue}
                                    selectedValueSecond={selectedValueSecond}
                                    isCheck={check}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default CurrencyConverter 