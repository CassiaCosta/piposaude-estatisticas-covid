import React, { useState, useEffect } from "react";
import { getData } from "./services";
import Header from "./components/header/header.jsx";
import "./style.css";
import DataBrazilState from "./components/DataBrazilState/index.jsx";
import CalculateWorld from "./components/calculateWorld/calculateWorld.jsx";
import DataBrazilTime from "./components/dataBrazilTime/dataBrazilTime";
import { Line } from "react-chartjs-2";
import { options, data } from "./components/dataBrazilTime/graphicTime";
import { 
  Chart as ChartsJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import 'chart.js/auto'


ChartsJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)


export default function CountryStatistics(props) {

  const [items, setItems] = useState([]);

  useEffect(function () {
    getData()
      .then((response) => response.json())
      .then((response) => {
        const resposta = response.response;
        setItems(resposta);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <main className={'App main'}>
        <h1><p>COVID19</p>Painel Coronavírus</h1>
        <CalculateWorld />
        <DataBrazilState />
        <DataBrazilTime />
        <Line options={options} data={data} />

        <section className={'tabelaMundial'}>
          <h3>Síntese de casos, óbitos e novos casos do Covid-19 no mundo</h3>
          <table className={'tabelaMundial-infos'}>
            <thead>
              <tr className={'tabelaMundial-titulos'}>
                <th>Países</th>
                <th>Casos</th>
                <th>Novos Casos</th>
                <th>Óbitos</th>
              </tr>
              <hr />
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <>
                    <tr key={item.country} className={'tabelaMundial-paises'}>
                      <td className={'paises'}>{item.country}</td>
                      <td>{item.cases.total}</td>
                      <td>{item.cases.new}</td>
                      <td>{item.deaths.total}</td>
                    </tr>
                    <hr />
                  </>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}