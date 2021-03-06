/**
 * Created by Paul on 2017-05-21.
 */
import React, { Component } from 'react';

import {Bar, TimeLinePlot, DotViolin} from './shared_plots.js'


export default class ReadingStats extends Component {
    render() {
        return (
            <div className="ReadingStats">
                <Bar title="books read per month" data={this.props.statistics.months_books_read_bar}
                     xaxis_title="Month" yaxis_title="# books read" xaxis_hoverformat="%B %Y"/>
                <TimeLinePlot title="books / pages read per day, 2 month moving average"
                              data={this.props.statistics.pages_read_31_day_sliding_window}
                              yaxis_title="pages read / day" y2_type="line"
                              yaxis2_title="books read / day"
                              line_1_legend="pages" line_2_legend="books"/>
                <Bar title="# books finished by weekday"
                     data={this.props.statistics.weekday_finish}
                     xaxis_title="weekday of finish date" yaxis_title="# of books"/>
                <DotViolin size="full" title="books read by number of pages"
                           data={this.props.statistics.pages_and_title}
                           xaxis_title="# pages"/>
                <Bar title="books read by publication year"
                     data={this.props.statistics.publication_year_bar}
                     xaxis_title="publication year" yaxis_title="# books read"/>
                {this.props.statistics.has_read_dates ?
                    <Bar title="books read by genre"
                     data={this.props.statistics.genre_books}
                     yaxis_title="# books read" margin_bottom="150" margin_top="50" tickangle="-45"/>
                        : ""}
                <div className="clearfloat"/>
            </div>
        );
    }
}