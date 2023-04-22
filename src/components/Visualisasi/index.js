import { NavbarAuth, NavbarBack } from "../stables/Navbar";

import classes from "./styles.module.css";
import PertanyaanCard from "./PertanyaanCard";
import SurveiCard from "./SurveiCard";
import { useEffect, useState } from "react";
import atlasV3 from "../../modules/api/atlas/v3";

const Visualisasi = () => {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState();

  const handlerdata = async id => {
    const res = await atlasV3.survei.getVisualisasiById(id);
    setData(res.message);
    setStatusCode(res.status);
  };

  useEffect(() => {
    const id = window.location.href.split("/").at(-1);
    handlerdata(id);
  }, []);

  return (
    <>
      {data && statusCode === 200 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            backgroundColor: "rgb(246, 241, 241)",
            paddingBottom: "40px",
          }}
        >
          <NavbarAuth title="Lihat Survei" />
          <NavbarBack />

          <div className={classes["pertanyaan-wrapper"]}>
            <SurveiCard
              survei={data.survei}
              deskripsi={data.deskripsi}
              responden={data.responden}
            />
            {data.pertanyaan.map(el => {
              const data = {
                labels: el.label,
                datasets: [
                  {
                    label: "# of Votes",
                    data: el.data,
                    borderWidth: 1,
                  },
                ],
                options: {
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                },
              };
              return (
                <PertanyaanCard
                  pertanyaan={el.pertanyaan}
                  key={el.pertanyaan}
                  data={data}
                  type={el.jenisJawaban}
                />
              );
            })}
          </div>
        </div>
      )}
      {statusCode === 403 && (
        <>
          <NavbarAuth title="Lihat Survei" />
          <NavbarBack />
          <div className={classes.errorwrapper} style={{ zIndex: 10 }}>
            <div className="401-wrapper">
              401 | You're not authorized to see this Analytics
            </div>
          </div>
        </>
      )}
      {statusCode === 404 && (
        <>
          <NavbarAuth title="Lihat Survei" />
          <NavbarBack />
          <div className={classes.errorwrapper}>
            <div className="401-wrapper" style={{ zIndex: 10 }}>
              404 | Survei doesn't found
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Visualisasi;
