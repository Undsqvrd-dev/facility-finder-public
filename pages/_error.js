import React from "react";

class ErrorPage extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
        return { statusCode };
    }

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Oeps, er is iets misgegaan!</h1>
                <p>
                    {this.props.statusCode
                        ? `Er is een fout opgetreden op de server (Error ${this.props.statusCode})`
                        : "Er is een fout opgetreden op de client"}
                </p>
            </div>
        );
    }
}

export default ErrorPage;