import classes from "./styles.module.css";
import CardPertanyaan from "./CardPertanyaan";
import { useEffect, useState } from "react";
import { NavbarAuth, NavbarIsiSurvei } from "../stables/Navbar";
import atlasV3 from "../../modules/api/atlas/v3";
import Toast from "../Toast/index";

const Jawaban = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [listStatusRequired, setListStatusRequired] = useState({
    status: [],
  });

  const setStatus = pid => {
    const prevListStatusRequired = listStatusRequired.status;
    const newListStatusRequired = prevListStatusRequired.filter(
      item => item !== String(pid.pertanyaanId)
    );
    setListStatusRequired({ status: newListStatusRequired });
  };

  const handleInputChange = (event, key, type) => {
    const { value } = event.target;

    if (type === "check-box") {
      const currentAnswers = answers[key.pertanyaanId] || [];

      if (currentAnswers.includes(value)) {
        // If the value is already in the array, remove it
        const newAnswers = currentAnswers.filter(ans => ans !== value);
        setAnswers({ ...answers, [key.pertanyaanId]: newAnswers });
      } else {
        // Otherwise, add the value to the array
        const newAnswers = [...currentAnswers, value];
        setAnswers({ ...answers, [key.pertanyaanId]: newAnswers });
      }
    } else {
      setAnswers({ ...answers, [key.pertanyaanId]: value });
    }
  };

  const onSubmit = async nama => {
    setIsLoading(true);
    const json = {
      survei_id: props.survei.id,
      user_id: props.user.id,
      jawaban: answers,
    };

    const response = await atlasV3.survei.isiSurvei(json);
    if (response.status === 201) {
      Toast("Survei berhasil terisi", "success");

      setTimeout(() => {
        window.location.replace("/u");
        setIsLoading(true);
      }, 4000);
    } else if (response.status === 400) {
      Toast("Isilah seluruh field!", "error");
      setIsLoading(false);
      const data = response.data.messages;
      setListStatusRequired({ status: data });
    } else {
      Toast("Server error. Survei Gagal dibuat!", "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Toast(
      "Silakan mengisi survei, pastikan seluruh field terisi",
      "info",
      "top-center"
    );
  }, []);

  return (
    <div>
      <NavbarAuth title="Isi Survei" />
      <NavbarIsiSurvei isLoading={isLoading} namaSurvei={props.survei.nama} />
      <div className={`${classes.pertanyaan} ${classes.center} `}>
        <div className={classes["pertanyaan-wrapper"]}>
          <div className={`${classes.card} ${classes.description} `}>
            <h3>Deskripsi</h3>
            <text className={classes.pertanyaanText}>
              {props.survei.deskripsi}
            </text>
          </div>
          <div className={`${classes.card} ${classes.description} `}>
            <h3>Data Diri</h3>
            <div className={classes.pertanyaanText}>
              <text>
                Nama: {props.user.firstName} {props.user.lastName}
              </text>
              <br></br>
              <text>Username: {props.user.username}</text>
              <br></br>
              <text>Email: {props.user.email}</text>
            </div>
          </div>
          {props.list_pertanyaan.map((el, idx) => {
            return (
              <div key={idx} style={{ width: "100%" }}>
                <CardPertanyaan
                  index={idx}
                  pertanyaan={el.pertanyaan}
                  tipe={el.jenisJawaban}
                  wajibDiisi={el.wajibDiisi}
                  pertanyaanId={el.id}
                  setStatus={setStatus}
                  status={listStatusRequired}
                  opsiJawaban={props.list_opsi_jawaban}
                  handleInputChange={handleInputChange}
                />
              </div>
            );
          })}
          <div
            className={classes.body}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                fontSize: "20px",
                backgroundColor: isLoading ? "#ccc" : "#4285F4",
                color: "#fff",
                padding: "0.4em 0.9em",
                borderRadius: "0.4em",
                border: "none",
              }}
              onClick={onSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jawaban;
