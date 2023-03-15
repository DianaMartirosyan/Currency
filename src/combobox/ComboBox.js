import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ContentPasteOffSharp, NotListedLocation } from '@mui/icons-material';
import styles from './ComboBox.module.css';



function ComboBox({ onChange, data, notSelectedValue, getData }) {

  const [countries, setCountries] = useState([])
  const [allList, setAllList] = useState({ currency: null, name: null, flag: null, country: NotListedLocation, capital: null });
  const [unFilteredData, setUnFilteredData] = useState([])
  const [lastResult, setLastResult] = useState([])
  let result;
  const [lastData, setLastData] = useState([])
  let filteredData = []




  const handleChange = (e, value) => {
    onChange(value)      //send selected currency from ComboBox to CurrencyConverter
  }

  useEffect(() => {
    getCountriesData()
    getData(lastData)   //send lastData from ComboBox to CurrencyConverter
  }, [lastData]);



  {/* Request for getting Countries info*/ }
  const getCountriesData = () => {
    return fetch('https://restcountries.com/v3.1/all', {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        setCountries(responseData)
        return responseData;
      })
      .catch(error => console.warn(error));
  }

  {/* Get necessary info of all Countries*/ }
  useEffect(() => {
    let data = countries.map((item) => item.currencies ? ({ ...allList, currency: Object.keys(item.currencies).join(', '), name: Object.values(item.currencies).map(({ name }) => name).join(', '), flag: item.flags.png, country: item.name.common, capital: item.capital }) : null)

    result = data.filter(
      (thing, index, self) =>
        index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(thing))
    )

    setUnFilteredData(result)

  }, [countries])



  {/* Filtering all countries data and push only those object, which currency  have */ }
  useEffect(() => {
    if (unFilteredData.length !== 0 && unFilteredData) {
      Object.keys(data).forEach((value) => {
        let filteredResult = (unFilteredData?.filter((item) => item ? item.currency == value : null))
        filteredData.push(...filteredResult)
      })
      setLastResult(filteredData)
    }
  }, [unFilteredData])


  {/* Remove duplicated currency objects*/ }
  useEffect(() => {
    const uniqueIds = [];
    const unique = lastResult.filter(element => {
      const isDuplicate = uniqueIds.includes(element.currency);
      if (!isDuplicate) {
        uniqueIds.push(element.currency);
        return true;
      }
      return false;
    });
    setLastData(unique)

  }, [lastResult])


  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={lastData}
        getOptionLabel={(option) => option.currency}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={handleChange}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <span className={styles.combobox_option_flag}>
              <img
                width="30"
                src={option.flag}
              />
            </span>
            <h3 className={styles.combobox_currency}>{option.currency} </h3>
            <span className={styles.combobox_currency_name}> {option.name}</span>
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label={notSelectedValue} />}
      />
    </>
  )
};

export default ComboBox