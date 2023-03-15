import styles from './CurrencyRow.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function CurrencyRow({ newData, selectedValue, selectedValueSecond, isCheck }) {

  const list = [10, 50, 100, 500, 1000, 5000, 10000]

  const getCurrencyRow = (val) => {
    const data = newData.first[selectedValueSecond]
    return (val * data).toFixed(1)
  }
  const currencyList = (val) => {
    const convertedData = newData.second[selectedValue]
    return (val * convertedData).toFixed(1)
  }


  return (
    <>

      <div className={styles.currencyRow_container}>
        <div className={styles.currencyRow_header}>
          <div className={styles.currencyRow_currency_header}>
            Convert <span className={styles.currencyRow_currency_title}> {selectedValue}</span>
            <span> to  </span>
            <span className={styles.currencyRow_currency_title}>
              {selectedValueSecond}
            </span>
          </div>
          <div className={styles.currencyRow_currency_converter_header}>
            Convert<span className={styles.currencyRow_currency_title}>   {selectedValueSecond}</span>
            <span> to  </span>
            <span className={styles.currencyRow_currency_title}>
              {selectedValue}
            </span>
          </div>
        </div>

        <div className={(isCheck ? styles.currencyRow_section_inverse : '')}>
          {(newData?.first && newData?.second) && list.map((value, i) =>
            <div key={i} className={styles.currencyRow}>
              <div className={styles.left_half}>
                <div className={styles.currency}>
                  <span> {value}  </span>
                  <span>{selectedValue} </span>
                </div>
                <div className={styles.arrow_icon}>  <ArrowRightAltIcon /> </div>

                <div className={styles.converted_currency}>
                  {getCurrencyRow(value)}
                  <span> {selectedValueSecond}</span>
                </div>

              </div>
              <div className={styles.right_half}>
                <div className={styles.currency}>
                  <span> {value}    </span>
                  <span>{selectedValueSecond} </span>
                </div>
                <div className={styles.arrow_icon}>  <ArrowRightAltIcon /> </div>

                <div className={styles.converted_currency}>
                  {currencyList(value)}
                  <span> {selectedValue}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
};

export default CurrencyRow