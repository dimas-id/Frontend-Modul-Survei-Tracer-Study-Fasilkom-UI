import classes from "./styles.module.css";
import CardPertanyaan from "./CardPertanyaan";
import { useEffect, useState } from "react";
import { NavbarAuth, NavbarCreateSurvei } from "../stables/Navbar";
import atlasV3 from "../../modules/api/atlas/v3";
import Toast from "../Toast/index";
import { API_V3_URL } from "../../modules/api/atlas/config";
import http from "../../libs/http";

const Pertanyaan = () => {
  const [deskripsi, setDeskripsi] = useState("");
  const [nama, setNama] = useState("");
  const [listPertanyaan, setListPertanyaan] = useState([
    {
      pertanyaan: "",
      tipe: "Jawaban Singkat",
      required: true,
      status: true,
      option: {},
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [namaStatus, setNamaStatus] = useState(true);
  const [deskripsiStatus, setDeskripsiStatus] = useState(true);
  const [activeNow, setActiveNow] = useState(0);
  const [newQuestion, setNewQuestion] = useState();
  const [removeQuestion, setRemoveQuestion] = useState();

  const changePertanyaanHandler = (index, pertanyaan) => {
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan[index].pertanyaan = pertanyaan;
    setListPertanyaan(newListPertanyaan);
  };

  const changeTipeHandler = (index, tipe) => {
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan[index].tipe = tipe;
    if (tipe === "Skala Linear") {
      newListPertanyaan[index].option = {
        banyak_skala: 5,
      };
    } else if (tipe === "Jawaban Singkat") {
      newListPertanyaan[index].option = {};
    } else {
      newListPertanyaan[index].option = {
        data: [""],
      };
    }
    setListPertanyaan(newListPertanyaan);
  };

  const changeRequiredHandler = (index, required) => {
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan[index].required = required;
    setListPertanyaan(newListPertanyaan);
  };

  const changeOptionHandler = (index, option) => {
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan[index].option = option;
    setListPertanyaan(newListPertanyaan);
  };

  useEffect(() => {
    if (removeQuestion) {
      if (activeNow === 0) {
        handleClick("deskripsi");
      } else {
        console.log("ok");
        handleClick(activeNow - 1);
      }
    }

    setRemoveQuestion(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeQuestion]);

  const deleteQuestionHandler = e => {
    const index = parseInt(e.target.id);
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan.splice(index, 1);
    setListPertanyaan(newListPertanyaan);
    setRemoveQuestion(true);
  };

  useEffect(() => {
    if (newQuestion) {
      if (activeNow === "deskripsi") {
        handleClick(0);
      } else if (activeNow !== undefined) {
        handleClick(parseInt(activeNow) + 1);
      } else if (activeNow === undefined) {
        handleClick(listPertanyaan.length - 1);
      }
    }

    setNewQuestion(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuestion]);

  const tambahPertanyaanHandler = () => {
    const newListPertanyaan = listPertanyaan.slice();
    if (activeNow === undefined) {
      newListPertanyaan.push({
        pertanyaan: "",
        tipe: "Jawaban Singkat",
        required: true,
        status: true,
        option: {},
      });
    } else if (activeNow === "deskripsi") {
      newListPertanyaan.splice(0, 0, {
        pertanyaan: "",
        tipe: "Jawaban Singkat",
        required: true,
        status: true,
        option: {},
      });
    } else {
      newListPertanyaan.splice(parseInt(activeNow) + 1, 0, {
        pertanyaan: "",
        tipe: "Jawaban Singkat",
        required: true,
        status: true,
        option: {},
      });
    }
    setListPertanyaan(newListPertanyaan);
    setNewQuestion(true);
  };

  const setStatus = index => {
    setActiveNow(index);
    listPertanyaan[index].status = true;
  };

  const onSubmitAndFinalize = async () => {
    try {
      const id = (await onSubmit()).data.survei.id;
      const url = API_V3_URL + "/survei/finalize/" + id;

      await http.get(url);
    } catch (error) {}
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setActiveNow();
    const json = {
      nama: nama,
      deskripsi: deskripsi,
      pertanyaan: listPertanyaan,
    };

    // kirim pertanyaan dari sini
    const response = await atlasV3.survei.postSurvei(json);
    if (response.status === 201) {
      Toast("Survei berhasil dibuat", "success");

      setTimeout(() => {
        window.location.replace("/survei");
        setIsLoading(true);
      }, 4000);
    } else if (response.status === 400) {
      Toast("Isilah seluruh field!", "error");
      setIsLoading(false);
      const data = response.data.messages;
      const newListPertanyaan = listPertanyaan.slice();
      for (let i = 0; i < newListPertanyaan.length; i++) {
        newListPertanyaan[i].status = data[i];
      }

      if (json.deskripsi === "") {
        setDeskripsiStatus(false);
      }
      if (json.nama === "") {
        setNamaStatus(false);
      }
      setListPertanyaan(newListPertanyaan);
    } else {
      Toast("Server error. Survei Gagal dibuat!", "error");
      setIsLoading(false);
    }

    return response;
  };

  const hanldeUp = () => {
    if (activeNow !== 0) {
      const newListPertanyaan = listPertanyaan.slice();
      [newListPertanyaan[activeNow], newListPertanyaan[activeNow - 1]] = [
        newListPertanyaan[activeNow - 1],
        newListPertanyaan[activeNow],
      ];
      setListPertanyaan(newListPertanyaan);
      handleClick(activeNow - 1);
    }
  };

  const hanldeDown = () => {
    if (activeNow !== listPertanyaan.length - 1) {
      const newListPertanyaan = listPertanyaan.slice();
      [newListPertanyaan[activeNow], newListPertanyaan[activeNow + 1]] = [
        newListPertanyaan[activeNow + 1],
        newListPertanyaan[activeNow],
      ];
      setListPertanyaan(newListPertanyaan);
      handleClick(activeNow + 1);
    }
  };

  const handleClick = idx => {
    try {
      const element = document.getElementById(idx);
      element.scrollIntoView({ behavior: "smooth" });
    } catch (e) {}
    setActiveNow(idx);
  };

  useEffect(() => {
    Toast(
      "Silakan mengisi survei, pastikan seluruh field terisi",
      "info",
      "top-center"
    );
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <NavbarAuth title="Buat Kuesioner" />
      <NavbarCreateSurvei
        onSubmit={onSubmit}
        onSubmitAndFinalize={onSubmitAndFinalize}
        isLoading={isLoading}
      />
      <div className={classes.pertanyaan}>
        <div className={classes["no-pertanyaan"]}>
          <div className={classes["no-pertanyaan-wrapper"]}>
            {listPertanyaan.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setStatus(idx);
                    handleClick(idx);
                  }}
                  className={`${classes.no} ${
                    el.status ? "" : classes.red
                  } ${activeNow === idx && classes.activeNow}`}
                >
                  {parseInt(idx) + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes["pertanyaan-wrapper"]}>
          <div style={{ position: "relative" }}>
            <div
              id="deskripsi"
              onClick={() => {
                setActiveNow("deskripsi");
                setDeskripsiStatus(true);
                setNamaStatus(true);
              }}
              className={`${classes.card} ${classes.description} ${activeNow ===
                "deskripsi" && classes.green} ${
                deskripsiStatus ? "" : classes.red
              }`}
            >
              {(deskripsiStatus === false || namaStatus === false) && (
                <div>
                  <span
                    style={{
                      paddingLeft: "12px",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    *wajib diisi
                  </span>
                </div>
              )}
              <h3>Nama Survei</h3>
              <input
                placeholder="Masukkan nama survei disini"
                className={classes.input}
                type="text"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  maxWidth: "100%",
                }}
                onChange={e => {
                  setNama(e.target.value);
                  setNamaStatus(true);
                }}
              />
              <h3>Deskripsi</h3>
              <textarea
                rows={5}
                className={classes.textarea}
                placeholder="Masukkan deskripsi disini"
                value={deskripsi}
                onChange={e => {
                  setDeskripsi(e.target.value);
                  setDeskripsiStatus(true);
                }}
              />
            </div>
            {activeNow === "deskripsi" && (
              <div className={classes.actionbtn}>
                <button onClick={tambahPertanyaanHandler}>
                  <img
                    src="https://i.ibb.co/HFpDT9z/icons8-add-67.png"
                    alt="add icon"
                    style={{ width: "30px" }}
                  />
                </button>
              </div>
            )}
          </div>
          {listPertanyaan.map((el, idx) => {
            return (
              <div style={{ width: "100%", position: "relative" }} key={idx}>
                <CardPertanyaan
                  activeNow={activeNow}
                  index={idx}
                  pertanyaan={el.pertanyaan}
                  status={el.status}
                  tipe={el.tipe}
                  required={el.required}
                  option={el.option}
                  changeRequiredHandler={changeRequiredHandler}
                  changePertanyaanHandler={changePertanyaanHandler}
                  changeTipeHandler={changeTipeHandler}
                  changeOptionHandler={changeOptionHandler}
                  deleteQuestionHandler={deleteQuestionHandler}
                  setStatus={setStatus}
                />
                {activeNow === idx && (
                  <div className={classes.actionbtn}>
                    <button onClick={tambahPertanyaanHandler}>
                      <img
                        src="https://i.ibb.co/HFpDT9z/icons8-add-67.png"
                        alt="add icon"
                        style={{ width: "30px" }}
                      />
                    </button>
                    <button onClick={hanldeUp}>
                      <img
                        src="https://i.ibb.co/sHMgb2w/icons8-down-67-copy.png"
                        alt="up img"
                        style={{ width: "30px" }}
                      />
                    </button>
                    <button onClick={hanldeDown}>
                      <img
                        src="https://i.ibb.co/j5dPjJT/icons8-down-67.png"
                        alt="down img"
                        style={{ width: "30px" }}
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pertanyaan;
