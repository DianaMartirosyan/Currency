import { useState, useEffect } from 'react';
import styles from './CountryInfo.module.css'
import CountryInfoSection from './CountryInfoSection'


function CountryInfo({ data, selectedValue, selectedValueSecond }) {

    const [firstData, setFirstData] = useState([]);
    const [secondData, setSecondData] = useState([]);

    {/*filter data keeping only that object, which currency is equal to selected currency*/ }
    useEffect(() => {
        let firstBlock = data.filter((item) => item.currency === selectedValue)
        setFirstData(firstBlock)
        let secondBlock = data.filter((item) => item.currency === selectedValueSecond)
        setSecondData(secondBlock)
    }, [data])


    return (
        <>
            <div className={styles.country_info}>
                <div className={styles.first_section}>
                    {firstData.map((item, i) => {
                        return (
                            <div className={styles.country_info_first} key={i}>
                                <CountryInfoSection item={item} />
                            </div>
                        )
                    })}
                </div>

                <div className={styles.second_section}>
                    {secondData.map((item, i) => {
                        return (
                            <div className={styles.country_info_second} key={i}>
                                <CountryInfoSection item={item} />
                            </div>

                        )
                    })}
                </div>
            </div>

        </>
    )
};

export default CountryInfo