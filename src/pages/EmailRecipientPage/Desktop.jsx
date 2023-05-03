import React from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Guidelines } from "../../styles";
import emailBlasterAPI from "../../modules/api/atlas/v3/email-blaster";

import "./styles.css";

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
      alert("Kelompok tahun lulusan sudah ditulis")
    }
    
  }

  handleSubmitIndividual = (event) => {
    
    event.preventDefault();

    if (this.state.individual_email_value.trim() === '') {
      alert("Isi email terlebih dahulu!")
    } else if ((!(this.state.individual_emails.includes(this.state.individual_email_value)))) {
      this.setState(prevState => ({
        individual_emails: [...prevState.individual_emails, this.state.individual_email_value],
        individual_email_value: '',
      }));
    } else {
      alert('Email sudah ditulis')
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

  render() {

    return (
      <React.Fragment>

        <NavbarAuth title="Email Blaster" />


        <div class="header">
          <button class="button-icon-text button-kiri"><i class="back"></i>Kembali</button>
          <h1 class="main-title">Kirim Survei</h1>
          <button class="button-icon-text button-kanan">Berikutnya<i class="next"></i></button>
        </div>


        <div class="section">
          <h2 class="title">Tujuan Penerima Email</h2>
          <p>Pilih tujuan pengiriman survei!</p>
        </div>
        
        <div class="card-recipient-box">
          
          <div class="card-recipient">
            
            <div class="card-title">
              <h2 class="title">Batch</h2>
              <p class="card-subtitle">Kirim secara bersamaan untuk kelompok alumni lulusan tahun tertentu</p>
              <br></br>
            </div>
            
            <div>
              <form class="form-box" onSubmit={this.handleSubmitGroup}>
                
                <label for="years">Tahun Kelulusan </label>
                <input type="number" id="years" name="years" defaultValue={this.currentYear}
                value={this.state.year_value} 
                onChange={ event => this.setState({year_value: event.target.value}) }></input>
                
                <label for="terms">Term</label>
                <select name="terms" id="terms" 
                value={this.state.term_value}
                onChange={ event => this.setState({term_value: event.target.value}) }>
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                </select>

                <input type="submit" id="add-group" value="tambahkan"></input>

              </form>
            </div>

            {this.state.group_recipient_years.length === 0 ? (
              <p class="keterangan-kosong">Tambahkan kelompok pengguna</p>
            ) : (
            <table>
              <tbody>
                {this.state.group_recipient_years.map((year, index) => (
                <tr key={index}>
                  <td>
                    <button class="button-icon cancel"
                    onClick={() => this.handleDeleteGroup(index)}></button>
                  </td>
                  <td>Lulusan {year} term-{this.state.group_recipient_terms[index]}</td>
                </tr>
                ))}
              </tbody>
            </table> )}
            
          </div>

          <div class="card-recipient">
            
            <div class="card-title">
              <h2 class="title">Individually</h2>
              <p class="card-subtitle">Kirim untuk perseorangan</p>
              <br></br>
            </div>
            
            <div>
              <form class="form-box" onSubmit={this.handleSubmitIndividual}>
                <label for="individuals">Email: </label>
                <input type="email" id="individual" name="individuals" 
                value={this.state.individual_email_value} 
                onChange={ event => this.setState({individual_email_value: event.target.value}) }></input>
                <input type="submit" id="add-individual" value="tambahkan"></input>
              </form>
            </div>

            {this.state.individual_emails.length === 0 ? (
              <p class="keterangan-kosong">Tambahkan email pengguna</p>
            ) : (
            <table>
              <tbody>
                {this.state.individual_emails.map((email, index) => (
                <tr key={index}>
                  <td>
                    <button class="button-icon cancel"
                    onClick={() => this.handleDeleteIndividuals(index)}></button>
                  </td>
                  <td>{email}</td>
                </tr>
                ))}
              </tbody>
            </table> )}

          </div>

        </div>
      
      </React.Fragment>
    );
  }
}

function createContainer() {
    return authorize({
      mustVerified: false,
      roles: [authorize.STAFF, authorize.SUPERUSER],
    })(withRouter(withStyles(styles)(Screen)));
  }
  
export default createContainer();