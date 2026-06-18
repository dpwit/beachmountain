
import React from 'react';
import { render } from 'react-dom';
import Header from './Header';
import Reset from './Reset';
import CalendarWrapper from './CalendarWrapper';

render(
    <Reset />,
    document.getElementById('appButton')
);

render(
    <CalendarWrapper />,
    document.getElementById('calendar')
);
    



