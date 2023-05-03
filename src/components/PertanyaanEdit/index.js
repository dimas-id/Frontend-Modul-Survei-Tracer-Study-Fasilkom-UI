import classes from "../Pertanyaan/styles.module.css";
import CardPertanyaan from "../Pertanyaan/CardPertanyaan";
import { useEffect, useState } from "react";
import { NavbarAuth, NavbarBuatKuesioner } from "../stables/Navbar";
import atlasV3 from "../../modules/api/atlas/v3";
import Toast from "../Toast/index";

const PertanyaanEdit = props => {
  const [deskripsi, setDeskripsi] = useState(props.survei["deskripsi"]);
  const [isLoading, setIsLoading] = useState(false);
  const [namaStatus, setNamaStatus] = useState(true);
  const [deskripsiStatus, setDeskripsiStatus] = useState(true);

  const filterOpsiJawabanFromProps = (pertanyaanId, jenisJawaban, option) => {
    if (jenisJawaban === "Jawaban Singkat"){
       return {}
    }
    return {data: option
            .filter(item => item.pertanyaanId === pertanyaanId)
            .map(el => el.opsiJawaban)}
  }
  const convertListPertanyaanToValidFormat = listPertanyaan => {
    const newListPertanyaan = listPertanyaan.slice();
    for(let i = 0; i < newListPertanyaan.length; i++){
      const pertanyaan = newListPertanyaan[i];
      if("id" in pertanyaan){
        const convertedPertanyaan = {
          "id" : pertanyaan["id"],
          "pertanyaan" : pertanyaan["pertanyaan"],
          "tipe" : pertanyaan["jenisJawaban"],
          "required" : pertanyaan["wajibDiisi"],
          "status" : "status" in pertanyaan ? pertanyaan["status"] : true,
          "option" : filterOpsiJawabanFromProps(pertanyaan["id"], pertanyaan["jenisJawaban"], props.list_opsi_jawaban)
        }
        newListPertanyaan[i] = convertedPertanyaan;
      }
    }
    return newListPertanyaan;
  };
  const [listPertanyaan, setListPertanyaan] = useState(convertListPertanyaanToValidFormat(props.list_pertanyaan));

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
      status: true,
      option: {},
    });
    setListPertanyaan(newListPertanyaan);
    console.log(newListPertanyaan);
  };

  const setStatus = index => {
    listPertanyaan[index].status = true;
  };

  const onSubmit = async nama => {
    setIsLoading(true);
    const json = {
      id: props.survei["id"],
      nama: nama,
      deskripsi: deskripsi,
      pertanyaan: listPertanyaan,
    };

    // kirim pertanyaan dari sini
    const response = await atlasV3.survei.editSurvei(json);
    if (response.status === 200) {
      Toast("Survei berhasil diedit", "success");

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
      Toast("Server error. Survei Gagal diedit!", "error");
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
      <NavbarAuth title="Buat Kuesioner" />
        <NavbarBuatKuesioner
        onSubmit={onSubmit}
        isLoading={isLoading}
        namaStatus={namaStatus}
        setNamaStatus={setNamaStatus}
        namaAwal={props.survei["nama"]}
        />
      <div className={classes.pertanyaan}>
        <div className={classes["no-pertanyaan"]}>
          <div className={classes["no-pertanyaan-div"]}>
            {listPertanyaan.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={`${classes.no} ${el.status ? "" : classes.red}`}
                >
                  {parseInt(idx) + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes["pertanyaan-wrapper"]}>
          <div
            className={`${classes.card} ${classes.description} ${
              deskripsiStatus ? "" : classes.red
            }`}
          >
            {deskripsiStatus === false && (
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
            <h3>Deskripsi</h3>
            <textarea
              rows={5}
              className={classes.textarea}
              placeholder="Masukkan deskripsi disini"
              value={deskripsi}
              style={{ fontSize: "16px" }}
              onChange={e => {
                setDeskripsi(e.target.value);
                setDeskripsiStatus(true);
              }}
            />
          </div>
          {listPertanyaan.map((el, idx) => {
            return (<div key={idx}>
                  <CardPertanyaan
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
                </div>)}
          )};
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

export default PertanyaanEdit;
