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
    
    this.state = {
      year_value : new Date().getFullYear(),
      term_value : 1,
      individual_email_value : '',
      group_recipient_years : [],
      group_recipient_terms : [], 
      individual_emails : [],
    };

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
      this.setState(prevState => ({
        group_recipient_years: [...prevState.group_recipient_years, parseInt(this.state.year_value)],
        group_recipient_terms: [...prevState.group_recipient_terms, parseInt(this.state.term_value)],
        year_value : new Date().getFullYear(),
        term_value : 1,
      }));
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

  handleDeleteGroup = (index) => {
    this.setState(prevState => ({
      group_recipient_years: prevState.group_recipient_years.filter((term, i) => i !== index),
      group_recipient_terms: prevState.group_recipient_terms.filter((term, i) => i !== index)
    }));
  }

  handleDeleteIndividuals = (index) => {
    this.setState(prevState => ({
      individual_emails: prevState.individual_emails.filter((email, i) => i !== index)
    }));
  }

  onNext = (event) => {
    console.log("CLICKED2")

    if (!(this.state.individual_emails.length === 0)) {
    
      window.location.href = EMAIL_BLASTER_EMAIL_TEMPLATE;
    }
    
  }

  render() {

    return (
      <React.Fragment>

        <NavbarAuth title="Email Blaster" />


        <div className="header">
          <button className="button-icon-text button-kiri"><i className="back"></i>Kembali</button>
          <h1 className="main-title">Kirim Survei</h1>
          <button className="button-icon-text button-kanan"
          onClick={this.onNext}>Berikutnya<i className="next"></i></button>
        </div>


        <div className="section">
          <h2 className="title">Tujuan Penerima Email</h2>
          <p>Pilih tujuan pengiriman survei!</p>
        </div>
        
        <div className="card-recipient-box">
          
          <div className="card-recipient">
            
            <div className="card-title">
              <h2 className="title">Batch</h2>
              <p className="card-subtitle">Kirim secara bersamaan untuk kelompok alumni lulusan tahun tertentu</p>
              <br></br>
            </div>
            
            <div>
              <form className="form-box" onSubmit={this.handleSubmitGroup}>
                
                <label htmlFor="years">Tahun Kelulusan </label>
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

                <input type="submit" id="add-group" value="tambahkan"></input>

              </form>
            </div>

            {this.state.group_recipient_years.length === 0 ? (
              <p className="keterangan-kosong">Tambahkan kelompok pengguna</p>
            ) : (
            <table>
              <tbody>
                {this.state.group_recipient_years.map((year, index) => (
                <tr key={index}>
                  <td>
                    <button className="button-icon cancel"
                    onClick={() => this.handleDeleteGroup(index)}></button>
                  </td>
                  <td>Lulusan {year} term-{this.state.group_recipient_terms[index]}</td>
                </tr>
                ))}
              </tbody>
            </table> )}
            
          </div>

          <div className="card-recipient">
            
            <div className="card-title">
              <h2 className="title">Individually</h2>
              <p className="card-subtitle">Kirim untuk perseorangan</p>
              <br></br>
            </div>
            
            <div>
              <form className="form-box" onSubmit={this.handleSubmitIndividual}>
                <label htmlFor="individuals">Email: </label>
                <input type="email" id="individual" name="individuals" 
                value={this.state.individual_email_value} 
                onChange={ event => this.setState({individual_email_value: event.target.value}) }></input>
                <input type="submit" id="add-individual" value="tambahkan"></input>
              </form>
            </div>

            {this.state.individual_emails.length === 0 ? (
              <p className="keterangan-kosong">Tambahkan email pengguna</p>
            ) : (
            <table>
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