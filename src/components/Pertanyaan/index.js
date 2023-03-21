import classes from "./styles.module.css";
import CardPertanyaan from "./CardPertanyaan";
import { useState } from "react";
import { NavbarAuth, NavbarBuatKuesioner } from "../stables/Navbar";
import atlasV3 from "../../modules/api/atlas/v3";
import Toast from "../Toast/index";

const Pertanyaan = () => {
  const [deskripsi, setDeskripsi] = useState("");
  const [listPertanyaan, setListPertanyaan] = useState([
    {
      pertanyaan: "",
      tipe: "Jawaban Singkat",
      required: true,
      option: {},
    },
  ]);

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

  const deleteQuestionHandler = e => {
    const index = parseInt(e.target.id);
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan.splice(index, 1);
    setListPertanyaan(newListPertanyaan);
  };

  const tambahPertanyaanHandler = () => {
    const newListPertanyaan = listPertanyaan.slice();
    newListPertanyaan.push({
      pertanyaan: "",
      tipe: "Jawaban Singkat",
      required: true,
      option: {},
    });
    setListPertanyaan(newListPertanyaan);
  };

  const onSubmit = async nama => {
    const json = {
      nama: nama,
      deskripsi: deskripsi,
      pertanyaan: listPertanyaan,
    };

    console.log(json);

    // kirim pertanyaan dari sini
    const response = await atlasV3.survei.postSurvei(json);
    if (response.status === "success") {
      console.log(response.data);
      Toast("Survei berhasil dibuat", "success");
      setTimeout(() => {
        window.location.replace("/survei");
      }, 3500);
    } else {
      Toast(response.data, "error");
    }
  };

  return (
    <div>
      <NavbarAuth title="Buat Kuesioner" />
      <NavbarBuatKuesioner onSubmit={onSubmit} />
      <div className={classes.pertanyaan}>
        <div className={classes["no-pertanyaan"]}>
          <div className={classes["no-pertanyaan-div"]}>
            {listPertanyaan.map((_el, idx) => {
              return (
                <div key={idx} className={classes.no}>
                  {parseInt(idx) + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes["pertanyaan-wrapper"]}>
          <div className={`${classes.card} ${classes.description}`}>
            <h3>Deskripsi</h3>
            <textarea
              rows={5}
              className={classes.textarea}
              placeholder="Masukkan deskripsi disini"
              value={deskripsi}
              onChange={e => {
                setDeskripsi(e.target.value);
              }}
            />
          </div>
          {listPertanyaan.map((el, idx) => {
            return (
              <div key={idx}>
                <CardPertanyaan
                  index={idx}
                  pertanyaan={el.pertanyaan}
                  tipe={el.tipe}
                  required={el.required}
                  option={el.option}
                  changeRequiredHandler={changeRequiredHandler}
                  changePertanyaanHandler={changePertanyaanHandler}
                  changeTipeHandler={changeTipeHandler}
                  changeOptionHandler={changeOptionHandler}
                  deleteQuestionHandler={deleteQuestionHandler}
                />
              </div>
            );
          })}
          <div className={classes["add-pertannyaan"]}>
            <button onClick={tambahPertanyaanHandler}>
              Tambahkan Pertanyaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pertanyaan;
