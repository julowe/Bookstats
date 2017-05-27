import React, {Component} from 'react';
import ReactGA from 'react-ga'

import logo from './logo.png';
import './App.css';
import StatsComponent from "./StatsComponent";
import parseExport from './parseExport'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {file: null, distribute_year: true, statistics: null};
        this.handle_options = this.handle_options.bind(this);
        this.calc_statistics = this.calc_statistics.bind(this);

        ReactGA.initialize('UA-133792-4');
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} id="logo" alt="logo"/>
                    <div id="title">
                        <h2>Bookstats</h2>
                    </div>
                    <div className="clearfloat"/>
                </div>
                <div id="content">
                    <div id="top-bar">
                        <div className="InputCSV">
                            <p>Select the .csv file exported from goodreads below.<br/>
                                The export button can be found on <a href="https://www.goodreads.com/review/import">this
                                    page</a>,
                                in the right column.</p>
                            <input type="file" name="file" id="library_xml" accept=".csv"
                                   ref={(ref) => this.fileUpload = ref}
                                   onChange={this.handle_options}/>
                            <div className="options">
                                <label>
                                    <input name="distribute_year" type="checkbox"
                                           checked={this.state.distribute_year} onChange={this.handle_options}/>
                                    If more than 10 books are read on Jan 1. spread them over the whole year.
                                </label>
                            </div>
                        </div>
                        {this.state.statistics !== null && this.state.statistics.data.length > 0 &&
                            <div id="overview">
                                <div id="number_stats">
                                    Found
                                    <ul>
                                        <li>{this.state.statistics.data.length + " books,"}</li>
                                        <li>{`${this.state.statistics.data.filter(b => b.user_rating > 0).length} rated books,`}</li>
                                        <li>{`${this.state.statistics.data_valid_date_read.length} books with finish date,`}</li>
                                        <li>{`by ${Object.keys(this.state.statistics.author_stats).length} authors.`}</li>
                                    </ul>
                                </div>
                                <div id="instructions">
                                    <p>Click and drag on any graph to zoom in, double click to zoom out again.</p>
                                    <p>Click on the table headings to change the sort order.</p>
                                    <p>The .csv file exported from goodreads does not include the date you started
                                        reading a
                                        book,
                                        so some of the graphs are not very accurate (e.g. pages read per day).</p>
                                </div>
                                <div className="clearfloat"/>
                            </div>
                        }
                        <div className="clearfloat" />
                    </div>

                    <StatsComponent statistics={this.state.statistics}/>
                </div>
            </div>
        );
    }

    handle_options(e) {
        const target = e.target;
        if (target.name === "file") {
            this.setState({file: this.fileUpload.files[0]}, this.calc_statistics);
        } else {
            const value = target.type === 'checkbox' ? target.checked : target.value;
            this.setState({
                [target.name]: value
            }, this.calc_statistics);
        }
    }

    calc_statistics() {
        let self = this;
        if (this.state.file !== undefined && this.state.file !== null) {
            parseExport(this.state.file, {distribute_year: this.state.distribute_year}).then((statistics) => {
                ReactGA.event({
                    category: 'statistics',
                    action: 'calc_statistics',
                    value: statistics.data.length
                });
                self.setState({statistics: statistics});
            });
        }
    }

}

export default App;
