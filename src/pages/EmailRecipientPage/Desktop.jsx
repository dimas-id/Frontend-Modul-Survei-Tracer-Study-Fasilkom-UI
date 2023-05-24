import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Guidelines } from "../../styles";
import Toast from "../../components/Toast/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailBlasterAPI from "../../modules/api/atlas/v3/email-blaster";

import "./styles.css";
import { EMAIL_BLASTER_EMAIL_TEMPLATE } from '../paths';
import { emailBlasterActions } from "../../modules/email-blaster";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40,
  },
});

class Screen extends React.Component {

  constructor(props) {
    super(props);

    const searchParams = new URLSearchParams(window.location.search);
    
    this.state = {
      year_value : new Date().getFullYear(),
      term_value : 1,
      individual_email_value : '',
      csv_file: null,

      group_recipient_years : [],
      group_recipient_terms : [], 
      individual_emails : [],
      csv_emails : [],

      group_total_recipients : [],
      group_total_nonresponse : [],

      survei_id : parseInt(searchParams.get('surveiId')),
      total_response : 0,
      total_nonresponse : 0,

      all_recipients: [],
    };

    console.log('ID Survei:', this.state.survei_id);

  }

  handleSubmitGroup = (event) => {

    event.preventDefault();
    var available = false;

    for (let i = 0; i < this.state.group_recipient_years.length; i++) {
      if ( (this.state.group_recipient_years[i] === parseInt(this.state.year_value))
      &&(this.state.group_recipient_terms[i] === parseInt(this.state.term_value)) ) {
          available = true;
          break;
        }
      
    }
    
    if (!(available)) {
      emailBlasterAPI
        .getGroupTotal(this.state.survei_id, this.state.year_value, this.state.term_value)
        .then((response) => {
          console.log(response.data);
          
          this.setState({ 
            total_response: response.data["totalResponse"],
            total_nonresponse: response.data["totalNonResponse"],
          });

          this.setState(prevState => ({
            group_recipient_years: [...prevState.group_recipient_years, parseInt(this.state.year_value)],
            group_recipient_terms: [...prevState.group_recipient_terms, parseInt(this.state.term_value)],
            group_total_recipients: [...prevState.group_total_recipients, parseInt(this.state.total_response)],
            group_total_nonresponse: [...prevState.group_total_nonresponse, parseInt(this.state.total_nonresponse)],
    
            year_value : new Date().getFullYear(),
            term_value : 1,
            total_response : 0,
            total_nonresponse : 0,
          }));

        })
        .catch((error) => {
          console.error(error);
        });
        
    } else {
      Toast("Kelompok tahun lulusan sudah ditulis", "error");
    }
    
  }

  handleSubmitIndividual = (event) => {
    
    event.preventDefault();

    if (this.state.individual_email_value.trim() === '') {
      Toast("Isi email terlebih dahulu", "error");
    } else if ((!(this.state.individual_emails.includes(this.state.individual_email_value)))) {
      this.setState(prevState => ({
        individual_emails: [...prevState.individual_emails, this.state.individual_email_value],
        individual_email_value: '',
      }));
    } else {
      Toast("Email sudah ditulis", "error");
    }

  }

  handleSubmitFileBrowse = (event) => {
    event.preventDefault();
    // this.setState({
    //   file: event.target.files[0]
    // });
    const file = event.target.files[0];

    const allowedExtensions = ['csv'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      Toast('Format file tidak valid. Silahkan upload file CSV.', "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;
      // Save the file contents or perform additional operations
      this.setState({ csv_file: { name: file.name, contents: fileContents } });
    };
    reader.readAsText(file);

  };

  handleDeleteGroup = (index) => {
    this.setState(prevState => ({
      group_recipient_years: prevState.group_recipient_years.filter((year, i) => i !== index),
      group_recipient_terms: prevState.group_recipient_terms.filter((term, i) => i !== index),
      group_total_nonresponse: prevState.group_total_nonresponse.filter((number, i) => i !== index),
      group_total_recipients: prevState.group_total_recipients.filter((number, i) => i !== index),
    }));
  }

  handleDeleteIndividuals = (index) => {
    this.setState(prevState => ({
      individual_emails: prevState.individual_emails.filter((email, i) => i !== index)
    }));
  }

  handleDeleteFile = () => {
    this.setState({
      csv_file: null
    });
  }

  onNext = (event) => {
 
    if (((this.state.individual_emails).length === 0)&&((this.state.csv_emails).length === 0)
    &&((this.state.group_recipient_years).length === 0)&&((this.state.group_recipient_terms).length === 0)) {
      Toast("Pilih kelompok alumni, tuliskan email, atau masukkan file CSV!", "error")
    } else {
      emailBlasterAPI
      .getEmailRecipients(
        this.state.survei_id,
        this.state.group_recipient_years,
        this.state.group_recipient_terms,
        this.state.individual_emails)
      .then((response) => {
        console.log(response.data);

        this.setState({ 
          recipients: response.data["recipients"],
        });
        
        // window.location.href = EMAIL_BLASTER_EMAIL_TEMPLATE;
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
  }

  render() {

    return (
      <React.Fragment>

        <NavbarAuth title="Email Blaster" />


        <div className="header">
          <button className="button-icon-text button-kiri"
          onClick={()=>{
            window.location.href = `/survei`
          }}><i className="back"></i>Kembali</button>
          <h1 className="main-title">Kirim Survei</h1>
          <button className="button-icon-text button-kanan"
          onClick={this.onNext}>Berikutnya<i className="next"></i></button>
        </div>


        <div className="section">
          <h2 className="title">Tujuan Penerima Email</h2>
          <p>Pilih tujuan pengiriman survei!</p>
        </div>

        <div className='form-container'>
          
          <div className='form-section'>

            <div className="form-title">
              <h2 className="title">Batch</h2>
              <p>Kirim secara bersamaan untuk kelompok alumni lulusan tahun tertentu</p>
              <br></br>
            </div>
            
            <form className="form-box" onSubmit={this.handleSubmitGroup}>
              
            <label htmlFor="years">Tahun <br></br> Kelulusan </label>
              <input type="number" id="years" name="years" defaultValue={this.currentYear}
                value={this.state.year_value} 
                onChange={ event => this.setState({year_value: event.target.value}) }></input>

            <label htmlFor="terms">Term</label>
              <select name="terms" id="terms"
                value={this.state.term_value}
                onChange={ event => this.setState({term_value: event.target.value}) }>
                  <option value="1">1</option>
                  <option value="2">2</option>
              </select>
              
              <button type="submit" id="add-group" className='button-icon-text'><i className='add'></i> tambah</button>

            </form>

            {this.state.group_recipient_years.length === 0 ? (
                <p className="keterangan-kosong">Tambahkan kelompok pengguna</p>
              ) : (
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Kelompok Lulusan</th>
                  <th>Belum<br></br>Mengisi</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.group_recipient_years.map((year, index) => (
                <tr key={index}>
                  <td>
                    <button className="button-icon cancel"
                    onClick={() => this.handleDeleteGroup(index)}></button>
                  </td>
                  <td>Lulusan {year} term-{this.state.group_recipient_terms[index]}</td>
                  <td>{(this.state.group_total_nonresponse[index]).toString()}</td>
                  <td>{(this.state.group_total_recipients[index]).toString()}</td>
                </tr>
                ))}
              </tbody>
            </table> )}

          </div>


          <div className='form-section'>
            
            <div className="form-title">
              <h2 className="title">Individually</h2>
              <p>Kirim untuk perseorangan</p>
              <br></br>
            </div>

            <form className="form-box" onSubmit={this.handleSubmitIndividual}>

                <label htmlFor="individuals">Email: </label>
                  <input type="email" id="individual" name="individuals" 
                    value={this.state.individual_email_value} 
                    onChange={ event => this.setState({individual_email_value: event.target.value}) }></input>
                <button type="submit" id="add-individual" className='button-icon-text'><i className='add'></i> tambah</button>
              </form>

            {this.state.individual_emails.length === 0 ? (
              <p className="keterangan-kosong">Tambahkan email pengguna</p>
            ) : (
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.individual_emails.map((email, index) => (
                <tr key={index}>
                  <td>
                    <button className="button-icon cancel"
                    onClick={() => this.handleDeleteIndividuals(index)}></button>
                  </td>
                  <td>{email}</td>
                </tr>
                ))}
              </tbody>
            </table> )}

          </div>

          <div className='form-section'>

            <div className="form-title">
              <h2 className="title">Upload CSV File</h2>
              <p>Upload file CSV yang berisi daftar email</p>
            </div>
                
            {/* <input type='file' className='input-file'></input> */}

            {this.state.csv_file ? (
              <div>
                <h3>{this.state.csv_file.name}</h3>
                {/* <button onClick={() => this.setState({csv_file: null})}>Delete</button> */}
              </div>
            ) : (
              <p>Belum ada file yang di-upload</p>
            )}
            
            <input type="file" onChange={this.handleSubmitFileBrowse} />
            
              
              {/* { this.state.file === null ? (
                <div className='input-file'>
                  <label htmlFor='input-csv'>
                  <i className='upload'></i>Upload file .csv
                    <input id='input-csv' type='file'></input>
                  </label>
                </div>
              ) : (
                <div className='input-file'> 
                  <p><i className='delete'></i> {this.state.file.name}</p> 
                </div>
              )} */}

          </div>


        </div>
      
        <ToastContainer />
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    surveiId: state.emailBlaster.surveiId,
  });

  const mapDispatchToProps = dispatch => ({
    changeRecipients: recipients => dispatch(emailBlasterActions.changeRecipients(recipients)),
  });

  return authorize({
    mustVerified: false,
    roles: [authorize.STAFF, authorize.SUPERUSER],
  })(
    withRouter(
      connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Screen))
    )
  );
}
  
export default createContainer();