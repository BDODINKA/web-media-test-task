import React, { useEffect } from 'react'

import { Card } from '../features/card/Card'
import { setCurrencyAC, setTotalPriceAC } from '../features/card/cardReducer'
import { ICurrency } from '../interface/currencyInterface'
import { useAppDispatch } from '../utils/hooks/useAppDispatch'
import { useAppSelector } from '../utils/hooks/useAppSelector'

import style from './App.module.scss'
import { setAppState } from './appReducer'

function App() {
  const nftPrice = useAppSelector(state => state.card.OneNNTPrice)
  const totalPrice = useAppSelector(state => state.card.totalPrice)
  const currency = useAppSelector(state => state.card.currency)
  const exchangeRates = useAppSelector(state => state.app.exchangeRates)
  const error = useAppSelector(state => state.app.error)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppState())
  }, [currency])

  const setPrice = (id: string, value: { totalPrice: string; curr: ICurrency }) => {
    dispatch(setTotalPriceAC(value))
  }
  const setCurrency = (id: string, value: ICurrency) => {
    dispatch(setCurrencyAC({ curr: value, exchangeRates }))
  }

  // if (request) return <Spinner />

  if (error) return <div>{error}</div>

  return (
    <main className={style.main}>
      <section>
        <Card
          nftPrice={nftPrice}
          totalPrice={totalPrice}
          currency={currency}
          setCurrency={value => setCurrency('', value)}
          setPrice={value => setPrice('', value)}
        />
      </section>
    </main>
  )
}

export default App
