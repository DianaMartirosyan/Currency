import styles from './CountryInfoSection.module.css'

function CountryInfoSection({ item }) {
    //Check if Coutry name  has more than two word , take only the first letters(abbreviation)
    const countryName = item.country.split(" ")
    let newName;
    let abbreviationCountry = countryName.map((item) => countryName.length > 2 ? newName = item[0] : item)


    return (
        <>
            <div className={styles.flag_block}>
                <img src={item.flag} />
            </div>
            <div className={styles.country_block}>
                Country:
                <span className={styles.info_name}>
                    {abbreviationCountry}
                </span>
            </div>
            <div className={styles.capital_block}>
                Capital:
                <span className={styles.info_name}>
                    {item.capital}
                </span>
            </div>
        </>
    )
};

export default CountryInfoSection