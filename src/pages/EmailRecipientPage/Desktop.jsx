import "./styles.css";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40,
  },
});

class Screen extends React.Component {

  render() {
    return (
      <React.Fragment>
        
        <div
          style={{
            backgroundColor: "#F6F1F1",
            minHeight: "100vh",
          }}
        >

        </div>
      
      </React.Fragment>
    );
  }
}

function createContainer() {
    return authorize({
      mustVerified: true,
      roles: [ROLES.STAFF],
    })(withRouter(withStyles(styles)(Screen)));
  }
  
  export default createContainer();