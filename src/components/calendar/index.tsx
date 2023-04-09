import React from 'react';
import moment from 'moment';

import './calendar.css';

type Props = {
    width: string,
    style: {
        position: string,
        margin: string,
        width?: string
    }
}

export default class Calendar extends React.Component<Props> {
    state = {
        momentContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false
    };

    width;
    style;

    constructor(props: Props) {
        super(props);

        this.width = props.width || '350px';
        this.style = props.style || {};
        this.style.width = this.width;
    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.momentContext.format('Y');
    }

    month = () => {
        return this.state.momentContext.format('MMMM');
    }

    daysInMonth = () => {
        return this.state.momentContext.daysInMonth();
    }

    currentDate = () => {
        return this.state.momentContext.get('date');
    }

    currentDay = () => {
        return this.state.momentContext.format('D');
    }

    firstDayOfMonth = () => {
        const dateContext = this.state.momentContext;
        const firstDay = moment(dateContext).startOf('month').format('d');

        return parseInt(firstDay);
    }

    render(): React.ReactNode {
        const weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className='week-day'>{day}</td>
            );
        });

        const blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td key={`empty-${i}`} className='emptySlot'>{''}</td>
            );
        }

        const daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            const className = (d === this.currentDate() ? 'day current-day' : 'day');
            daysInMonth.push(
                <td key={d} className={className}>
                    <span>{d}</span>
                </td>
            );
        }

        const totalSlots = [...blanks, ...daysInMonth];
        const rows: JSX.Element[][] = [];
        let cells: JSX.Element[] = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                const insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }

            if (i === totalSlots.length - 1) {
                const insertRow = cells.slice();
                rows.push(insertRow);
            }
        });


        const trElements = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            )
        });

        return (
            <div className='calendar-container' style={this.style}>
                <table className='calendar'>
                    <thead>
                        <tr className='calendar-header'></tr>
                    </thead>
                    <tbody>
                        <tr>{weekdays}</tr>
                        {trElements}
                    </tbody>
                </table>
            </div>
        );
    }
}